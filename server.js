/*
 * ExamHub AI Proxy — server.js
 * Run:   node server.js
 * Env:   PORT, SESSION_SECRET, ADMIN_USER, ADMIN_PASS
 *
 * POST /ai
 *   { "api_key": "sk-or-v1-...", "prompt": "...", "image": "<base64>" }
 *   image is optional — omit for text-only, include for vision (PNG/JPEG base64)
 *   Returns: { "answer": "..." }
 *
 * GET  /admin/login     — admin login
 * GET  /admin/dashboard — request + error log (protected)
 * POST /admin/clear     — clear logs
 * GET  /admin/logout
 * GET  /health
 */

'use strict';

const express = require('express');
const session = require('express-session');
const https   = require('https');
const http    = require('http');
const url     = require('url');
const path    = require('path');

const app = express();

/* ─── Config ─────────────────────────────────────────────── */
const PORT            = parseInt(process.env.PORT || '3000', 10);
const SESSION_SECRET  = process.env.SESSION_SECRET || 'examhub-secret-change-me';
const ADMIN_USER      = process.env.ADMIN_USER     || 'admin';
const ADMIN_PASS      = process.env.ADMIN_PASS     || 'montereysasd';

const OPENROUTER_URL  = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL           = 'google/gemini-3.1-pro-preview';
const SYSTEM_PROMPT   = 'If MCQ reply only A B C or D. Else short answer.';
const HTTP_REFERER    = 'https://examhub.shop';
const X_TITLE         = 'BluebookHook';
const REQUEST_TIMEOUT = 45000;          /* ms — vision requests take longer */
const MAX_PROMPT_LEN  = 32000;          /* chars */
const MAX_IMAGE_B64   = 6 * 1024 * 1024; /* 6 MB base64 ≈ ~4.5 MB raw PNG */
const MAX_LOG_ENTRIES = 500;

/* ─── In-memory logs ─────────────────────────────────────── */
const requestLog = [];
const errorLog   = [];
let   reqCounter = 0;

function pushLog(arr, entry) {
    arr.unshift(entry);
    if (arr.length > MAX_LOG_ENTRIES) arr.pop();
}

/* ─── Middleware ─────────────────────────────────────────── */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json({ limit: '10mb' }));          /* large enough for base64 image */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:            SESSION_SECRET,
    resave:            false,
    saveUninitialized: false,
    cookie:            { maxAge: 4 * 60 * 60 * 1000 }
}));

const requireAdmin = (req, res, next) =>
    (req.session && req.session.admin) ? next() : res.redirect('/admin/login');

/* ─── Build OpenRouter payload ───────────────────────────── */
function buildMessages(prompt, imageB64) {
    const sys = { role: 'system', content: SYSTEM_PROMPT };

    if (!imageB64) {
        /* Text-only */
        return [sys, { role: 'user', content: prompt }];
    }

    /* Detect MIME type from optional data-URI prefix, default to image/png */
    let mime = 'image/png';
    let raw  = imageB64;
    const m  = imageB64.match(/^data:(image\/[a-z+]+);base64,(.+)$/i);
    if (m) { mime = m[1]; raw = m[2]; }

    /* Vision (multimodal) */
    return [
        sys,
        {
            role: 'user',
            content: [
                {
                    type:      'image_url',
                    image_url: { url: `data:${mime};base64,${raw}` }
                },
                {
                    type: 'text',
                    text: prompt || 'What is the answer to this question? If MCQ reply only A B C or D. Else short answer.'
                }
            ]
        }
    ];
}

/* ─── Forward to OpenRouter ──────────────────────────────── */
function forwardToOpenRouter(apiKey, messages) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            model:     MODEL,
            messages,
            reasoning: { enabled: true }
        });

        const parsed  = new url.URL(OPENROUTER_URL);
        const options = {
            hostname: parsed.hostname,
            path:     parsed.pathname,
            method:   'POST',
            headers: {
                'Content-Type':   'application/json',
                'Content-Length': Buffer.byteLength(payload),
                'Authorization':  `Bearer ${apiKey}`,
                'HTTP-Referer':   HTTP_REFERER,
                'X-Title':        X_TITLE,
            },
            timeout: REQUEST_TIMEOUT,
        };

        const req = https.request(options, res2 => {
            const chunks = [];
            res2.on('data',  c => chunks.push(c));
            res2.on('end', () => resolve({
                code: res2.statusCode,
                raw:  Buffer.concat(chunks).toString('utf8')
            }));
        });

        req.on('timeout', () => { req.destroy(); reject(new Error('upstream timeout')); });
        req.on('error',   reject);
        req.write(payload);
        req.end();
    });
}

/* ─── POST /ai ───────────────────────────────────────────── */
app.post('/ai', async (req, res) => {
    const ip    = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '?';
    const start = Date.now();
    const id    = ++reqCounter;

    const apiKey  = (req.body.api_key || '').trim();
    const prompt  = (req.body.prompt  || '').trim();
    const imageB64 = req.body.image   || null;     /* optional base64 string */

    /* Validate api key */
    if (!apiKey.startsWith('sk-or-')) {
        pushLog(errorLog, { id, ts: new Date(), ip, type: 'AUTH', message: 'invalid api_key format' });
        return res.status(401).json({ error: 'invalid api_key — must start with sk-or-' });
    }

    /* Validate prompt */
    if (!prompt.length && !imageB64) {
        pushLog(errorLog, { id, ts: new Date(), ip, type: 'INPUT', message: 'no prompt and no image' });
        return res.status(400).json({ error: 'prompt or image is required' });
    }
    if (prompt.length > MAX_PROMPT_LEN) {
        pushLog(errorLog, { id, ts: new Date(), ip, type: 'INPUT', message: 'prompt too long' });
        return res.status(400).json({ error: 'prompt too long' });
    }

    /* Validate image size */
    if (imageB64 && imageB64.length > MAX_IMAGE_B64) {
        pushLog(errorLog, { id, ts: new Date(), ip, type: 'INPUT', message: 'image too large (max 6MB base64)' });
        return res.status(400).json({ error: 'image too large — max 6MB base64' });
    }

    const isVision = !!imageB64;
    const messages = buildMessages(prompt, imageB64 || null);

    /* Forward */
    let code, raw;
    try {
        ({ code, raw } = await forwardToOpenRouter(apiKey, messages));
    } catch (e) {
        pushLog(errorLog, { id, ts: new Date(), ip, type: 'UPSTREAM', message: e.message });
        return res.status(502).json({ error: `upstream: ${e.message}` });
    }

    /* Parse response */
    let answer = '';
    try {
        const json = JSON.parse(raw);
        if (json.error) {
            const msg = json.error.message || 'OpenRouter error';
            pushLog(errorLog, { id, ts: new Date(), ip, type: 'OPENROUTER', message: msg });
            return res.status(code).json({ error: msg });
        }
        answer = json?.choices?.[0]?.message?.content ?? '';
    } catch {
        answer = raw;
    }

    if (!answer) {
        pushLog(errorLog, { id, ts: new Date(), ip, type: 'EMPTY', message: 'empty AI response' });
        return res.status(502).json({ error: 'empty AI response' });
    }

    const ms = Date.now() - start;
    pushLog(requestLog, {
        id,
        ts:            new Date(),
        ip,
        promptSnippet: prompt.slice(0, 120),
        answer:        answer.slice(0, 80),
        isVision,
        status:        200,
        ms
    });

    return res.json({ answer });
});

/* ─── Admin routes ───────────────────────────────────────── */
app.get('/', (req, res) => res.redirect('/admin/login'));

app.get('/admin/login', (req, res) => {
    if (req.session.admin) return res.redirect('/admin/dashboard');
    res.render('login', { error: null });
});

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        req.session.admin = true;
        return res.redirect('/admin/dashboard');
    }
    res.render('login', { error: 'Invalid credentials.' });
});

app.get('/admin/dashboard', requireAdmin, (req, res) => {
    res.render('dashboard', {
        requestLog,
        errorLog,
        totalRequests: reqCounter,
        model:         MODEL,
        uptime:        formatUptime(process.uptime()),
    });
});

app.post('/admin/clear', requireAdmin, (req, res) => {
    requestLog.length = 0;
    errorLog.length   = 0;
    res.redirect('/admin/dashboard');
});

app.get('/admin/logout', (req, res) =>
    req.session.destroy(() => res.redirect('/admin/login')));

app.get('/health', (req, res) =>
    res.json({ status: 'ok', model: MODEL, uptime: process.uptime() }));

/* ─── Helpers ────────────────────────────────────────────── */
function formatUptime(s) {
    const h   = Math.floor(s / 3600);
    const m   = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return `${h}h ${m}m ${sec}s`;
}

/* ─── Start ──────────────────────────────────────────────── */
app.listen(PORT, () => {
    console.log(`[examhub-proxy] port=${PORT} model=${MODEL}`);
    console.log(`[examhub-proxy] vision support: YES (base64 image field)`);
    console.log(`[examhub-proxy] admin: /admin/login`);
});
