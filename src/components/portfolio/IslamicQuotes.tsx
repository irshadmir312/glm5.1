'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Copy, Check, Star, RefreshCw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface IslamicQuote {
  text: string
  source: string
  emoji: string
  category: 'Faith' | 'Patience' | 'Knowledge' | 'Character'
}

const islamicQuotes: IslamicQuote[] = [
  { text: 'Trust Allah, but tie your camel first.', source: 'Prophet Muhammad ﷺ (Tirmidhi)', emoji: '🐪', category: 'Faith' },
  { text: 'The best among you are those who have the best manners and character.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '⭐', category: 'Character' },
  { text: 'Teach a man to fish, and you feed him for a lifetime.', source: 'Traditional Wisdom', emoji: '🎣', category: 'Knowledge' },
  { text: 'Verily, with hardship comes ease.', source: 'Quran 94:6', emoji: '🌸', category: 'Patience' },
  { text: 'And whoever relies upon Allah — then He is sufficient for him.', source: 'Quran 65:3', emoji: '🤲', category: 'Faith' },
  { text: 'The world is a prison for the believer and a paradise for the disbeliever.', source: 'Prophet Muhammad ﷺ (Muslim)', emoji: '🔒', category: 'Faith' },
  { text: 'Knowledge is a treasure that follows its owner everywhere.', source: 'Prophet Muhammad ﷺ (Tirmidhi)', emoji: '📚', category: 'Knowledge' },
  { text: 'Do not lose hope, nor be sad.', source: 'Quran 3:139', emoji: '🌅', category: 'Patience' },
  { text: 'The strong man is not the one who can overpower others. The strong man is the one who controls himself when he is angry.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '💪', category: 'Character' },
  { text: 'Read! In the name of your Lord who created.', source: 'Quran 96:1', emoji: '📖', category: 'Knowledge' },
  { text: 'Paradise lies at the feet of mothers.', source: 'Prophet Muhammad ﷺ (Nasai)', emoji: '👩‍👧', category: 'Character' },
  { text: 'The most complete of the believers in faith is the one with the best character.', source: 'Prophet Muhammad ﷺ (Tirmidhi)', emoji: '💎', category: 'Character' },
  { text: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '🤫', category: 'Character' },
  { text: 'Allah does not burden a soul beyond that it can bear.', source: 'Quran 2:286', emoji: '🏔️', category: 'Patience' },
  { text: 'Be in this world as if you were a stranger or a traveler.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '🧳', category: 'Faith' },
]

const categoryColors: Record<IslamicQuote['category'], { bg: string; border: string; badge: string }> = {
  Faith: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', badge: 'border-amber-500/30 text-amber-400 bg-amber-500/10' },
  Patience: { bg: 'bg-amber-500/5', border: 'border-amber-600/20', badge: 'border-amber-600/30 text-amber-300 bg-amber-600/10' },
  Knowledge: { bg: 'bg-amber-500/5', border: 'border-yellow-500/20', badge: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' },
  Character: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', badge: 'border-amber-500/30 text-amber-400 bg-amber-500/10' },
}

function getWisdomOfTheDay(): IslamicQuote {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  return islamicQuotes[seed % islamicQuotes.length]
}

function getRandomWisdom(excludeIndex: number): { quote: IslamicQuote; index: number } {
  let newIndex: number
  do {
    newIndex = Math.floor(Math.random() * islamicQuotes.length)
  } while (newIndex === excludeIndex && islamicQuotes.length > 1)
  return { quote: islamicQuotes[newIndex], index: newIndex }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [text])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-7 w-7 text-muted-foreground hover:text-amber-400 shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{copied ? '✅ Copied!' : '📋 Copy quote'}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default function IslamicQuotes() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const wisdomOfTheDay = getWisdomOfTheDay()
  const wotdIndex = islamicQuotes.indexOf(wisdomOfTheDay)

  const [displayedQuote, setDisplayedQuote] = useState(wisdomOfTheDay)
  const [displayedIndex, setDisplayedIndex] = useState(wotdIndex)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNextWisdom = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    const { quote, index } = getRandomWisdom(displayedIndex)
    setDisplayedQuote(quote)
    setDisplayedIndex(index)
    setTimeout(() => setIsAnimating(false), 400)
  }, [displayedIndex, isAnimating])

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      {/* Warm gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(217,119,6,0.04) 0%, rgba(180,83,9,0.03) 50%, rgba(217,119,6,0.04) 100%)',
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-amber-400" style={{ textShadow: '0 0 10px rgba(217,119,6,0.5), 0 0 20px rgba(217,119,6,0.2)' }}>
              🕌 Islamic Wisdom
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            📿 Timeless guidance from the Quran and Sunnah to illuminate your path.
          </p>
        </motion.div>

        {/* Wisdom Card - No numbering */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Star className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
              🌟 Wisdom of the Day
            </h3>
            <Star className="w-5 h-5 text-amber-400" />
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
                    background: 'linear-gradient(135deg, rgba(217,119,6,0.08) 0%, rgba(180,83,9,0.06) 50%, rgba(217,119,6,0.08) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(217,119,6,0.25)',
                    boxShadow: '0 0 30px rgba(217,119,6,0.08), 0 0 60px rgba(217,119,6,0.03)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5" />
                  <div className="relative z-10">
                    <span className="text-5xl mb-5 block">{displayedQuote.emoji}</span>
                    <p className="text-lg sm:text-xl font-semibold text-foreground leading-relaxed mb-3">
                      &ldquo;{displayedQuote.text}&rdquo;
                    </p>
                    <p className="text-sm text-amber-400/80 mb-4">— {displayedQuote.source}</p>
                    <div className="flex items-center justify-center gap-3">
                      <Badge
                        variant="outline"
                        className={categoryColors[displayedQuote.category].badge}
                      >
                        {displayedQuote.category}
                      </Badge>
                      <CopyButton text={`"${displayedQuote.text}" — ${displayedQuote.source}`} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Next Wisdom Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <Button
            onClick={handleNextWisdom}
            disabled={isAnimating}
            variant="outline"
            className="gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
          >
            <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
            🔄 Next Wisdom
          </Button>
          <span className="text-xs text-muted-foreground/50">
            Tap to discover more Islamic wisdom 🤲
          </span>
        </motion.div>
      </div>
    </section>
  )
}
