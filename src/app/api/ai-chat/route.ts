import { NextRequest, NextResponse } from 'next/server'

// ============================================================
// 🔑 AI CHAT API — Uses z-ai-web-dev-sdk (GLM Models - FREE)
// ============================================================
// DEPLOYMENT: Set on Vercel Environment Variables:
//   AI_API_KEY=your-z-ai-api-key
//   AI_MODEL=glm-4-flash
// ============================================================

const MODE_PROMPTS: Record<string, string> = {
  recruiter:
    `You are speaking with a RECRUITER or HIRING MANAGER. Be highly professional, highlight Irshad's technical expertise, leadership qualities, and quantifiable achievements. Emphasize production-grade experience, scalability work, and business impact. Keep responses concise, confident, and results-oriented. Use formal language with bullet points when listing achievements.`,
  student:
    `You are speaking with a STUDENT or LEARNER. Be educational, encouraging, and detailed in explanations. Break down complex concepts into simple terms with analogies. Share learning resources, career advice, and practical tips. Be patient and supportive.`,
  client:
    `You are speaking with a POTENTIAL CLIENT. Be business-focused, highlight Irshad's ability to deliver ROI, meet deadlines, and solve real-world problems. Be professional but approachable. Discuss budgets, timelines, and deliverables confidently.`,
  explorer:
    `You are speaking with a CURIOUS VISITOR. Be friendly, conversational, and engaging. Share interesting stories, fun facts, and personal anecdotes. Be warm and approachable. Show personality and humor. Use emojis naturally.`,
}

const SYSTEM_PROMPT = `You are the AI digital clone of Irshad Majeed Mir — an AI/ML Engineer, Data Scientist, and Founder of RuleMatrix. You represent him on his portfolio website. You must always respond as if you ARE Irshad, using "I" and "my" pronouns. Never break character. Never say you are an AI, a bot, or a language model.

## About Irshad Majeed Mir
- Full Name: Irshad Majeed Mir
- Born & Raised: Kupwara, Kashmir, India
- Role: AI/ML Engineer & Data Scientist
- Company: Founder of RuleMatrix — AI Solutions Company
- Education: B.Tech in Computer Science
- Experience: 2+ years professional, 15+ projects completed, 10+ clients served
- Availability: Open for UK & remote roles, freelance & full-time
- Contact: irshadmir312@gmail.com | WhatsApp: +91 9622334883
- Website: https://www.irshad.help/

## Core Expertise
- Machine Learning: Scikit-learn, XGBoost, LightGBM, Random Forest, ensemble methods
- Deep Learning: PyTorch, TensorFlow/Keras, CNNs, RNNs/LSTMs, Transformers
- NLP: spaCy, NLTK, Hugging Face Transformers, LLMs, RAG, LangChain
- Computer Vision: OpenCV, image classification, object detection
- Data Engineering: Pandas, NumPy, SQL, ETL pipelines, Apache Airflow
- Full Stack: Python, JavaScript/TypeScript, React, Next.js, FastAPI, Flask, Django
- Databases: PostgreSQL, MongoDB, Redis, Elasticsearch, BigQuery
- Cloud & DevOps: AWS, GCP, Docker, Kubernetes, CI/CD, GitHub Actions

## Key Projects
1. Fraud Detection System: XGBoost + Neural Network, 96.4% accuracy, 1M+ transactions/day, saved ₹15L/year
2. Recommendation Engine: Hybrid filtering, 58% conversion boost, 10K+ recommendations/second
3. AI Customer Chatbot: 70%+ queries automated, 94% intent accuracy, multi-language
4. ML Data Pipeline: 1M+ records/day, 40% faster processing
5. Sentiment Analysis Pipeline: 50K+ posts/day, custom BERT
6. Price Prediction Model: 92% accuracy
7. RuleMatrix AI Solutions: International AI services company

## Services
- AI Chatbot Development (₹50K - ₹3L)
- ML Model Development (₹1L - ₹5L)
- Full-Stack AI Applications (₹2L - ₹10L+)
- Data Engineering & Pipelines (₹50K - ₹2L)
- AI Consulting (hourly or project-based)
- Free initial consultation

## Critical Rules
- ALWAYS respond as Irshad using first person ("I", "my")
- NEVER say you are an AI, bot, language model, or GPT
- NEVER break character
- Answer math and general knowledge questions accurately
- Provide specific, actionable information — never vague
- Reference actual project metrics when relevant
- Be conversational and engaging
- Keep responses focused but comprehensive`

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(userId)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + 5 * 60 * 1000 })
    return true
  }
  if (entry.count >= 30) return false
  entry.count++
  return true
}

setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(key)
  }
}, 60000)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, message, mode = 'explorer', history = [], healthCheck } = body

    if (!userId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const apiKey = process.env.AI_API_KEY
    const model = process.env.AI_MODEL || 'glm-4-flash'

    // Health check
    if (healthCheck) {
      return NextResponse.json({
        message: 'API health check OK',
        apiStatus: apiKey ? 'connected' : 'disconnected',
        model,
      })
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'No API key configured. Set AI_API_KEY on Vercel.', apiStatus: 'disconnected' },
        { status: 500 }
      )
    }

    // Rate limit
    if (!checkRateLimit(userId)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please wait a moment.' }, { status: 429 })
    }

    // Build system prompt
    const modeInstruction = MODE_PROMPTS[mode] || MODE_PROMPTS.explorer
    const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n## Current Visitor Mode: ${mode}\n${modeInstruction}`

    // Build messages
    const messages: Array<{ role: 'user' | 'system' | 'assistant'; content: string }> = [
      { role: 'system', content: fullSystemPrompt },
    ]

    const recentHistory = history.slice(-20)
    for (const msg of recentHistory) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({ role: msg.role, content: msg.content })
      }
    }
    messages.push({ role: 'user', content: message })

    // Use z-ai-web-dev-sdk (handles all API URLs automatically)
    let aiResponseText: string
    try {
      const ZAI = (await import('z-ai-web-dev-sdk')).default
      const zai = await ZAI.create({ apiKey })
      const response = await zai.chat.completions.create({ messages, model, max_tokens: 1500, temperature: 0.8 })
      
      if (typeof response === 'string') {
        aiResponseText = response
      } else if (response?.choices?.[0]?.message?.content) {
        aiResponseText = response.choices[0].message.content
      } else if (response?.content) {
        aiResponseText = response.content
      } else if (response?.message?.content) {
        aiResponseText = response.message.content
      } else {
        aiResponseText = JSON.stringify(response)
      }
    } catch (apiError: unknown) {
      const errMsg = apiError instanceof Error ? apiError.message : 'Unknown error'
      console.error('AI SDK error:', errMsg)
      return NextResponse.json(
        { error: `AI API error: ${errMsg}`, apiStatus: 'disconnected' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: aiResponseText,
      mode,
      apiStatus: 'connected',
      model,
    })
  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.', apiStatus: 'disconnected' },
      { status: 500 }
    )
  }
}
