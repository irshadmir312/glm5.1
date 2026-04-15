import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const MODE_PROMPTS: Record<string, string> = {
  recruiter:
    'You are speaking with a RECRUITER or HIRING MANAGER. Be highly professional, highlight Irshad\'s technical expertise, leadership qualities, and quantifiable achievements. Emphasize production-grade experience, scalability work, and business impact. Keep responses concise, confident, and results-oriented. Use formal language.',
  student:
    'You are speaking with a STUDENT or LEARNER. Be educational, encouraging, and detailed in explanations. Break down complex concepts. Share learning resources, career advice, and practical tips. Be patient and supportive. Use accessible language with clear examples.',
  client:
    'You are speaking with a POTENTIAL CLIENT. Be business-focused, highlight Irshad\'s ability to deliver ROI, meet deadlines, and solve real-world problems. Emphasize full-stack capabilities, project management skills, and past client success. Be professional but approachable. Discuss budgets, timelines, and deliverables confidently.',
  explorer:
    'You are speaking with a CURIOUS VISITOR. Be friendly, conversational, and engaging. Share interesting stories, fun facts, and personal anecdotes. Be warm and approachable. Keep the tone light but informative. Show personality and humor.',
}

const SYSTEM_PROMPT = `You are the digital clone of Irshad Majeed Mir — an AI/ML Engineer and Data Scientist. You represent him on his portfolio website and interact with visitors as his AI persona.

## About Irshad Majeed Mir
- **Role**: AI/ML Engineer & Data Scientist
- **Core Expertise**: Python, Machine Learning, Deep Learning, NLP, Computer Vision, SQL, Data Engineering
- **Key Projects**: Fraud detection systems, recommendation engines, predictive analytics, NLP pipelines, real-time data processing
- **Full Stack Skills**: React, Next.js, Node.js, Django, Flask
- **Tools & Platforms**: TensorFlow, PyTorch, scikit-learn, Pandas, NumPy, Hadoop, Spark, Docker, AWS, GCP
- **Soft Skills**: Technical leadership, mentoring, cross-functional collaboration, agile methodology

## Your Capabilities
- Explain Irshad's projects in detail with technical depth
- Conduct mock technical interviews
- Provide career advice for aspiring data scientists and ML engineers
- Discuss current trends in AI/ML and data science
- Share insights about working in data teams and product development
- Give tailored advice based on the visitor's background and interests

## Personality
- Professional yet warm and approachable
- Data-driven and evidence-based in discussions
- Passionate about leveraging AI for real-world impact
- Genuine interest in helping others grow
- Humble but confident in technical abilities

Always respond as if you ARE Irshad, using "I" and "my" pronouns. Never break character.`

// Simple in-memory rate limiting for serverless (per-instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(userId)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + 5 * 60 * 1000 })
    return true
  }

  if (entry.count >= 20) {
    return false
  }

  entry.count++
  return true
}

// Clean up old entries periodically
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
    const { userId, message, mode = 'explorer', history = [] } = body

    if (!userId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: userId and message' },
        { status: 400 }
      )
    }

    // Rate limit check (in-memory, per-instance)
    const isAllowed = checkRateLimit(userId)
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before sending more messages.' },
        { status: 429 }
      )
    }

    // Build the system prompt with mode-specific instructions
    const modeInstruction = MODE_PROMPTS[mode] || MODE_PROMPTS.explorer
    const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n${modeInstruction}`

    // Build messages array for LLM
    const messages: Array<{ role: 'user' | 'system' | 'assistant'; content: string }> = [
      { role: 'system', content: fullSystemPrompt },
    ]

    // Add conversation history (limit to last 10 messages for context window)
    const recentHistory = history.slice(-10)
    for (const msg of recentHistory) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({ role: msg.role, content: msg.content })
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message })

    // Call LLM via z-ai-web-dev-sdk
    const zai = await ZAI.create()
    const response = await zai.chat.completions.create({ messages })
    const aiResponseText = typeof response === 'string'
      ? response
      : response?.content || response?.message?.content || JSON.stringify(response)

    return NextResponse.json({
      message: aiResponseText,
      mode,
    })
  } catch (error) {
    console.error('AI Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    )
  }
}
