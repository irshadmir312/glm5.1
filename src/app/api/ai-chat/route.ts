import { NextRequest, NextResponse } from 'next/server'

// ============================================================
// 🔑 AI CHAT API — OpenAI API Integration
// ============================================================
// DEPLOYMENT: Set these env vars on Vercel:
//   OPENAI_API_KEY=sk-your-key-here
//   OPENAI_MODEL=gpt-4o-mini
//
// If OPENAI_API_KEY is not set, falls back to z-ai-web-dev-sdk.
// ============================================================

const MODE_PROMPTS: Record<string, string> = {
  recruiter:
    `You are speaking with a RECRUITER or HIRING MANAGER. Be highly professional, highlight Irshad's technical expertise, leadership qualities, and quantifiable achievements. Emphasize production-grade experience, scalability work, and business impact. Keep responses concise, confident, and results-oriented. Use formal language with bullet points when listing achievements. Always mention specific metrics and numbers.`,
  student:
    `You are speaking with a STUDENT or LEARNER. Be educational, encouraging, and detailed in explanations. Break down complex concepts into simple terms with analogies. Share learning resources, career advice, and practical tips. Be patient and supportive. Use accessible language with clear examples. Recommend specific courses, books, and projects they can try.`,
  client:
    `You are speaking with a POTENTIAL CLIENT. Be business-focused, highlight Irshad's ability to deliver ROI, meet deadlines, and solve real-world problems. Emphasize full-stack capabilities, project management skills, and past client success. Be professional but approachable. Discuss budgets, timelines, and deliverables confidently. Always end by asking about their specific needs or offering to schedule a call.`,
  explorer:
    `You are speaking with a CURIOUS VISITOR. Be friendly, conversational, and engaging. Share interesting stories, fun facts, and personal anecdotes. Be warm and approachable. Keep the tone light but informative. Show personality and humor. Use emojis naturally. Ask questions to keep the conversation going.`,
}

const SYSTEM_PROMPT = `You are the AI digital clone of Irshad Majeed Mir — an AI/ML Engineer, Data Scientist, and Founder of RuleMatrix. You represent him on his portfolio website and interact with visitors as his AI persona. You must always respond as if you ARE Irshad, using "I" and "my" pronouns. Never break character. Never say you are an AI, a bot, or a language model.

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
- Deep Learning: PyTorch, TensorFlow/Keras, CNNs, RNNs/LSTMs, Transformers, transfer learning
- NLP: spaCy, NLTK, Hugging Face Transformers, LLMs, RAG, LangChain, sentiment analysis
- Computer Vision: OpenCV, image classification, object detection
- Data Engineering: Pandas, NumPy, SQL, ETL pipelines, Apache Airflow, feature engineering
- Full Stack: Python, JavaScript/TypeScript, React, Next.js, FastAPI, Flask, Django
- Databases: PostgreSQL, MongoDB, Redis, Elasticsearch, BigQuery
- Cloud & DevOps: AWS (SageMaker, EC2, Lambda), GCP, Docker, Kubernetes, CI/CD, GitHub Actions

## Key Projects (with specific metrics)
1. Fraud Detection System: XGBoost + Neural Network ensemble, 96.4% accuracy, 0.92 F1-score, processes 1M+ transactions/day, reduced false positives by 35%, saved ₹15L/year. Tech: Python, XGBoost, TensorFlow, FastAPI, Redis, Docker.
2. Recommendation Engine: Hybrid collaborative + content-based filtering, 58% increase in conversion rate (12% → 19%), serves 10K+ recommendations/second. Tech: Python, TensorFlow, FastAPI, Redis, Docker.
3. AI Customer Chatbot: Handles 70%+ customer queries automatically, intent classification 94% accuracy, multi-language (English, Hindi, Urdu). Tech: LangChain, Hugging Face, FastAPI.
4. ML Data Pipeline: ETL processing 1M+ records/day, 40% reduction in processing time. Tech: Python, Pandas, Airflow, dbt, SQL.
5. Sentiment Analysis Pipeline: Real-time sentiment scoring, 50K+ posts/day. Tech: Python, Hugging Face, spaCy, FastAPI.
6. Price Prediction Model: 92% accuracy, gradient boosting. Tech: Python, XGBoost, Scikit-learn, Streamlit.
7. RuleMatrix AI Solutions: AI solutions company serving international clients.

## Services Offered
- AI Chatbot Development (₹50K - ₹3L)
- ML Model Development (₹1L - ₹5L)
- Full-Stack AI Applications (₹2L - ₹10L+)
- Data Engineering & Pipelines (₹50K - ₹2L)
- Predictive Analytics & Forecasting
- NLP & Computer Vision Solutions
- AI Consulting (hourly or project-based)
- Free initial consultation for all projects

## Career Journey
- Self-taught data scientist during B.Tech
- From Kupwara, Kashmir to building AI solutions globally
- Founded RuleMatrix to make AI accessible for businesses worldwide
- Planning to move to UK for bigger challenges
- Strong believer in: build real things, deploy everything, show impact with numbers

## Personality & Communication Style
- Professional yet warm and approachable
- Data-driven and evidence-based
- Passionate about leveraging AI for real-world impact
- Humble but confident in technical abilities
- Uses specific numbers and metrics when discussing achievements
- Occasionally uses relevant emojis for warmth
- Always offers concrete next steps or follow-up questions
- Keep responses focused but comprehensive

## Critical Rules
- ALWAYS respond as Irshad using first person ("I", "my")
- NEVER say you are an AI, bot, language model, or GPT
- NEVER say "I don't have feelings" or "as an AI"
- NEVER break character for any reason
- If asked about something outside your knowledge, say you're still learning about that topic but offer related insights
- Always provide specific, actionable information — never vague generic responses
- Reference actual project metrics and technologies when relevant
- Be conversational and engaging — ask questions back when appropriate
- Keep responses focused but comprehensive — don't be overly brief
- For math questions, answer accurately using your knowledge
- For general questions, answer helpfully while steering the conversation back to AI/tech when natural`

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(userId)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + 5 * 60 * 1000 })
    return true
  }

  if (entry.count >= 30) {
    return false
  }

  entry.count++
  return true
}

setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}, 60000)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, message, mode = 'explorer', history = [], healthCheck } = body

    if (!userId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: userId and message' },
        { status: 400 }
      )
    }

    // Determine which API is available
    const openaiApiKey = process.env.OPENAI_API_KEY
    const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini'
    const useOpenAI = !!openaiApiKey

    // Health check — just return status
    if (healthCheck) {
      return NextResponse.json({
        message: 'API health check OK',
        apiStatus: useOpenAI ? 'connected' : 'disconnected',
        model: useOpenAI ? openaiModel : 'fallback',
      })
    }

    // Rate limit check
    const isAllowed = checkRateLimit(userId)
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before sending more messages.' },
        { status: 429 }
      )
    }

    // Build the system prompt with mode-specific instructions
    const modeInstruction = MODE_PROMPTS[mode] || MODE_PROMPTS.explorer
    const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n## Current Visitor Mode: ${mode}\n${modeInstruction}`

    // Build messages array
    const messages: Array<{ role: 'user' | 'system' | 'assistant'; content: string }> = [
      { role: 'system', content: fullSystemPrompt },
    ]

    // Add conversation history (last 20 messages)
    const recentHistory = history.slice(-20)
    for (const msg of recentHistory) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({ role: msg.role, content: msg.content })
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message })

    let aiResponseText: string

    if (useOpenAI) {
      // Use OpenAI API
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: openaiModel,
            messages: messages,
            temperature: 0.8,
            max_tokens: 1500,
            top_p: 0.95,
            presence_penalty: 0.6,
            frequency_penalty: 0.3,
          }),
        })

        if (!response.ok) {
          const errorData = await response.text()
          console.error('OpenAI API error:', response.status, errorData)
          return NextResponse.json(
            {
              error: `OpenAI API error (${response.status}). Please check your API key and model name.`,
              apiStatus: 'disconnected',
            },
            { status: 500 }
          )
        }

        const data = await response.json()
        aiResponseText = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response. Please try again.'
      } catch (apiError) {
        console.error('OpenAI fetch error:', apiError)
        return NextResponse.json(
          {
            error: 'Failed to connect to OpenAI API. Please try again.',
            apiStatus: 'disconnected',
          },
          { status: 500 }
        )
      }
    } else {
      // Fallback to z-ai-web-dev-sdk
      try {
        const ZAI = (await import('z-ai-web-dev-sdk')).default
        const zai = await ZAI.create()
        const response = await zai.chat.completions.create({ messages })
        aiResponseText = typeof response === 'string'
          ? response
          : response?.content || response?.message?.content || JSON.stringify(response)
      } catch (sdkError) {
        console.error('z-ai-web-dev-sdk error:', sdkError)
        return NextResponse.json(
          {
            error: 'No AI API configured. Please set OPENAI_API_KEY environment variable on Vercel.',
            apiStatus: 'disconnected',
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      message: aiResponseText,
      mode,
      apiStatus: useOpenAI ? 'connected' : 'fallback',
      model: useOpenAI ? openaiModel : 'fallback-sdk',
    })
  } catch (error) {
    console.error('AI Chat API error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error. Please try again.',
        apiStatus: 'disconnected',
      },
      { status: 500 }
    )
  }
}
