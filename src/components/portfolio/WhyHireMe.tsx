'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Zap, Rocket, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ValueCard {
  title: string
  impactNumber: number
  impactPrefix: string
  impactSuffix: string
  problem: string
  solution: string
  cta: string
  ctaHref: string
  icon: typeof TrendingUp
  color: string
  bgColor: string
  borderColor: string
}

const values: ValueCard[] = [
  {
    title: '40% Reduction in Processing Time',
    impactNumber: 40,
    impactPrefix: '',
    impactSuffix: '%',
    problem: 'Data team spending 8+ hours on manual batch processing every day.',
    solution: 'Automated ML pipeline with parallel processing, intelligent caching, and real-time monitoring.',
    cta: 'View Case Study →',
    ctaHref: '#case-studies',
    icon: Zap,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    borderColor: 'border-emerald-500/20',
  },
  {
    title: '₹15L Saved Annually on Fraud',
    impactNumber: 15,
    impactPrefix: '₹',
    impactSuffix: 'L',
    problem: 'Client losing ₹5L/month to undetected fraudulent transactions.',
    solution: 'XGBoost + Neural Network ensemble with real-time feature engineering.',
    cta: 'See the Project →',
    ctaHref: '#projects',
    icon: TrendingUp,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/5',
    borderColor: 'border-cyan-500/20',
  },
  {
    title: '58% Increase in Conversion Rate',
    impactNumber: 58,
    impactPrefix: '',
    impactSuffix: '%',
    problem: 'E-commerce platform stuck at 12% conversion — users couldn\'t find relevant products.',
    solution: 'Real-time personalization engine serving 10K+ recommendations/second.',
    cta: 'Explore Demo →',
    ctaHref: '#projects',
    icon: Rocket,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/5',
    borderColor: 'border-purple-500/20',
  },
]

function AnimatedCounter({ target, prefix, suffix, color }: { target: number; prefix: string; suffix: string; color: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current * 10) / 10)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold font-mono">
      {prefix}{suffix === 'L' ? count.toFixed(0) : Math.round(count)}<span className={color}>{suffix}</span>
    </span>
  )
}

export default function WhyHireMe() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const handleCTA = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="why-hire-me" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why <span className="neon-text text-emerald-400">Hire Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real problems solved with real impact. Here&apos;s the value I bring.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {values.map((value, i) => {
            const Icon = value.icon

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.15, duration: 0.6 }}
              >
                <Card className={`glass h-full overflow-hidden card-hover ${value.borderColor} flex flex-col`}>
                  {/* Impact Number */}
                  <div className={`p-6 sm:p-8 ${value.bgColor}`}>
                    <AnimatedCounter target={value.impactNumber} prefix={value.impactPrefix} suffix={value.impactSuffix} color={value.color} />
                    <p className="text-sm font-semibold text-foreground mt-2">{value.title}</p>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg ${value.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${value.color}`} />
                    </div>

                    {/* Problem */}
                    <div>
                      <Badge variant="outline" className="text-[10px] border-red-500/20 text-red-400 mb-2 bg-red-500/5">
                        Problem
                      </Badge>
                      <p className="text-sm text-muted-foreground">{value.problem}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <Badge variant="outline" className="text-[10px] border-emerald-500/20 text-emerald-400 mb-2 bg-emerald-500/5">
                        Solution
                      </Badge>
                      <p className="text-sm text-foreground">{value.solution}</p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto pt-3 border-t border-white/5">
                      <Button
                        variant="ghost"
                        onClick={() => handleCTA(value.ctaHref)}
                        className={`w-full justify-center gap-2 text-sm font-medium ${value.color} hover:${value.bgColor} group`}
                      >
                        {value.cta}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
