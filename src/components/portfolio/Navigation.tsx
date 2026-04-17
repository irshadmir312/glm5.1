'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, MessageSquare, Trophy, Zap, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { usePortfolioStore, type ViewMode } from '@/store/portfolio'

const navLinks = [
  { label: '🏠 Home', href: '#hero' },
  { label: '👤 About', href: '#about' },
  { label: '🗺️ Journey', href: '#journey' },
  { label: '🚀 Projects', href: '#projects' },
  { label: '📊 Case Studies', href: '#case-studies' },
  { label: '⚙️ Services', href: '#services' },
  { label: '💡 Skills', href: '#skills' },
  { label: '⭐ Testimonials', href: '#testimonials' },
  { label: '📝 Blog', href: '#blog' },
  { label: '📬 Contact', href: '#contact' },
]

const modeLabels: Record<ViewMode, string> = {
  recruiter: '💼 Recruiter',
  client: '🤝 Client',
  student: '🎓 Student',
  explorer: '🤖 Explorer',
}

export default function Navigation() {
  const { xp, level, badges, chatOpen, setChatOpen, currentMode, setActiveSection } = usePortfolioStore()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('hero')

  const xpInLevel = xp % 100
  const badgeCount = badges.length

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveNav(sections[i])
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])

  const scrollToSection = (href: string) => {
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
      // Close mobile menu and restore body scroll
      document.body.style.overflow = ''
    }
  }

  const toggleMobileMenu = () => {
    const newState = !mobileOpen
    setMobileOpen(newState)
    // Prevent background scroll when mobile menu is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = newState ? 'hidden' : ''
    }
  }

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/20' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('#hero')}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-black neon-glow">
            IM
          </div>
          <span className="hidden sm:block text-sm font-semibold tracking-tight">
            Irshad<span className="text-emerald-400">.dev</span>
          </span>
        </motion.div>

        {/* Center Nav Links (Desktop only - lg: 1024px+) */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`relative px-2.5 py-2 text-xs font-medium transition-colors rounded-md ${
                activeNav === link.href.slice(1)
                  ? 'text-emerald-400'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
              {activeNav === link.href.slice(1) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-emerald-400"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* XP Bar - hidden on small mobile */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded-full glass cursor-default">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-mono text-muted-foreground">
                  Lv.{level}
                </span>
                <Progress
                  value={xpInLevel}
                  className="w-16 h-1.5 [&>div]:bg-emerald-400"
                />
                <span className="text-[10px] font-mono text-muted-foreground">
                  {xpInLevel}%
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Level {level} • {xp} XP total</p>
            </TooltipContent>
          </Tooltip>

          {/* Badge Count */}
          {badgeCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-full glass">
                  <Trophy className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-mono">{badgeCount}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{badgeCount} badges earned</p>
              </TooltipContent>
            </Tooltip>
          )}

          {/* Mode Badge - hidden on small mobile */}
          <Badge
            variant="outline"
            className="hidden md:flex items-center gap-1 text-xs border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
          >
            {modeLabels[currentMode]}
          </Badge>

          {/* Chat Toggle */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setChatOpen(!chatOpen)}
            className={`relative ${chatOpen ? 'text-emerald-400' : 'text-muted-foreground hover:text-emerald-400'}`}
          >
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </Button>

          {/* Mobile Menu Button - ALWAYS visible below lg */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay & Panel */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={toggleMobileMenu}
            style={{ top: '56px' }}
          />

          {/* Mobile Panel - slides from right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-[56px] right-0 bottom-0 w-[280px] max-w-[80vw] z-50 lg:hidden overflow-hidden flex flex-col"
            style={{
              background: 'rgba(10, 10, 20, 0.98)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Mobile XP Bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-mono text-foreground">Level {level}</span>
              <Progress value={xpInLevel} className="flex-1 h-2 [&>div]:bg-emerald-400" />
              <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-400 bg-purple-500/5">
                <Trophy className="w-3 h-3 mr-1" />{badgeCount}
              </Badge>
            </div>

            {/* Nav Links - Scrollable */}
            <div className="flex-1 overflow-y-auto py-2 px-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollToSection(link.href)}
                  className={`flex items-center justify-between w-full px-4 py-3.5 rounded-lg text-sm font-medium transition-all mb-1 ${
                    activeNav === link.href.slice(1)
                      ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  <ChevronDown className={`w-4 h-4 -rotate-90 transition-transform ${activeNav === link.href.slice(1) ? 'text-emerald-400' : 'opacity-40'}`} />
                </motion.button>
              ))}
            </div>

            {/* Mobile Mode & Close */}
            <div className="px-4 py-3 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground">📱 Current Mode</p>
                <Badge className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  {modeLabels[currentMode]}
                </Badge>
              </div>
              <Button
                onClick={toggleMobileMenu}
                variant="outline"
                className="w-full border-white/10 text-muted-foreground hover:text-foreground"
              >
                Close Menu ✕
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </motion.header>
  )
}
