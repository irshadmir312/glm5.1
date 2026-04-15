'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Sparkles, RefreshCw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Quote {
  text: string
  emoji: string
  category: 'Rude' | 'Savage' | 'Flirty' | 'Dark Humor'
}

const quotes: Quote[] = [
  { text: "Your eyes didn't kill me... your smile finished the job.", emoji: '💀', category: 'Flirty' },
  { text: "I'm not rude, I'm just honest. You can't handle both.", emoji: '😏', category: 'Rude' },
  { text: "My silence is not weakness. It's the beginning of my revenge.", emoji: '🖤', category: 'Dark Humor' },
  { text: "I don't have an attitude problem. You have a perception problem.", emoji: '🔥', category: 'Savage' },
  { text: "You're the reason I believe in love at first sight... then I look again and change my mind.", emoji: '😂', category: 'Dark Humor' },
  { text: "If looks could kill, you'd be a weapon of mass destruction.", emoji: '💣', category: 'Flirty' },
  { text: "I'm not ignoring you. I'm just giving you time to realize your mistake.", emoji: '🦅', category: 'Savage' },
  { text: "Your smile is the reason I believe in magic.", emoji: '✨', category: 'Flirty' },
  { text: "I'm not a player, I just crush a lot... of code.", emoji: '💻', category: 'Dark Humor' },
  { text: "You looked at me and my heart went on strike. Unfair dismissal.", emoji: '⚖️', category: 'Flirty' },
  { text: "If being hot was a crime, you'd get a life sentence.", emoji: '🔥', category: 'Flirty' },
  { text: "I don't need your approval. My mirror tells me I'm fine.", emoji: '🪞', category: 'Savage' },
  { text: "You're like a software update — every time I see you, something gets better.", emoji: '🔄', category: 'Flirty' },
  { text: "I'd agree with you but then we'd both be wrong.", emoji: '💀', category: 'Savage' },
  { text: "You're the WiFi to my heart — always connected, never dropping signals.", emoji: '📶', category: 'Flirty' },
]

const categoryColors: Record<Quote['category'], { bg: string; border: string; text: string; badge: string }> = {
  Rude: { bg: 'bg-red-500/5', border: 'border-red-500/20', text: 'text-red-400', badge: 'border-red-500/30 text-red-400 bg-red-500/10' },
  Savage: { bg: 'bg-orange-500/5', border: 'border-orange-500/20', text: 'text-orange-400', badge: 'border-orange-500/30 text-orange-400 bg-orange-500/10' },
  Flirty: { bg: 'bg-pink-500/5', border: 'border-pink-500/20', text: 'text-pink-400', badge: 'border-pink-500/30 text-pink-400 bg-pink-500/10' },
  'Dark Humor': { bg: 'bg-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-400', badge: 'border-purple-500/30 text-purple-400 bg-purple-500/10' },
}

function getQuoteOfTheDay(): Quote {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  return quotes[seed % quotes.length]
}

function getRandomQuote(excludeIndex: number): { quote: Quote; index: number } {
  let newIndex: number
  do {
    newIndex = Math.floor(Math.random() * quotes.length)
  } while (newIndex === excludeIndex && quotes.length > 1)
  return { quote: quotes[newIndex], index: newIndex }
}

export default function KillerQuotes() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const quoteOfTheDay = getQuoteOfTheDay()
  const qotdIndex = quotes.indexOf(quoteOfTheDay)

  const [displayedQuote, setDisplayedQuote] = useState(quoteOfTheDay)
  const [displayedIndex, setDisplayedIndex] = useState(qotdIndex)
  const [clickCount, setClickCount] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNewQuote = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    const { quote, index } = getRandomQuote(displayedIndex)
    setDisplayedQuote(quote)
    setDisplayedIndex(index)
    setClickCount((prev) => (prev % quotes.length) + 1)
    setTimeout(() => setIsAnimating(false), 400)
  }, [displayedIndex, isAnimating])

  return (
    <section id="quotes" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="neon-text text-orange-400">🔥 Killer Quotes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quotes that hit different. Savage, flirty, and brutally honest — take what resonates.
          </p>
        </motion.div>

        {/* Quote of the Day - Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
              Quote of the Day
            </h3>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>

          <div className="relative overflow-hidden max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayedIndex}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <Card
                  className="relative overflow-hidden p-8 sm:p-10 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${
                      displayedQuote.category === 'Flirty' ? 'rgba(236,72,153,0.08)'
                      : displayedQuote.category === 'Rude' ? 'rgba(239,68,68,0.08)'
                      : displayedQuote.category === 'Savage' ? 'rgba(249,115,22,0.08)'
                      : 'rgba(168,85,247,0.08)'
                    } 0%, rgba(255,255,255,0.02) 50%, rgba(249,115,22,0.06) 100%)`,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${categoryColors[displayedQuote.category].border.replace('border-', '').replace('/20', '/30')}`,
                    boxShadow: '0 0 30px rgba(249,115,22,0.1), 0 0 60px rgba(236,72,153,0.05)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-pink-500/5" />
                  <div className="relative z-10">
                    <span className="text-5xl mb-5 block">{displayedQuote.emoji}</span>
                    <p className="text-lg sm:text-xl font-semibold text-foreground leading-relaxed mb-5 italic">
                      &ldquo;{displayedQuote.text}&rdquo;
                    </p>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Badge
                        variant="outline"
                        className={categoryColors[displayedQuote.category].badge}
                      >
                        {displayedQuote.category}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">
                        Quote {clickCount} of {quotes.length}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Generate New Quote Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <Button
            onClick={handleNewQuote}
            disabled={isAnimating}
            variant="outline"
            className="gap-2 border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:text-orange-300"
          >
            <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
            Generate New Quote
          </Button>
          <span className="text-xs text-muted-foreground/50">
            Click to discover another killer quote
          </span>
        </motion.div>
      </div>
    </section>
  )
}
