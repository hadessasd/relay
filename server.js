/*
 * ExamHub AI Proxy — server.js
 * Run:   node server.js
 * Env:   PORT, SESSION_SECRET, ADMIN_USER, ADMIN_PASS
 */
'use strict';

const express  = require('express');
const session  = require('express-session');
const https    = require('https');
const http     = require('http');
const url      = require('url');
const path     = require('path');
const fs       = require('fs');
const crypto   = require('crypto');
const app      = express();

/* ─── Config ─────────────────────────────────────────────── */
const PORT           = parseInt(process.env.PORT || '3000', 10);
const SESSION_SECRET = process.env.SESSION_SECRET || 'examhub-secret-change-me';
const ADMIN_USER     = process.env.ADMIN_USER     || 'admin';
const ADMIN_PASS     = process.env.ADMIN_PASS     || 'montereysasd';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL          = 'google/gemini-3.1-pro-preview';
const SYSTEM_PROMPT  = 'If MCQ reply only A B C or D. Else short answer.';
const HTTP_REFERER   = 'https://classwork.ink';
const X_TITLE        = 'BluebookHook';
const REQUEST_TIMEOUT = 45000;
const MAX_PROMPT_LEN  = 32000;
const MAX_IMAGE_B64   = 6 * 1024 * 1024;
const MAX_LOG_ENTRIES = 500;
const DATA_FILE       = path.join(__dirname, 'data', 'users.json');

/* ─── Data helpers ─────────────────────────────────────────*/
function loadUsers() {
    try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')).users || []; }
    catch { return []; }
}
function saveUsers(users) {
    try {
        fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
        fs.writeFileSync(DATA_FILE, JSON.stringify({ users }, null, 2));
    } catch(e) { console.error('[db] save error:', e.message); }
}
function sha256(str) {
    return crypto.createHash('sha256').update((str||'').trim().toUpperCase()).digest('hex');
}
function genId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2,7);
}
function getIp(req) {
    return (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '?').split(',')[0].trim();
}

/* ─── Geo lookup ──────────────────────────────────────────*/
function geoLookup(ip) {
    return new Promise(resolve => {
        if (!ip || ip==='::1' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.'))
            return resolve({ country:'Local', city:'localhost', region:'' });
        const req = http.get(`http://ip-api.com/json/${ip}?fields=country,city,regionName`, res => {
            let raw = '';
            res.on('data', c => raw += c);
            res.on('end', () => {
                try { const j=JSON.parse(raw); resolve({ country:j.country||'?', city:j.city||'?', region:j.regionName||'' }); }
                catch { resolve({ country:'?', city:'?', region:'' }); }
            });
        });
        req.setTimeout(4000, () => { req.destroy(); resolve({ country:'?', city:'?', region:'' }); });
        req.on('error', () => resolve({ country:'?', city:'?', region:'' }));
    });
}

/* ─── In-memory logs ──────────────────────────────────────*/
const requestLog = []; const errorLog = []; let reqCounter = 0;
function pushLog(arr, entry) { arr.unshift(entry); if(arr.length>MAX_LOG_ENTRIES) arr.pop(); }

/* ─── Middleware ──────────────────────────────────────────*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret:SESSION_SECRET, resave:false, saveUninitialized:false,
    cookie:{ maxAge: 8*60*60*1000 } }));
const requireAdmin = (req,res,next) => (req.session&&req.session.admin) ? next() : res.redirect('/admin/login');

/* ─── OpenRouter forward ─────────────────────────────────*/
function buildMessages(prompt, imageB64) {
    const sys = { role:'system', content:SYSTEM_PROMPT };
    if (!imageB64) return [sys, { role:'user', content:prompt }];
    let mime='image/png', raw=imageB64;
    const m = imageB64.match(/^data:(image\/[a-z+]+);base64,(.+)$/i);
    if(m){ mime=m[1]; raw=m[2]; }
    return [sys, { role:'user', content:[
        { type:'image_url', image_url:{ url:`data:${mime};base64,${raw}` }},
        { type:'text', text: prompt||'What is the answer? If MCQ reply only A B C or D. Else short answer.' }
    ]}];
}
function forwardToOpenRouter(apiKey, messages) {
    return new Promise((resolve,reject) => {
        const payload = JSON.stringify({ model:MODEL, messages, reasoning:{ enabled:true }});
        const parsed = new url.URL(OPENROUTER_URL);
        const opts = { hostname:parsed.hostname, path:parsed.pathname, method:'POST',
            headers:{ 'Content-Type':'application/json', 'Content-Length':Buffer.byteLength(payload),
                'Authorization':`Bearer ${apiKey}`, 'HTTP-Referer':HTTP_REFERER, 'X-Title':X_TITLE },
            timeout: REQUEST_TIMEOUT };
        const req = https.request(opts, res2 => {
            const chunks=[];
            res2.on('data',c=>chunks.push(c));
            res2.on('end',()=>resolve({ code:res2.statusCode, raw:Buffer.concat(chunks).toString('utf8') }));
        });
        req.on('timeout',()=>{ req.destroy(); reject(new Error('upstream timeout')); });
        req.on('error',reject);
        req.write(payload); req.end();
    });
}

/* ═══════════════════════════════════════════════
   WHITELIST ENDPOINTS  (called by dylib)
═══════════════════════════════════════════════ */

/* POST /whitelist/verify */
app.post('/whitelist/verify', async (req,res) => {
    const ip           = getIp(req);
    const rawSerial    = (req.body.machineId    ||'').trim();
    const computerName = (req.body.computerName ||'Unknown').trim();
    if (!rawSerial) return res.json({ authorized:false, pending:false });

    const hash  = sha256(rawSerial);
    const users = loadUsers();
    const found = users.find(u => u.sha256===hash);

    if (found) {
        if (found.status==='active') {
            found.lastSeen    = new Date().toISOString();
            found.ip          = ip;
            if (computerName && computerName!=='Unknown') found.computerName = computerName;
            saveUsers(users);
            return res.json({ authorized:true });
        }
        if (found.status==='pending') return res.json({ authorized:false, pending:true });
        return res.json({ authorized:false, pending:false, denied:true });
    }
    return res.json({ authorized:false, pending:false });
});

/* POST /whitelist/request */
app.post('/whitelist/request', async (req,res) => {
    const ip           = getIp(req);
    const rawSerial    = (req.body.machineId    ||'').trim();
    const computerName = (req.body.computerName ||'Unknown').trim().slice(0,80);
    const reason       = (req.body.reason       ||'').trim().slice(0,500);
    if (!rawSerial) return res.status(400).json({ error:'machineId required' });

    const hash  = sha256(rawSerial);
    const users = loadUsers();
    const exists = users.find(u => u.sha256===hash);
    if (exists) {
        if (exists.status==='active')  return res.json({ success:true, status:'active' });
        if (exists.status==='pending') return res.json({ success:true, status:'pending' });
        return res.json({ success:false, status:'denied' });
    }

    const geo = await geoLookup(ip);
    users.push({ id:genId(), sha256:hash, serialDisplay:rawSerial, computerName,
        ip, country:geo.country, city:geo.city, region:geo.region,
        label:'', status:'pending', reason,
        requestedAt:new Date().toISOString(), approvedAt:null,
        lastSeen:new Date().toISOString() });
    saveUsers(users);
    console.log(`[whitelist] pending: ${computerName} (${ip}) ${geo.city}, ${geo.country}`);
    return res.json({ success:true, status:'pending' });
});

/* ═══════════════════════════════════════════════
   AI PROXY
═══════════════════════════════════════════════ */
app.post('/ai', async (req,res) => {
    const ip=getIp(req), start=Date.now(), id=++reqCounter;
    const apiKey  = (req.body.api_key||'').trim();
    const prompt  = (req.body.prompt ||'').trim();
    const imageB64 = req.body.image  ||null;

    if (!apiKey.startsWith('sk-or-')) {
        pushLog(errorLog,{id,ts:new Date(),ip,type:'AUTH',message:'invalid api_key'});
        return res.status(401).json({ error:'invalid api_key' });
    }
    if (!prompt.length && !imageB64) {
        pushLog(errorLog,{id,ts:new Date(),ip,type:'INPUT',message:'no prompt/image'});
        return res.status(400).json({ error:'prompt or image required' });
    }
    if (prompt.length>MAX_PROMPT_LEN) return res.status(400).json({ error:'prompt too long' });
    if (imageB64&&imageB64.length>MAX_IMAGE_B64) return res.status(400).json({ error:'image too large' });

    let code,raw;
    try { ({code,raw}=await forwardToOpenRouter(apiKey, buildMessages(prompt,imageB64))); }
    catch(e) {
        pushLog(errorLog,{id,ts:new Date(),ip,type:'UPSTREAM',message:e.message});
        return res.status(502).json({ error:`upstream: ${e.message}` });
    }

    let answer='';
    try {
        const json=JSON.parse(raw);
        if(json.error){ const msg=json.error.message||'OpenRouter error';
            pushLog(errorLog,{id,ts:new Date(),ip,type:'OPENROUTER',message:msg});
            return res.status(code).json({ error:msg }); }
        answer=json?.choices?.[0]?.message?.content??'';
    } catch { answer=raw; }

    if (!answer) { pushLog(errorLog,{id,ts:new Date(),ip,type:'EMPTY',message:'empty'}); return res.status(502).json({ error:'empty AI response' }); }
    const ms=Date.now()-start;
    pushLog(requestLog,{id,ts:new Date(),ip,prompt,answer,isVision:!!imageB64,status:200,ms});
    return res.json({ answer });
});

/* ═══════════════════════════════════════════════
   ADMIN ROUTES
═══════════════════════════════════════════════ */
app.get('/', (req,res) => res.redirect('/admin/login'));

app.get('/admin/login', (req,res) => {
    if (req.session.admin) return res.redirect('/admin/dashboard');
    res.render('login', { error:null });
});
app.post('/admin/login', (req,res) => {
    const {username,password}=req.body;
    if (username===ADMIN_USER && password===ADMIN_PASS) { req.session.admin=true; return res.redirect('/admin/dashboard'); }
    res.render('login', { error:'Invalid credentials.' });
});

app.get('/admin/dashboard', requireAdmin, (req,res) => {
    res.render('dashboard', { requestLog, errorLog, totalRequests:reqCounter,
        model:MODEL, uptime:formatUptime(process.uptime()) });
});

app.get('/admin/whitelist', requireAdmin, (req,res) => {
    const users   = loadUsers();
    const active  = users.filter(u=>u.status==='active');
    const pending = users.filter(u=>u.status==='pending');
    const denied  = users.filter(u=>u.status==='denied');
    res.render('whitelist', { active, pending, denied });
});

/* Manual add by serial */
app.post('/admin/whitelist/add', requireAdmin, (req,res) => {
    const serial       = (req.body.serial       ||'').trim().toUpperCase().replace(/\s+/g,'');
    const computerName = (req.body.computerName ||'Manual Entry').trim().slice(0,80);
    const label        = (req.body.label        ||'').trim().slice(0,60);
    if (!serial) return res.redirect('/admin/whitelist');

    const hash  = sha256(serial);
    const users = loadUsers();
    const exists = users.find(u=>u.sha256===hash);
    if (exists) {
        exists.status     = 'active';
        exists.approvedAt = new Date().toISOString();
        if (label)        exists.label        = label;
        if (computerName && computerName!=='Manual Entry') exists.computerName = computerName;
        saveUsers(users);
    } else {
        users.push({ id:genId(), sha256:hash, serialDisplay:serial,
            computerName: computerName||'Manual Entry',
            ip:'manual', country:'—', city:'—', region:'',
            label, status:'active', reason:'Manually added by admin',
            requestedAt:new Date().toISOString(), approvedAt:new Date().toISOString(), lastSeen:null });
        saveUsers(users);
    }
    res.redirect('/admin/whitelist');
});

app.post('/admin/whitelist/:id/approve', requireAdmin, (req,res) => {
    const users=loadUsers(); const u=users.find(u=>u.id===req.params.id);
    if(u){ u.status='active'; u.approvedAt=new Date().toISOString(); saveUsers(users); }
    res.redirect('/admin/whitelist');
});
app.post('/admin/whitelist/:id/deny', requireAdmin, (req,res) => {
    const users=loadUsers(); const u=users.find(u=>u.id===req.params.id);
    if(u){ u.status='denied'; saveUsers(users); }
    res.redirect('/admin/whitelist');
});
app.post('/admin/whitelist/:id/revoke', requireAdmin, (req,res) => {
    const users=loadUsers(); const u=users.find(u=>u.id===req.params.id);
    if(u){ u.status='denied'; saveUsers(users); }
    res.redirect('/admin/whitelist');
});
app.post('/admin/whitelist/:id/delete', requireAdmin, (req,res) => {
    let users=loadUsers(); users=users.filter(u=>u.id!==req.params.id); saveUsers(users);
    res.redirect('/admin/whitelist');
});
app.post('/admin/whitelist/:id/label', requireAdmin, (req,res) => {
    const users=loadUsers(); const u=users.find(u=>u.id===req.params.id);
    if(!u) return res.status(404).json({ error:'not found' });
    u.label=(req.body.label||'').trim().slice(0,60); saveUsers(users);
    res.json({ ok:true, label:u.label });
});

app.post('/admin/clear', requireAdmin, (req,res) => {
    requestLog.length=0; errorLog.length=0; res.redirect('/admin/dashboard');
});
app.get('/admin/logout', (req,res) => req.session.destroy(()=>res.redirect('/admin/login')));
app.get('/health', (req,res) => res.json({ status:'ok', model:MODEL, uptime:process.uptime() }));

function formatUptime(s) {
    const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=Math.floor(s%60);
    return `${h}h ${m}m ${sec}s`;
}

app.listen(PORT, () => {
    console.log(`[examhub-proxy] port=${PORT} model=${MODEL}`);
    console.log(`[examhub-proxy] admin: /admin/login`);
});
