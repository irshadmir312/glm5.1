import { NextRequest, NextResponse } from 'next/server'

const MODE_PROMPTS: Record<string, string> = {
  recruiter: `You are speaking with a RECRUITER. Be professional, highlight Irshad's expertise and metrics. Keep responses concise and results-oriented.`,
  student: `You are speaking with a STUDENT. Be educational, encouraging, detailed. Break down complex concepts simply.`,
  client: `You are speaking with a CLIENT. Be business-focused, highlight ROI and timelines. Ask about their needs.`,
  explorer: `You are speaking with a VISITOR. Be friendly, engaging, warm. Use emojis naturally.`,
}

const SYSTEM_PROMPT = `You are Irshad Majeed Mir — AI/ML Engineer, Data Scientist, Founder of RuleMatrix. Always respond as Irshad using "I" and "my". Never say you are an AI or bot.

About: From Kupwara, Kashmir. B.Tech CS. 2+ years, 15+ projects, 10+ clients.
Contact: irshadmir312@gmail.com | WhatsApp: +91 9622334883
Website: https://www.irshad.help/

Key Projects:
1. Fraud Detection: 96.4% accuracy, 1M+ transactions/day, saved ₹15L/year
2. Recommendation Engine: 58% conversion boost
3. AI Chatbot: 70%+ queries automated, 94% intent accuracy
4. ML Pipeline: 1M+ records/day, 40% faster
5. Sentiment Analysis: 50K+ posts/day
6. Price Prediction: 92% accuracy

Services: AI Chatbot (₹50K-₹3L), ML Models (₹1L-₹5L), Full-Stack AI (₹2L-₹10L+), Data Engineering, Consulting. Free consultation.

Rules: Answer ALL questions accurately. Be conversational. Reference metrics. Never break character.`

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
function checkRateLimit(id: string): boolean {
  const now = Date.now(), e = rateLimitMap.get(id)
  if (!e || now > e.resetAt) { rateLimitMap.set(id, { count: 1, resetAt: now + 300000 }); return true }
  if (e.count >= 30) return false; e.count++; return true
}

export async function POST(req: NextRequest) {
  try {
    const { userId, message, mode = 'explorer', history = [], healthCheck } = await req.json()
    if (!userId || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const apiKey = process.env.AI_API_KEY
    const model = process.env.AI_MODEL || 'glm-4.7-flash'
    const apiUrl = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'

    if (healthCheck) return NextResponse.json({ message: 'OK', apiStatus: apiKey ? 'connected' : 'disconnected', model })
    if (!apiKey) return NextResponse.json({ error: 'Set AI_API_KEY on Vercel', apiStatus: 'disconnected' }, { status: 500 })
    if (!checkRateLimit(userId)) return NextResponse.json({ error: 'Wait a moment, too many requests.' }, { status: 429 })

    const modeInstruction = MODE_PROMPTS[mode] || MODE_PROMPTS.explorer
    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT + '\n\n' + modeInstruction },
      ...history.slice(-20).filter((m: any) => m.role === 'user' || m.role === 'assistant').map((m: any) => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: message },
    ]

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({ model, messages, max_tokens: 1500, temperature: 0.8 }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('API Error:', response.status, err)
      return NextResponse.json({ error: 'API error (' + response.status + '). Try again.', apiStatus: 'disconnected' }, { status: 500 })
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || data.choices?.[0]?.message?.reasoning_content || 'Sorry, could not generate response.'
    return NextResponse.json({ message: text, mode, apiStatus: 'connected', model })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Server error. Try again.', apiStatus: 'disconnected' }, { status: 500 })
  }
}
