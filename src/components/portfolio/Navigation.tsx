'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, MessageSquare, Trophy, Zap, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { usePortfolioStore, type ViewMode } from '@/store/portfolio'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
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
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/20' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('#hero')}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center font-mono font-bold text-sm text-black neon-glow">
            IM
          </div>
          <span className="hidden sm:block text-sm font-semibold tracking-tight">
            Irshad<span className="text-emerald-400">.dev</span>
          </span>
        </motion.div>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
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
          {/* XP Bar */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-full glass cursor-default">
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
                <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full glass">
                  <Trophy className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-mono">{badgeCount}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{badgeCount} badges earned</p>
              </TooltipContent>
            </Tooltip>
          )}

          {/* Mode Badge */}
          <Badge
            variant="outline"
            className="hidden lg:flex items-center gap-1 text-xs border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
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
            <MessageSquare className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <Button size="icon" variant="ghost" className="text-muted-foreground">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 glass-strong border-l border-emerald-500/10 bg-background/95 backdrop-blur-xl">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile XP */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-mono">Level {level}</span>
                  <Progress value={xpInLevel} className="flex-1 h-2 [&>div]:bg-emerald-400" />
                  <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-400">
                    <Trophy className="w-3 h-3 mr-1" />{badgeCount}
                  </Badge>
                </div>

                {/* Mobile Nav Links - Scrollable */}
                <div className="flex flex-col gap-1 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => scrollToSection(link.href)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        activeNav === link.href.slice(1)
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 -rotate-90 ${activeNav === link.href.slice(1) ? 'text-emerald-400' : ''}`} />
                    </motion.button>
                  ))}
                </div>

                {/* Mobile Mode */}
                <div className="px-3 py-2 rounded-lg glass">
                  <p className="text-xs text-muted-foreground mb-2">Current Mode</p>
                  <Badge className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    {modeLabels[currentMode]}
                  </Badge>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}
