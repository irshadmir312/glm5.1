'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Trash2, Bot, User, Minimize2, Sparkles, Wifi, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePortfolioStore, type ChatMessage } from '@/store/portfolio'

const quickActions = [
  { label: '🚀 My Projects', prompt: 'Tell me about your projects and their impact' },
  { label: '💼 Hire You', prompt: 'I want to hire you for an AI project. What services do you offer?' },
  { label: '🤖 AI Solutions', prompt: 'What AI solutions can you build for businesses?' },
  { label: '💡 Your Tech Stack', prompt: "What's your complete tech stack and expertise?" },
  { label: '🎯 Career Advice', prompt: 'What career advice do you have for aspiring data scientists?' },
  { label: '📍 About You', prompt: 'Tell me about yourself, your journey, and where you\'re from' },
  { label: '🔍 Fraud Detection', prompt: 'Tell me about your fraud detection project in detail' },
  { label: '📊 ML Pipelines', prompt: 'How do you build production ML pipelines?' },
]

export default function AIChatBot() {
  const {
    chatOpen, setChatOpen,
    chatMessages, addChatMessage, clearChatMessages,
    currentMode, guestUserId,
  } = usePortfolioStore()

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'unknown'>('unknown')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatMessages, isTyping])

  // Check API status on mount
  useEffect(() => {
    const checkApi = async () => {
      try {
        const res = await fetch('/api/ai-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 'health-check',
            message: 'ping',
            mode: 'explorer',
            history: [],
            healthCheck: true,
          }),
        })
        if (res.ok) {
          const data = await res.json()
          setApiStatus(data.apiStatus || 'connected')
        } else {
          setApiStatus('disconnected')
        }
      } catch {
        setApiStatus('disconnected')
      }
    }
    checkApi()
  }, [])

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
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: guestUserId || `guest-${Date.now()}`,
          message: text,
          mode: currentMode,
          history: chatMessages.slice(-20).map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.apiStatus) setApiStatus(data.apiStatus)
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.message || 'Sorry, I could not process that.',
          timestamp: Date.now(),
        }
        addChatMessage(aiMsg)
      } else {
        const errorData = await response.json().catch(() => ({}))
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ API Error (${response.status}): ${errorData.error || 'Unknown error'}. Please try again or contact me directly on WhatsApp: +91 9622334883`,
          timestamp: Date.now(),
        }
        addChatMessage(aiMsg)
        setApiStatus('disconnected')
      }
    } catch (error) {
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: '⚠️ Connection error. Please check your internet connection and try again. You can also reach me directly:\n\n💬 WhatsApp: +91 9622334883\n📧 Email: irshadmir312@gmail.com',
        timestamp: Date.now(),
      }
      addChatMessage(aiMsg)
      setApiStatus('disconnected')
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
                  <h3 className="text-sm font-semibold">👋 Irshad&apos;s AI Clone</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-emerald-400">
                      Ask anything — projects, skills, career! 🚀
                    </span>
                    {apiStatus === 'connected' && (
                      <span className="flex items-center gap-0.5 text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                        <Wifi className="w-2.5 h-2.5" /> OpenAI
                      </span>
                    )}
                    {apiStatus === 'disconnected' && (
                      <span className="flex items-center gap-0.5 text-[9px] text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-full">
                        <WifiOff className="w-2.5 h-2.5" /> Offline
                      </span>
                    )}
                  </div>
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
                        <p className="text-sm text-muted-foreground mb-2">
                          👋 I&apos;m Irshad&apos;s AI assistant!
                        </p>
                        <p className="text-xs text-muted-foreground/70 mb-1">
                          Powered by OpenAI — I can answer anything about:
                        </p>
                        <p className="text-xs text-muted-foreground/60 mb-4">
                          Projects 💼 • AI Solutions 🤖 • Skills 💡 • Career 🎯 • Pricing 💰
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

                  {/* Quick Actions (when few messages exist) */}
                  {chatMessages.length > 0 && chatMessages.length < 3 && (
                    <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
                      {quickActions.slice(0, 4).map((action) => (
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
                        placeholder="Ask me anything... 💬"
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
                      🤖 Powered by OpenAI • Trained on Irshad&apos;s profile
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
