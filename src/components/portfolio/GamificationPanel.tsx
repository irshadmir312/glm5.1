'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Zap, Target, Eye, MessageSquare, Star, Lock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { usePortfolioStore, BADGES } from '@/store/portfolio'

const allBadges = BADGES

export default function GamificationPanel() {
  const { xp, level, badges, visitedSections, chatMessages, quizScore } = usePortfolioStore()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const xpInLevel = xp % 100
  const xpToNext = 100
  const totalBadges = allBadges.length

  const stats = [
    { icon: Eye, label: 'Sections Explored', value: visitedSections.length, color: 'text-cyan-400' },
    { icon: MessageSquare, label: 'Messages Sent', value: chatMessages.length, color: 'text-purple-400' },
    { icon: Target, label: 'Quiz Score', value: quizScore > 0 ? `${quizScore}%` : '—', color: 'text-amber-400' },
    { icon: Star, label: 'Badges Earned', value: `${badges.length}/${totalBadges}`, color: 'text-pink-400' },
  ]

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your <span className="neon-text text-emerald-400">Progress</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Earn XP, unlock badges, and track your exploration journey.
          </p>
        </motion.div>

        {/* Level & XP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6 sm:p-8 neon-border mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Level Circle */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-500/30 flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-emerald-400">{level}</span>
                </div>
              </motion.div>
              <div className="absolute -top-2 -right-2">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
            </div>

            {/* XP Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold mb-1">
                Level {level} <span className="text-sm text-muted-foreground font-normal">Explorer</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {xp} Total XP • {xpInLevel} / {xpToNext} XP to next level
              </p>
              <div className="flex items-center gap-3">
                <Progress value={xpInLevel} className="flex-1 h-3 [&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:to-cyan-400" />
                <span className="text-sm font-mono text-emerald-400">{xpInLevel}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <Card className="glass p-4 h-full">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-lg font-bold font-mono">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Badges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Badges
            <Badge variant="outline" className="text-xs border-white/10 text-muted-foreground">
              {badges.length}/{totalBadges}
            </Badge>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {allBadges.map((badge, i) => {
              const isUnlocked = badges.some(b => b.id === badge.id)

              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.35 + i * 0.05 }}
                >
                  <Card
                    className={`p-4 h-full text-center transition-all ${
                      isUnlocked
                        ? 'glass neon-border animate-pulse-glow'
                        : 'glass opacity-50 grayscale'
                    }`}
                  >
                    <div className="text-3xl mb-2">
                      {isUnlocked ? badge.icon : '🔒'}
                    </div>
                    <h4 className={`text-sm font-medium mb-1 ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {badge.name}
                    </h4>
                    <p className="text-[10px] text-muted-foreground">
                      {badge.description}
                    </p>
                    {isUnlocked && badge.unlockedAt && (
                      <p className="text-[9px] text-emerald-400/60 mt-1.5 font-mono">
                        ✓ {new Date(badge.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
