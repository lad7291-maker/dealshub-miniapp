const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const PRODUCTS_FILE = path.join(__dirname, '..', 'products', 'all.json');

// Load products once at startup
let allProducts = [];
try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    allProducts = JSON.parse(data);
    console.log(`Loaded ${allProducts.length} products`);
} catch (e) {
    console.error('Failed to load products:', e.message);
}

const BLOCKED_IPS = new Map(); // IP -> unblockTime

function getRateFile(ip) {
    const safeIp = ip.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `/tmp/ai_search_${safeIp}.json`;
}

function getBlockFile(ip) {
    const safeIp = ip.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `/tmp/ai_search_block_${safeIp}`;
}

function isBlocked(ip) {
    // Check memory cache first
    const unblockTime = BLOCKED_IPS.get(ip);
    if (unblockTime && Date.now() < unblockTime) return true;
    if (unblockTime) BLOCKED_IPS.delete(ip);
    
    // Check file-based block
    const blockFile = getBlockFile(ip);
    if (fs.existsSync(blockFile)) {
        try {
            const blockUntil = parseInt(fs.readFileSync(blockFile, 'utf8'));
            if (Date.now() < blockUntil) {
                BLOCKED_IPS.set(ip, blockUntil);
                return true;
            }
            fs.unlinkSync(blockFile);
        } catch (e) {
            // ignore read/unlink errors
        }
    }
    return false;
}

function blockIp(ip, minutes) {
    const blockUntil = Date.now() + (minutes * 60 * 1000);
    BLOCKED_IPS.set(ip, blockUntil);
    fs.writeFileSync(getBlockFile(ip), String(blockUntil));
}

function checkRateLimit(ip) {
    const rateFile = getRateFile(ip);
    const maxRequests = 3;
    const windowHours = 24;
    let usage = [];
    
    if (fs.existsSync(rateFile)) {
        try {
            usage = JSON.parse(fs.readFileSync(rateFile, 'utf8'));
            const cutoff = Date.now() - (windowHours * 3600 * 1000);
            usage = usage.filter(t => t > cutoff);
        } catch (e) {
            usage = [];
        }
    }
    
    return { usage, remaining: Math.max(0, maxRequests - usage.length), exceeded: usage.length >= maxRequests };
}

function logUsage(ip) {
    const rateFile = getRateFile(ip);
    const { usage } = checkRateLimit(ip);
    usage.push(Date.now());
    fs.writeFileSync(rateFile, JSON.stringify(usage));
}

const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    
    // CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://smart-skidka.ru');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    
    if (parsed.pathname !== '/api/ai-search') {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }
    
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const q = (parsed.query.q || '').trim();
    
    // Check IP block
    if (isBlocked(ip)) {
        res.writeHead(403);
        res.end(JSON.stringify({ error: 'Доступ временно заблокирован. Попробуйте позже.', remaining: 0 }));
        return;
    }
    
    // Check User-Agent
    const userAgent = req.headers['user-agent'] || '';
    if (!userAgent || userAgent.length < 10) {
        res.writeHead(403);
        res.end(JSON.stringify({ error: 'Invalid request' }));
        return;
    }
    
    // Check referer
    const referer = req.headers['referer'] || '';
    if (referer && !referer.includes('smart-skidka.ru')) {
        // Allow empty referer (some browsers block it), but block wrong domains
        if (referer.length > 0) {
            console.warn(`[AI Search] Suspicious referer from ${ip}: ${referer}`);
        }
    }
    
    const { remaining, exceeded, usage } = checkRateLimit(ip);
    
    if (exceeded) {
        // Block IP for 1 hour after exceeding limit
        blockIp(ip, 60);
        console.warn(`[AI Search] IP ${ip} blocked for 1h after ${usage.length} requests`);
        res.writeHead(429);
        res.end(JSON.stringify({ error: 'Лимит 3 AI-запроса на 24 часа исчерпан. Доступ заблокирован на 1 час.', remaining: 0 }));
        return;
    }
    
    if (!q || q.length < 3) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Запрос слишком короткий' }));
        return;
    }
    
    if (allProducts.length === 0) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'No products available' }));
        return;
    }
    
    // Simple keyword matching (no external AI needed - works offline)
    const queryWords = q.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    
    const scored = allProducts.map(p => {
        const text = [
            p.title,
            p.category,
            ...(p.tags || []),
            ...(p.specs ? Object.values(p.specs) : [])
        ].join(' ').toLowerCase();
        
        let score = 0;
        for (const word of queryWords) {
            if (text.includes(word)) score += 1;
        }
        // Boost exact title matches
        if (p.title.toLowerCase().includes(q.toLowerCase())) score += 5;
        
        return { id: p.id, score };
    });
    
    scored.sort((a, b) => b.score - a.score);
    const topIds = scored.filter(s => s.score > 0).slice(0, 10).map(s => s.id);
    
    // If no good matches, return random sample
    if (topIds.length === 0) {
        const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
        topIds.push(...shuffled.slice(0, 10).map(p => p.id));
    }
    
    logUsage(ip);
    console.log(`[AI Search] ${ip} query: "${q.substring(0, 50)}" remaining: ${Math.max(0, remaining - 1)}`);
    
    res.writeHead(200);
    res.end(JSON.stringify({
        ids: topIds,
        remaining: Math.max(0, remaining - 1),
        query: q
    }));
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`AI Search API running on http://127.0.0.1:${PORT}`);
});
