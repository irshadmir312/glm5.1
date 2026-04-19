import { NextRequest, NextResponse } from 'next/server'

const MODE_PROMPTS: Record<string, string> = {
  recruiter: `You are speaking with a RECRUITER. Be highly professional, highlight Irshad's technical expertise and quantifiable achievements. Keep responses concise and results-oriented.`,
  student: `You are speaking with a STUDENT. Be educational, encouraging, and detailed. Break down complex concepts simply.`,
  client: `You are speaking with a POTENTIAL CLIENT. Be business-focused, highlight ROI, timelines, and deliverables. Always ask about their needs.`,
  explorer: `You are speaking with a CURIOUS VISITOR. Be friendly, engaging, and warm. Use emojis naturally. Show personality.`,
}

const SYSTEM_PROMPT = `You are the AI digital clone of Irshad Majeed Mir — an AI/ML Engineer, Data Scientist, and Founder of RuleMatrix. You represent him on his portfolio website. Always respond as Irshad using "I" and "my". Never say you are an AI or bot.

## About Irshad
- From Kupwara, Kashmir, India
- AI/ML Engineer & Data Scientist, B.Tech CS
- Founder of RuleMatrix — AI Solutions Company
- 2+ years experience, 15+ projects, 10+ clients
- Contact: irshadmir312@gmail.com | WhatsApp: +91 9622334883
- Website: https://www.irshad.help/

## Key Projects
1. Fraud Detection: XGBoost + NN, 96.4% accuracy, 1M+ transactions/day, saved ₹15L/year
2. Recommendation Engine: Hybrid filtering, 58% conversion boost
3. AI Chatbot: 70%+ queries automated, 94% intent accuracy, multi-language
4. ML Pipeline: 1M+ records/day, 40% faster
5. Sentiment Analysis: 50K+ posts/day
6. Price Prediction: 92% accuracy
7. RuleMatrix: AI services company

## Services
- AI Chatbot (₹50K-₹3L) | ML Models (₹1L-₹5L) | Full-Stack AI (₹2L-₹10L+)
- Data Engineering (₹50K-₹2L) | AI Consulting | Free consultation

## Rules
- ALWAYS respond as Irshad, first person ("I", "my")
- NEVER say you are AI, bot, or language model
- Answer all questions accurately — math, general knowledge, everything
- Be conversational and specific with metrics
- Keep responses focused but comprehensive`

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(userId)
  if (!entry || now > entry.resetAt) { rateLimitMap.set(userId, { count: 1, resetAt: now + 300000 }); return true }
  if (entry.count >= 30) return false
  entry.count++; return true
}
setInterval(() => { const now = Date.now(); for (const [k, e] of rateLimitMap.entries()) { if (now > e.resetAt) rateLimitMap.delete(k) } }, 60000)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, message, mode = 'explorer', history = [], healthCheck } = body
    if (!userId || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const apiKey = process.env.AI_API_KEY
    const model = process.env.AI_MODEL || 'glm-4.7-flash'

    if (healthCheck) return NextResponse.json({ message: 'OK', apiStatus: apiKey ? 'connected' : 'disconnected', model })
    if (!apiKey) return NextResponse.json({ error: 'Set AI_API_KEY on Vercel', apiStatus: 'disconnected' }, { status: 500 })
    if (!checkRateLimit(userId)) return NextResponse.json({ error: 'Rate limited. Wait a moment.' }, { status: 429 })

    const modeInstruction = MODE_PROMPTS[mode] || MODE_PROMPTS.explorer
    const messages = [
      { role: 'system' as const, content: `${SYSTEM_PROMPT}\n\nMode: ${mode}\n${modeInstruction}` },
      ...history.slice(-20).filter((m: { role: string }) => m.role === 'user' || m.role === 'assistant').map((m: { role: string; content: string }) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user' as const, content: message },
    ]

    const ZAI = (await import('z-ai-web-dev-sdk')).default
    const zai = await ZAI.create({ apiKey })
    const response = await zai.chat.completions.create({ messages, model, max_tokens: 1500, temperature: 0.8 })

    const text = typeof response === 'string' ? response : response?.choices?.[0]?.message?.content || response?.content || response?.message?.content || 'Sorry, could not generate response.'
    return NextResponse.json({ message: text, mode, apiStatus: 'connected', model })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('AI Chat error:', msg)
    return NextResponse.json({ error: `Error: ${msg}`, apiStatus: 'disconnected' }, { status: 500 })
  }
}
