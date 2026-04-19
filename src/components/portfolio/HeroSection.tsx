'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ChevronDown, Terminal, Bot, Database, Code2, BrainCircuit, Globe2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePortfolioStore } from '@/store/portfolio'
import { Badge } from '@/components/ui/badge'

const titles = [
  'Irshad Majeed Mir',
  'AI/ML Engineer',
  'Data Scientist',
  'Full Stack Developer',
]

const stats = [
  { label: 'Years', value: 2, suffix: '+' },
  { label: 'Projects', value: 15, suffix: '+' },
  { label: 'Clients', value: 10, suffix: '+' },
]

const terminalLines = [
  { prefix: '$', text: 'python train_model.py --epochs 100', color: 'text-emerald-400' },
  { prefix: '>', text: 'Loading dataset... 50,000 records ✓', color: 'text-cyan-400' },
  { prefix: '>', text: 'Training Neural Network... [████████░░] 87%', color: 'text-purple-400' },
  { prefix: '>', text: 'Accuracy: 96.4% | F1: 0.95 | AUC: 0.98', color: 'text-pink-400' },
  { prefix: '$', text: 'git push origin main ✨', color: 'text-emerald-400' },
  { prefix: '>', text: 'Model deployed to production 🚀', color: 'text-amber-400' },
]

const techIcons = [
  { icon: BrainCircuit, label: 'AI/ML', color: 'text-emerald-400' },
  { icon: Database, label: 'Data', color: 'text-cyan-400' },
  { icon: Code2, label: 'Full Stack', color: 'text-purple-400' },
  { icon: Terminal, label: 'DevOps', color: 'text-pink-400' },
]

export default function HeroSection() {
  const { setChatOpen } = usePortfolioStore()
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  // Typing effect
  useEffect(() => {
    const current = titles[titleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, displayText.length + 1))
          if (displayText.length === current.length) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setDisplayText(current.slice(0, displayText.length - 1))
          if (displayText.length === 0) {
            setIsDeleting(false)
            setTitleIndex((prev) => (prev + 1) % titles.length)
          }
        }
      },
      isDeleting ? 30 : 80
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, titleIndex])

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 500)
    return () => clearInterval(interval)
  }, [])

  // Terminal animation
  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const timeout = setTimeout(() => setVisibleLines((v) => v + 1), 1200)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => setVisibleLines(0), 3000)
      return () => clearTimeout(timeout)
    }
  }, [visibleLines])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const isName = titleIndex === 0

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-muted-foreground font-medium">
                ✨ Available for opportunities
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </motion.div>

            <p className="text-muted-foreground text-lg mb-2">👋 Hi, I&apos;m</p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className={`${isName ? 'neon-text text-emerald-400' : 'text-foreground'}`}>
                {displayText}
              </span>
              <span className={`inline-block w-[3px] h-[0.8em] ml-1 bg-emerald-400 align-middle ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground mb-3"
            >
              🤖 AI/ML Engineer building real-world AI systems &amp; intelligent chatbots for businesses
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm sm:text-base text-muted-foreground/70 mb-8 max-w-lg"
            >
              🏔️ From Kupwara, Kashmir to building AI solutions that impact businesses globally. Specializing in fraud detection, NLP pipelines, recommendation engines, and full-stack AI applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-4"
            >
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold gap-2 neon-glow"
              >
                🚀 Explore My Work
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={scrollToContact}
                size="lg"
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 gap-2"
              >
                💬 Let&apos;s Connect
              </Button>
              <Button
                onClick={() => setChatOpen(true)}
                size="lg"
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 gap-2"
              >
                <Bot className="w-4 h-4" />
                Chat with AI Clone 🤖
              </Button>
            </motion.div>

            {/* Available Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-10"
            >
              <Badge
                variant="outline"
                className="gap-1.5 text-xs border-cyan-500/30 text-cyan-400 bg-cyan-500/5 px-3 py-1.5"
              >
                <Globe2 className="w-3 h-3" />
                🌍 Available for UK &amp; Remote Roles
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </Badge>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-6 sm:gap-8"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-emerald-400">{stat.suffix}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            {/* Terminal Window */}
            <div className="glass-strong rounded-xl overflow-hidden neon-border">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-muted-foreground">
                  💻 irshad@ai-portfolio ~ %
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-sm space-y-2 min-h-[300px]">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={`${i}-${visibleLines}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-muted-foreground/50">{line.prefix} </span>
                    <span className={line.color}>{line.text}</span>
                  </motion.div>
                ))}
                {visibleLines === terminalLines.length && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-block w-2 h-4 bg-emerald-400 animate-blink"
                  />
                )}
              </div>
            </div>

            {/* Tech Stack Icons */}
            <div className="flex justify-center gap-4 mt-6">
              {techIcons.map((tech, i) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="flex flex-col items-center gap-2 glass rounded-xl px-4 py-3 cursor-default"
                >
                  <tech.icon className={`w-6 h-6 ${tech.color}`} />
                  <span className="text-[10px] text-muted-foreground">{tech.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground/50 tracking-widest uppercase">
          📜 Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-emerald-400/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function AnimatedCounter({ value, delay = 1000 }: { value: number; delay?: number }) {
  const [count, setCount] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    const startTimer = setTimeout(() => {
      let current = 0
      const duration = 2000
      const step = value / (duration / 16)

      const timer = setInterval(() => {
        current += step
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, 16)

      return () => clearInterval(timer)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [value, delay])

  return <>{count}</>
}
