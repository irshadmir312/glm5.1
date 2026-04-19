'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Brain, Briefcase, Cpu, Layers, Rocket } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { usePortfolioStore } from '@/store/portfolio'

interface Milestone {
  year: string
  title: string
  description: string
  icon: typeof GraduationCap
  skills: string[]
  color: string
  glowColor: string
}

const milestones: Milestone[] = [
  {
    year: '2018–2022',
    title: 'The Beginning',
    description: 'B.Tech in Computer Science — built a solid foundation in programming, algorithms, and system design. Explored various domains to find my passion.',
    icon: GraduationCap,
    skills: ['C++', 'Java', 'Data Structures', 'OS', 'DBMS'],
    color: 'text-cyan-400',
    glowColor: 'rgba(0, 212, 255, 0.15)',
  },
  {
    year: '2019',
    title: 'Data Science Discovery',
    description: 'First ML project — predicting student performance. Fell in love with the power of data and machine learning to solve real problems.',
    icon: Brain,
    skills: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    color: 'text-emerald-400',
    glowColor: 'rgba(0, 255, 136, 0.15)',
  },
  {
    year: '2022',
    title: 'Professional Journey',
    description: 'Started as a Data Scientist — built fraud detection models, automated reporting pipelines, and delivered insights that impacted business decisions.',
    icon: Briefcase,
    skills: ['TensorFlow', 'SQL', 'Tableau', 'AWS'],
    color: 'text-purple-400',
    glowColor: 'rgba(168, 85, 247, 0.15)',
  },
  {
    year: '2023',
    title: 'AI Engineering',
    description: 'Advanced to AI/ML Engineer — architected end-to-end ML systems, deployed models to production, and led cross-functional AI initiatives.',
    icon: Cpu,
    skills: ['PyTorch', 'LLMs', 'Docker', 'MLOps'],
    color: 'text-pink-400',
    glowColor: 'rgba(236, 72, 153, 0.15)',
  },
  {
    year: '2024',
    title: 'Full Stack Evolution',
    description: 'Mastered full stack development to build complete AI-powered applications — from React/Next.js frontends to Python backends and cloud deployment.',
    icon: Layers,
    skills: ['React', 'Next.js', 'FastAPI', 'GCP'],
    color: 'text-amber-400',
    glowColor: 'rgba(249, 115, 22, 0.15)',
  },
  {
    year: '2025+',
    title: 'The Future',
    description: 'Building next-gen AI solutions — agentic systems, RAG pipelines, and intelligent applications that push the boundaries of what\'s possible.',
    icon: Rocket,
    skills: ['AI Agents', 'RAG', 'GenAI', 'LangChain'],
    color: 'text-emerald-400',
    glowColor: 'rgba(0, 255, 136, 0.15)',
  },
]

function TimelineItem({
  milestone,
  index,
}: {
  milestone: Milestone
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { visitSection } = usePortfolioStore()
  const isLeft = index % 2 === 0
  const Icon = milestone.icon

  return (
    <div ref={ref} className="relative flex items-start md:items-center mb-8 md:mb-12 last:mb-0">
      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-10 w-full items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`${isLeft ? 'text-right' : 'order-3 text-left'}`}
        >
          <div
            className={`glass rounded-xl p-5 lg:p-6 card-hover cursor-pointer ${isLeft ? '' : ''}`}
            onClick={() => visitSection(`journey-${index}`)}
          >
            <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : ''}`}>
              <span className="text-sm font-mono text-muted-foreground">{milestone.year}</span>
              <Icon className={`w-4 h-4 ${milestone.color}`} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {milestone.description}
            </p>
            <div className={`flex flex-wrap gap-1.5 ${isLeft ? 'justify-end' : ''}`}>
              {milestone.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-[10px] px-2 py-0 border-white/10 text-muted-foreground"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center dot */}
        <div className="order-2 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
            className="w-10 h-10 rounded-full glass-strong flex items-center justify-center z-10"
            style={{ boxShadow: `0 0 20px ${milestone.glowColor}` }}
          >
            <Icon className={`w-5 h-5 ${milestone.color}`} />
          </motion.div>
        </div>

        {/* Right spacer */}
        <div className={`${isLeft ? 'order-3' : ''}`} />
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex gap-4 w-full">
        {/* Mobile timeline line */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, type: 'spring' }}
            className="w-8 h-8 rounded-full glass-strong flex items-center justify-center z-10 shrink-0"
            style={{ boxShadow: `0 0 15px ${milestone.glowColor}` }}
          >
            <Icon className={`w-4 h-4 ${milestone.color}`} />
          </motion.div>
          {index < milestones.length - 1 && (
            <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent mt-2" />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="glass rounded-xl p-4 card-hover flex-1 mb-2 cursor-pointer"
          onClick={() => visitSection(`journey-${index}`)}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-muted-foreground">{milestone.year}</span>
          </div>
          <h3 className="text-base font-semibold mb-1.5">{milestone.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            {milestone.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {milestone.skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="text-[10px] px-2 py-0 border-white/10 text-muted-foreground"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function JourneyMap() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="journey" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="neon-text text-emerald-400">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From a curious student to an AI engineer building production systems —
            every step shaped who I am today.
          </p>
        </motion.div>

        {/* Center line (desktop) */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 bottom-20 w-px">
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
            className="w-full bg-gradient-to-b from-emerald-500/40 via-cyan-500/30 via-purple-500/20 to-transparent"
          />
        </div>

        <div className="relative">
          {milestones.map((milestone, index) => (
            <TimelineItem
              key={milestone.title}
              milestone={milestone}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
