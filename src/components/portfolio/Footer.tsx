'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@irshad.dev' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-20">
      <div className="glass-strong border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
            {/* Left - Brand */}
            <div className="sm:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center font-mono font-bold text-sm text-black">
                  IM
                </div>
                <span className="text-sm font-semibold">
                  Irshad<span className="text-emerald-400">.dev</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                AI/ML Engineer & Data Scientist building intelligent systems
                that transform data into decisions.
              </p>
              <p className="text-xs text-muted-foreground/50">
                © {new Date().getFullYear()} Irshad Majeed Mir. All rights reserved.
              </p>
            </div>

            {/* Center - Quick Links */}
            <div className="sm:col-span-1">
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <nav className="flex flex-col gap-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors text-left w-fit"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right - Social */}
            <div className="sm:col-span-1">
              <h4 className="text-sm font-semibold mb-4">Connect</h4>
              <div className="flex gap-2 mb-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Let&apos;s build something amazing together.
              </p>
            </div>
          </div>

          <Separator className="my-8 bg-white/5" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/60 flex items-center gap-1.5">
              Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> and <span className="text-emerald-400">AI</span>
            </p>

            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-xs text-muted-foreground hover:text-emerald-400 gap-1"
            >
              <ArrowUp className="w-3 h-3" />
              Back to top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
