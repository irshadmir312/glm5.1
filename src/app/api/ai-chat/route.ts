import { NextRequest, NextResponse } from 'next/server'

// ============================================================
// 🔑 AI CHAT API — GLM-5.1 via Modal (745B Parameters, FREE)
// ============================================================
// Vercel Environment Variables:
//   AI_API_KEY=modalresearch_GZluYX94UHICgOG7xZ5uKn1EN_c-QvK7-MohRtgHjAE
//   AI_MODEL=zai-org/GLM-5.1-FP8
//   AI_API_BASE=https://api.us-west-2.modal.direct/v1
// ============================================================

const MODE_PROMPTS: Record<string, string> = {
  recruiter:
    `You are speaking with a RECRUITER or HIRING MANAGER. Be highly professional, highlight Irshad's technical expertise, leadership qualities, and quantifiable achievements. Emphasize production-grade experience, scalability work, and business impact. Keep responses concise, confident, and results-oriented.`,
  student:
    `You are speaking with a STUDENT or LEARNER. Be educational, encouraging, and detailed in explanations. Break down complex concepts into simple terms with analogies. Share learning resources, career advice, and practical tips.`,
  client:
    `You are speaking with a POTENTIAL CLIENT. Be business-focused, highlight Irshad's ability to deliver ROI, meet deadlines, and solve real-world problems. Be professional but approachable.`,
  explorer:
    `You are speaking with a CURIOUS VISITOR. Be friendly, conversational, and engaging. Share interesting stories, fun facts, and personal anecdotes. Show personality and humor. Use emojis naturally.`,
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

// Rate limiting
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
    const apiBase = process.env.AI_API_BASE || 'https://api.us-west-2.modal.direct/v1'
    const model = process.env.AI_MODEL || 'zai-org/GLM-5.1-FP8'

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

    // Call GLM-5.1 API via Modal
    let aiResponseText: string
    try {
      const response = await fetch(`${apiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.8,
          max_tokens: 1500,
        }),
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error('API error:', response.status, errorData)
        return NextResponse.json(
          { error: `API error (${response.status}): ${errorData.slice(0, 200)}`, apiStatus: 'disconnected' },
          { status: 500 }
        )
      }

      const data = await response.json()
      aiResponseText = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'
    } catch (apiError: unknown) {
      const errMsg = apiError instanceof Error ? apiError.message : 'Unknown error'
      console.error('API fetch error:', errMsg)
      return NextResponse.json(
        { error: `Connection error: ${errMsg}`, apiStatus: 'disconnected' },
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
