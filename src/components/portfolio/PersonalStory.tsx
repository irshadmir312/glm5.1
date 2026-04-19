'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Mountain, GraduationCap, Lightbulb, Rocket,
  Heart, Shield, Target, MapPin, Briefcase,
  Globe, Sparkles, Building2,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'


interface Milestone {
  icon: typeof Mountain
  title: string
  description: string
  color: string
  bgColor: string
}

const milestones: Milestone[] = [
  {
    icon: Mountain,
    title: 'Roots in Kashmir',
    description: 'Born and raised in Kupwara, Kashmir — a place that taught me resilience, curiosity, and the value of dreaming big against all odds.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
  },
  {
    icon: GraduationCap,
    title: 'Discovering Data Science',
    description: 'Fell in love with data science during B.Tech. What started as a curiosity became an obsession — spending nights training models and reading research papers.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/5',
  },
  {
    icon: Lightbulb,
    title: 'Self-Taught & Relentless',
    description: 'Many skills were self-taught — from deep learning to full-stack development. Every challenge was an opportunity to grow, not a reason to stop.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/5',
  },
  {
    icon: Rocket,
    title: 'Founded RuleMatrix',
    description: 'Founded RuleMatrix — an AI solutions company turning business problems into intelligent, scalable solutions for clients worldwide.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/5',
  },
  {
    icon: Globe,
    title: 'Global Vision',
    description: 'Making AI accessible for businesses worldwide. Currently expanding horizons with plans for a UK move to tackle bigger challenges on the global stage.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/5',
  },
]

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Constantly pushing boundaries. I don\'t just follow trends — I explore what\'s next and build solutions that matter.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/5',
    borderColor: 'border-amber-500/10',
  },
  {
    icon: Heart,
    title: 'Impact',
    description: 'Every line of code I write should make someone\'s life easier, a business smarter, or a system more efficient.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    borderColor: 'border-emerald-500/10',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Honest estimates, clean code, transparent communication. I deliver what I promise and own up when I don\'t.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/5',
    borderColor: 'border-cyan-500/10',
  },
]

export default function PersonalStory() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 gradient-bg opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Opening Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass border border-emerald-500/10"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-muted-foreground">🏔️ Kupwara, Kashmir, India</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            From the valleys of Kashmir
            <br />
            to the world of <span className="neon-text text-emerald-400">AI</span>
          </h2>

          <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I grew up in a small town where resources were limited but ambitions
              weren&apos;t. As a kid in Kupwara, Kashmir, I was always fascinated by how
              things worked — taking apart electronics, solving puzzles, and later,
              writing my first lines of code on a borrowed laptop.
            </p>
            <p>
              During my B.Tech, I stumbled upon data science — and it felt like
              finding my true calling. What followed was a journey of relentless
              self-learning: mastering machine learning, building real-time systems,
              and teaching myself full-stack development when projects demanded it.
              Every late night, every failed model, every bug was a lesson that shaped
              who I am today.
            </p>
            <p>
              Today, I&apos;m the founder of <span className="text-emerald-400 font-semibold">RuleMatrix</span>,
              an AI solutions company that helps businesses harness the power of
              artificial intelligence. My vision is simple yet ambitious: make AI
              accessible, practical, and transformative for businesses worldwide —
              no matter their size.
            </p>
          </div>
        </motion.div>

        {/* Timeline Milestones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-cyan-500/30 to-transparent" />

            <div className="space-y-8 sm:space-y-10">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                const isLeft = index % 2 === 0

                return (
                  <motion.div
                    key={milestone.title}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.12, duration: 0.5 }}
                    className={`relative flex items-start gap-4 sm:gap-0 ${
                      isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 border-2 border-background z-10 mt-6" />

                    {/* Content */}
                    <div className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${isLeft ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:col-start-2'}`}>
                      <Card className="glass card-hover p-5 sm:p-6">
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'sm:flex-row-reverse sm:text-right' : ''}`}>
                          <div className={`w-10 h-10 rounded-lg ${milestone.bgColor} flex items-center justify-center shrink-0`}>
                            <Icon className={`w-5 h-5 ${milestone.color}`} />
                          </div>
                          <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </Card>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* What Drives Me */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-center mb-8">
            <Target className="w-5 h-5 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              What <span className="neon-text text-emerald-400">Drives Me</span>
            </h3>
            <p className="text-muted-foreground text-sm">
              The principles that guide everything I build.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {values.map((value, index) => {
              const Icon = value.icon

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                >
                  <Card className={`glass card-hover h-full ${value.borderColor}`}>
                    <div className="p-5 sm:p-6 flex flex-col items-center text-center h-full">
                      <div className={`w-12 h-12 rounded-xl ${value.bgColor} flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 ${value.color}`} />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-center"
        >
          <Card className="glass border-emerald-500/15 inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Building2 className="w-8 h-8 text-emerald-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-left">
                <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 mb-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Available for UK &amp; Remote Roles
                </Badge>
                <p className="text-xs text-muted-foreground">Open to Freelance &amp; Full-time</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Currently planning UK move to expand horizons</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
