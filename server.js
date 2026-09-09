/*
 * ExamHub AI Proxy — server.js
 * Run:   node server.js
 * Env:   PORT (default 3000), SESSION_SECRET (change in production)
 *
 * Routes:
 *   POST /ai              — proxy endpoint (called by dylib)
 *   GET  /                — redirect to /admin/login
 *   GET  /admin/login     — admin login page
 *   POST /admin/login     — authenticate
 *   GET  /admin/dashboard — logs & errors (protected)
 *   POST /admin/clear     — clear logs (protected)
 *   GET  /admin/logout    — logout
 *   GET  /health          — health check
 */

'use strict';

const express        = require('express');
const session        = require('express-session');
const https          = require('https');
const url            = require('url');
const path           = require('path');
const app            = express();

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
const MAX_PROMPT_LEN  = 32000;
const REQUEST_TIMEOUT = 30000;
const MAX_LOG_ENTRIES = 500;

/* ─── In-memory logs ─────────────────────────────────────── */
const requestLog = [];   /* { id, ts, ip, promptSnippet, answer, status, ms } */
const errorLog   = [];   /* { id, ts, ip, type, message } */
let   reqCounter = 0;

function addRequest(entry) {
    requestLog.unshift(entry);
    if (requestLog.length > MAX_LOG_ENTRIES) requestLog.pop();
}
function addError(entry) {
    errorLog.unshift(entry);
    if (errorLog.length > MAX_LOG_ENTRIES) errorLog.pop();
}

/* ─── Middleware ─────────────────────────────────────────── */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:            SESSION_SECRET,
    resave:            false,
    saveUninitialized: false,
    cookie:            { maxAge: 4 * 60 * 60 * 1000 }   /* 4 hours */
}));

const requireAdmin = (req, res, next) => {
    if (req.session && req.session.admin) return next();
    res.redirect('/admin/login');
};

/* ─── OpenRouter forward ─────────────────────────────────── */
function forwardToOpenRouter(apiKey, prompt) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            model:     MODEL,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user',   content: prompt }
            ],
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

/* ─── Routes ─────────────────────────────────────────────── */

/* Health */
app.get('/health', (req, res) => {
    res.json({ status: 'ok', model: MODEL, uptime: process.uptime() });
});

/* Root → login */
app.get('/', (req, res) => res.redirect('/admin/login'));

/* AI proxy */
app.post('/ai', async (req, res) => {
    const ip      = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '?';
    const start   = Date.now();
    const id      = ++reqCounter;

    const apiKey  = (req.body.api_key || '').trim();
    const prompt  = (req.body.prompt  || '').trim();

    /* Validate */
    if (!apiKey.startsWith('sk-or-')) {
        addError({ id, ts: new Date(), ip, type: 'AUTH', message: 'invalid api_key format' });
        return res.status(401).json({ error: 'invalid api_key — must start with sk-or-' });
    }
    if (!prompt.length) {
        addError({ id, ts: new Date(), ip, type: 'INPUT', message: 'empty prompt' });
        return res.status(400).json({ error: 'prompt is required' });
    }
    if (prompt.length > MAX_PROMPT_LEN) {
        addError({ id, ts: new Date(), ip, type: 'INPUT', message: 'prompt too long' });
        return res.status(400).json({ error: 'prompt too long' });
    }

    /* Forward */
    let code, raw;
    try {
        ({ code, raw } = await forwardToOpenRouter(apiKey, prompt));
    } catch (e) {
        addError({ id, ts: new Date(), ip, type: 'UPSTREAM', message: e.message });
        return res.status(502).json({ error: `upstream: ${e.message}` });
    }

    /* Parse */
    let answer = '';
    try {
        const json = JSON.parse(raw);
        if (json.error) {
            const msg = json.error.message || 'OpenRouter error';
            addError({ id, ts: new Date(), ip, type: 'OPENROUTER', message: msg });
            return res.status(code).json({ error: msg });
        }
        answer = json?.choices?.[0]?.message?.content ?? '';
    } catch {
        answer = raw;
    }

    if (!answer) {
        addError({ id, ts: new Date(), ip, type: 'EMPTY', message: 'empty AI response' });
        return res.status(502).json({ error: 'empty AI response' });
    }

    const ms = Date.now() - start;
    addRequest({
        id,
        ts:            new Date(),
        ip,
        promptSnippet: prompt.slice(0, 120),
        answer:        answer.slice(0, 80),
        status:        200,
        ms
    });

    return res.json({ answer });
});

/* Admin login GET */
app.get('/admin/login', (req, res) => {
    if (req.session.admin) return res.redirect('/admin/dashboard');
    res.render('login', { error: null });
});

/* Admin login POST */
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        req.session.admin = true;
        return res.redirect('/admin/dashboard');
    }
    res.render('login', { error: 'Invalid credentials.' });
});

/* Admin dashboard */
app.get('/admin/dashboard', requireAdmin, (req, res) => {
    res.render('dashboard', {
        requestLog,
        errorLog,
        totalRequests: reqCounter,
        model:         MODEL,
        uptime:        formatUptime(process.uptime()),
    });
});

/* Clear logs */
app.post('/admin/clear', requireAdmin, (req, res) => {
    requestLog.length = 0;
    errorLog.length   = 0;
    res.redirect('/admin/dashboard');
});

/* Logout */
app.get('/admin/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/admin/login'));
});

/* ─── Helpers ────────────────────────────────────────────── */
function formatUptime(s) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return `${h}h ${m}m ${sec}s`;
}

/* ─── Start ──────────────────────────────────────────────── */
app.listen(PORT, () => {
    console.log(`[examhub-proxy] running on port ${PORT}`);
    console.log(`[examhub-proxy] model: ${MODEL}`);
    console.log(`[examhub-proxy] admin dashboard: /admin/login`);
});
