'use client'

import { motion } from 'framer-motion'
import { Briefcase, Handshake, GraduationCap, Bot, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { usePortfolioStore, type ViewMode } from '@/store/portfolio'

interface Mode {
  id: ViewMode
  emoji: string
  title: string
  description: string
  features: string[]
  icon: typeof Briefcase
  color: string
  borderColor: string
  bgColor: string
}

const modes: Mode[] = [
  {
    id: 'recruiter',
    emoji: '💼',
    title: 'Recruiter Mode',
    description: 'Focused on skills, experience, and hiring readiness.',
    features: ['Resume highlights', 'Skill assessments', 'Project deep-dives', 'Cultural fit'],
    icon: Briefcase,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-500/5',
  },
  {
    id: 'client',
    emoji: '🤝',
    title: 'Client Mode',
    description: 'See past work, capabilities, and how I deliver value.',
    features: ['Case studies', 'ROI metrics', 'Tech stack fit', 'Quick contact'],
    icon: Handshake,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-500/5',
  },
  {
    id: 'student',
    emoji: '🎓',
    title: 'Student Mode',
    description: 'Learn from my journey, projects, and educational content.',
    features: ['Learning paths', 'Code examples', 'Resources', 'Mentorship tips'],
    icon: GraduationCap,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    bgColor: 'bg-purple-500/5',
  },
  {
    id: 'explorer',
    emoji: '🤖',
    title: 'AI Explorer Mode',
    description: 'Full portfolio experience with AI interactions & gamification.',
    features: ['AI chatbot', 'Interactive demos', 'Skill quiz', 'Gamified XP'],
    icon: Bot,
    color: 'text-pink-400',
    borderColor: 'border-pink-500/40',
    bgColor: 'bg-pink-500/5',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function ModeSelector() {
  const { currentMode, setMode } = usePortfolioStore()
  const { toast } = useToast()

  const handleSelect = (mode: Mode) => {
    setMode(mode.id)
    toast({
      title: `${mode.emoji} ${mode.title} Activated`,
      description: mode.description,
    })
  }

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Choose Your <span className="neon-text text-emerald-400">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tailor the portfolio to your needs. Each mode highlights different aspects
            of my work and expertise.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {modes.map((mode) => {
            const isActive = currentMode === mode.id
            const Icon = mode.icon

            return (
              <motion.div
                key={mode.id}
                variants={item}
                onClick={() => handleSelect(mode)}
                className={`relative cursor-pointer rounded-xl p-5 sm:p-6 transition-all duration-300 group ${
                  isActive
                    ? `${mode.borderColor} ${mode.bgColor} neon-glow`
                    : 'glass card-hover'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="mode-active"
                    className={`absolute -top-px -right-px w-6 h-6 rounded-bl-xl rounded-tr-xl flex items-center justify-center ${mode.bgColor} ${mode.borderColor} border-t-2 border-r-2`}
                  >
                    <Check className={`w-3 h-3 ${mode.color}`} />
                  </motion.div>
                )}

                <div className={`w-12 h-12 rounded-lg ${mode.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${mode.color}`} />
                </div>

                <h3 className="text-lg font-semibold mb-2">{mode.emoji} {mode.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {mode.description}
                </p>

                <ul className="space-y-1.5">
                  {mode.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-muted-foreground/80"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-muted-foreground/30'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
