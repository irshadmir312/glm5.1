'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Trash2, Bot, User, Minimize2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePortfolioStore, type ChatMessage } from '@/store/portfolio'

const quickActions = [
  { label: 'My Projects', prompt: 'Tell me about your projects and their impact' },
  { label: 'Hire Me', prompt: 'I want to hire you for an AI project' },
  { label: 'AI Solutions', prompt: 'What AI solutions can you build for businesses?' },
  { label: 'Tech Stack', prompt: "What's your tech stack and expertise?" },
]

// Fallback responses when API is unavailable — written in first person as Irshad
const fallbackResponses: Record<string, string> = {
  interview: `Great question! Let me walk you through it:

**Handling Imbalanced Data:**

In my fraud detection project, the data was heavily imbalanced (~0.3% fraud). Here's what I did:

1. **SMOTE + ADASYN** for oversampling the minority class
2. **Class-weighted loss functions** in XGBoost and the neural network
3. **Custom threshold tuning** — I optimized the decision threshold for F1-score rather than accuracy
4. **Stratified K-fold cross-validation** to maintain class distribution

The result? 96.4% accuracy with a 0.92 F1-score, and we reduced false positives by 35%.

Would you like to hear about the architecture or deployment strategy?`,
  fraud: `## Fraud Detection System 🔍

This is one of my flagship projects! Here's a deep dive:

**The Problem:** A client was losing ₹5L/month to undetected fraudulent transactions. Their existing rule-based system was catching only 40% of fraud.

**What I Built:**
- **XGBoost + Neural Network ensemble** with real-time feature engineering
- Processing pipeline handling 1M+ transactions/day
- Real-time scoring via FastAPI + Redis (<50ms latency)

**Key Results:**
- **96.4% accuracy**, 0.92 F1-score
- Reduced false positives by 35%
- **₹15L saved annually** in prevented fraud losses
- 96.4% of fraud caught in real-time

**Tech Stack:** Python, XGBoost, TensorFlow, FastAPI, Redis, Docker

Want to know more about the feature engineering or deployment?`,
  career: `## Career Advice from My Journey 🚀

From Sopur, Kashmir to building AI solutions that impact businesses globally — here's what I've learned:

1. **Build a Strong Foundation** — Master Python, SQL, and statistics before jumping into frameworks
2. **Learn by Building Real Things** — My fraud detection system taught me more than 100 tutorials combined
3. **Specialize, Then Generalize** — I started with ML, then expanded to full-stack AI
4. **Deploy Everything** — A model in a notebook isn't a product. Learn MLOps early.
5. **Show Impact with Numbers** — "Reduced processing time by 40%" speaks louder than "used PyTorch"

The field moves fast — focus on fundamentals, and you'll adapt to any new technology.`,
  skills: `## My Tech Stack & Expertise 💡

**AI/ML (Expert):** Python, PyTorch, TensorFlow, Scikit-learn, XGBoost, Hugging Face
**Backend:** FastAPI, Flask, Node.js
**Frontend:** React, Next.js, Tailwind CSS
**Data:** PostgreSQL, MongoDB, Redis, Elasticsearch
**Cloud/DevOps:** AWS, Docker, GitHub Actions

**What I'm Best At:**
- End-to-end ML systems (data pipeline → model → deployment)
- Fraud detection & anomaly detection
- NLP pipelines & chatbot development
- Recommendation engines (collaborative + content-based)

**Currently Exploring:** Advanced RAG architectures, real-time ML inference optimization

Want me to dive deeper into any specific area?`,
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('interview') || lower.includes('mock')) return fallbackResponses.interview
  if (lower.includes('fraud') || lower.includes('project')) return fallbackResponses.fraud
  if (lower.includes('career') || lower.includes('advice')) return fallbackResponses.career
  if (lower.includes('skill') || lower.includes('assess') || lower.includes('tech stack') || lower.includes('expertise')) return fallbackResponses.skills
  if (lower.includes('hello') || lower.includes('hi')) return "Hey there! 👋 I'm Irshad's AI assistant. I can tell you about my projects — like the fraud detection system with 96.4% accuracy, or the recommendation engine that boosted conversions by 58%. What would you like to know?"
  if (lower.includes('hire') || lower.includes('contact') || lower.includes('email') || lower.includes('want to work')) return "I'd love to hear about your project! 🤝\n\nYou can reach me directly via:\n- **WhatsApp:** +91 9622334883\n- **Contact Form:** Scroll down to the contact section below\n\nI specialize in fraud detection, NLP pipelines, recommendation engines, and full-stack AI applications. Let's discuss how I can help your business!"
  if (lower.includes('tech stack') || lower.includes('technologies')) return "My core tech stack:\n\n**AI/ML:** Python, PyTorch, TensorFlow, XGBoost, Hugging Face\n**Backend:** FastAPI, Flask, Node.js\n**Frontend:** React, Next.js, Tailwind CSS\n**Data:** PostgreSQL, MongoDB, Redis\n**Cloud/DevOps:** AWS, Docker, GitHub Actions\n\nWant to know about a specific area?"
  if (lower.includes('recommend') || lower.includes('conversion')) return "## Recommendation Engine 🚀\n\nOne of my proudest projects:\n\n**Problem:** An e-commerce platform was stuck at 12% conversion — users couldn't find relevant products.\n\n**Solution:** I built a hybrid recommendation engine combining:\n- Collaborative filtering (user behavior patterns)\n- Content-based filtering (product similarity)\n- Real-time personalization serving 10K+ recommendations/second\n\n**Result:** **58% increase in conversion rate** — from 12% to 19%\n\n**Tech:** Python, TensorFlow, FastAPI, Redis\n\nWant to discuss how I can build something similar for your platform?"
  if (lower.includes('thank')) return "You're welcome! 😊 If you'd like to discuss a project or opportunity, feel free to reach out via the contact form or WhatsApp at +91 9622334883. Looking forward to connecting!"
  if (lower.includes('ai solution') || lower.includes('what can you build') || lower.includes('business')) return "## AI Solutions I Build for Businesses 💼\n\nHere's what I can help with:\n\n1. **Fraud Detection Systems** — Real-time anomaly detection with 96.4% accuracy (saved ₹15L/year for a client)\n2. **NLP & Chatbots** — Intelligent conversational AI for customer support\n3. **Recommendation Engines** — Hybrid systems that boosted conversions by 58%\n4. **Data Pipelines** — ML pipelines processing 1M+ records/day, reducing processing time by 40%\n5. **Full-Stack AI Apps** — End-to-end from model to deployment\n\nI'm currently available for UK and remote roles. Want to discuss a specific use case?"

  return "That's a great question! While I'm an AI assistant and still learning the full depth of Irshad's experience, I can share that he's built systems like:\n\n- 🔍 **Fraud detection** with 96.4% accuracy (saving ₹15L/year)\n- 📈 **Recommendation engine** that boosted conversions by 58%\n- ⚡ **ML pipeline** reducing processing time by 40%\n\nFor detailed discussions, feel free to contact me directly via the form below or WhatsApp at +91 9622334883! 🚀"
}

export default function AIChatBot() {
  const {
    chatOpen, setChatOpen,
    chatMessages, addChatMessage, clearChatMessages,
    currentMode, guestUserId,
  } = usePortfolioStore()

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatMessages, isTyping])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    }
    addChatMessage(userMsg)
    setInput('')
    setIsTyping(true)

    try {
      // Try to call the real AI API
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: guestUserId || `guest-${Date.now()}`,
          message: text,
          mode: currentMode,
          history: chatMessages.slice(-10).map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.message || data.error || 'Sorry, I could not process that.',
          timestamp: Date.now(),
        }
        addChatMessage(aiMsg)
      } else {
        throw new Error('API error')
      }
    } catch {
      // Use fallback response with simulated delay
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200))
      const response = getFallbackResponse(text)
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      }
      addChatMessage(aiMsg)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <AnimatePresence>
      {chatOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setChatOpen(false)}
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : 'min(600px, calc(100vh - 120px))',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-xl overflow-hidden glass-strong neon-border flex flex-col ${
              isMinimized ? '' : 'h-[min(600px,calc(100vh-120px))]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Ask Me Anything</h3>
                  <p className="text-[10px] text-emerald-400">
                    I can help with projects, hiring, or tech guidance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-7 h-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-7 h-7 text-muted-foreground hover:text-red-400"
                  onClick={clearChatMessages}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-7 h-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setChatOpen(false)}
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="flex flex-col overflow-hidden"
                >
                  {/* Messages */}
                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    {chatMessages.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-6"
                      >
                        <Sparkles className="w-8 h-8 text-emerald-400/50 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground mb-4">
                          I&apos;m Irshad&apos;s AI assistant. Ask me about my projects, AI solutions, or how I can help your business!
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {quickActions.map((action) => (
                            <button
                              key={action.label}
                              onClick={() => sendMessage(action.prompt)}
                              className="text-xs p-2.5 rounded-lg glass card-hover text-muted-foreground hover:text-foreground text-left"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {chatMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          msg.role === 'user'
                            ? 'bg-purple-500/20'
                            : 'bg-emerald-500/20'
                        }`}>
                          {msg.role === 'user'
                            ? <User className="w-3.5 h-3.5 text-purple-400" />
                            : <Bot className="w-3.5 h-3.5 text-emerald-400" />
                          }
                        </div>
                        <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-purple-500/10 text-purple-100 border border-purple-500/10'
                            : 'bg-white/5 text-muted-foreground border border-white/5'
                        }`}>
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2"
                      >
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div className="bg-white/5 rounded-lg px-4 py-3 border border-white/5">
                          <div className="flex gap-1">
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"
                            />
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                              className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"
                            />
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                              className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Actions (when messages exist) */}
                  {chatMessages.length > 0 && chatMessages.length < 3 && (
                    <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
                      {quickActions.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => sendMessage(action.prompt)}
                          className="text-[10px] px-2.5 py-1.5 rounded-full glass text-muted-foreground hover:text-emerald-400 whitespace-nowrap transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-3 border-t border-white/5">
                    <form
                      onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
                      className="flex gap-2"
                    >
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="bg-white/5 border-white/10 text-sm flex-1"
                        disabled={isTyping}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isTyping}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                    <p className="text-[10px] text-muted-foreground/40 mt-1.5 text-center">
                      I&apos;m an AI assistant. For direct contact, use the form or WhatsApp.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* Floating Button */}
      {!chatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 neon-glow"
        >
          <MessageSquare className="w-6 h-6 text-black" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center">
            1
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
