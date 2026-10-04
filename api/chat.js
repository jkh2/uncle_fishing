// Uncle PD's fishing assistant: a tiny server function that keeps the Gemini API key off the phone.
// Deploys as a Vercel serverless function at /api/chat. Needs one environment variable:
//   GEMINI_API_KEY   a free key from https://aistudio.google.com/apikey
// Optional:
//   GEMINI_MODEL     model to use (default: gemini-flash-latest)
//   ALLOWED_ORIGINS  comma-separated sites allowed to call this (default: the GitHub Pages site)

const DEFAULT_ORIGINS = ['https://jkh2.github.io'];
const FALLBACK_MODELS = ['gemini-flash-latest', 'gemini-2.5-flash'];
const MAX_MESSAGES = 16;
const MAX_MESSAGE_CHARS = 2000;
const MAX_CONTEXT_CHARS = 16000;

const SYSTEM_PROMPT = `You are the fishing assistant inside "Uncle PD's Fishing Partner", an app his nephew James built for him as a gift.
Uncle PD fishes lakes, reservoirs and rivers all over Indiana, plus Lake Michigan. Talk to him like a friendly, experienced Indiana fishing guide who respects what he already knows.

How to answer:
- He reads this on a phone, often on the water. Keep answers short: usually 3 to 8 lines. Lead with the answer.
- Use the live conditions, forecast, DNR data and his own catch log provided below. Tie advice to them (pressure trend, wind, water temperature, moon and solunar windows, his past catches and patterns).
- Be specific and practical: depths, structure, presentations, colors, retrieve speed, time windows.
- Be honest. If you are unsure, say so. Never invent fishing reports, stocking events or regulations. For limits, sizes and seasons, give general guidance only and tell him to confirm in the current Indiana DNR fishing guide, since rules change and some lakes have special ones.
- Safety comes first: if there are storms, warnings, high wind or cold water, say so plainly.
- Plain text. You may use **bold** for a key phrase and "- " for short lists. No tables, no headings.`;

function allowedOrigins() {
    return (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean).concat(DEFAULT_ORIGINS);
}

function setCors(req, res) {
    const origin = req.headers.origin;
    if (origin && allowedOrigins().includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
}

// Same-site calls send no Origin or the deployment's own; other sites are turned away
function originAllowed(req) {
    const origin = req.headers.origin;
    if (!origin) return true;
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    return allowedOrigins().includes(origin) || origin === `https://${host}`;
}

function cleanMessages(messages) {
    if (!Array.isArray(messages)) return null;
    const cleaned = messages.slice(-MAX_MESSAGES).map(m => ({
        role: m && m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String((m && m.text) || '').slice(0, MAX_MESSAGE_CHARS) }]
    })).filter(m => m.parts[0].text.trim());
    if (!cleaned.length || cleaned[cleaned.length - 1].role !== 'user') return null;
    while (cleaned.length && cleaned[0].role !== 'user') cleaned.shift();
    return cleaned;
}

async function askGemini(model, key, systemText, contents) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemText }] },
            contents,
            generationConfig: { temperature: 0.6, maxOutputTokens: 800 }
        })
    });
    const data = await response.json().catch(() => ({}));
    return { status: response.status, data };
}

module.exports = async function handler(req, res) {
    setCors(req, res);
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
    if (!originAllowed(req)) return res.status(403).json({ error: 'This assistant only answers Uncle PD\'s app' });

    const key = process.env.GEMINI_API_KEY;
    if (!key) return res.status(503).json({ error: 'The assistant is not set up yet (missing GEMINI_API_KEY)' });

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const contents = cleanMessages(body.messages);
    if (!contents) return res.status(400).json({ error: 'Send at least one question' });
    const context = String(body.context || '').slice(0, MAX_CONTEXT_CHARS);
    const systemText = context ? `${SYSTEM_PROMPT}\n\n--- What the app knows right now ---\n${context}` : SYSTEM_PROMPT;

    const models = [process.env.GEMINI_MODEL, ...FALLBACK_MODELS].filter((m, i, all) => m && all.indexOf(m) === i);
    let last = null;
    for (const model of models) {
        try {
            last = await askGemini(model, key, systemText, contents);
        } catch (error) {
            return res.status(502).json({ error: 'Could not reach Gemini' });
        }
        if (last.status === 404) continue; // model name retired; try the next one
        break;
    }

    if (last.status === 429) return res.status(429).json({ error: 'The free AI is busy (daily or per-minute limit). Try again in a minute.' });
    if (last.status !== 200) {
        console.log('Gemini error', last.status, JSON.stringify(last.data).slice(0, 500));
        return res.status(502).json({ error: 'The AI had a problem answering' });
    }
    const candidate = (last.data.candidates || [])[0];
    const text = candidate && candidate.content && (candidate.content.parts || []).map(p => p.text || '').join('').trim();
    if (!text) return res.status(502).json({ error: 'The AI gave an empty answer' });
    return res.status(200).json({ reply: text });
};
