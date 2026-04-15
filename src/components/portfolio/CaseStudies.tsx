'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Shield, MessageSquareText, Sparkles,
  ArrowRight, ExternalLink, TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface CaseStudyMetric {
  label: string
  value: string
  numericPart: number
  suffix: string
}

interface CaseStudy {
  id: string
  title: string
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
  problem: string
  solution: string
  result: string
  tech: string[]
  metrics: CaseStudyMetric[]
  cta: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 'fraud-detection',
    title: 'Fraud Detection System',
    icon: Shield,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    borderColor: 'border-emerald-500/20',
    problem: 'Client losing ₹5L/month due to undetected fraudulent transactions across 50K+ daily transactions',
    solution: 'Built ML fraud detection pipeline using XGBoost + Neural Network ensemble with real-time feature engineering',
    result: 'Reduced fraud by 32%, saving ₹15L/year. System processes 50K+ transactions/day with <50ms latency',
    tech: ['Python', 'XGBoost', 'TensorFlow', 'FastAPI', 'Redis', 'Docker'],
    metrics: [
      { label: 'Accuracy', value: '96.4%', numericPart: 96.4, suffix: '%' },
      { label: 'Latency', value: '<50ms', numericPart: 50, suffix: 'ms' },
      { label: 'Saved/Year', value: '₹15L', numericPart: 15, suffix: 'L' },
    ],
    cta: 'Explore Code',
  },
  {
    id: 'nlp-sentiment',
    title: 'NLP Sentiment Analysis Platform',
    icon: MessageSquareText,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/5',
    borderColor: 'border-purple-500/20',
    problem: 'Brand needed real-time customer sentiment tracking across 10K+ daily social media mentions',
    solution: 'Fine-tuned BERT model with multi-language support and aspect-based sentiment analysis pipeline',
    result: 'Achieved 91% accuracy across 5 languages. Client response time improved by 60%',
    tech: ['PyTorch', 'Hugging Face', 'FastAPI', 'Docker', 'AWS'],
    metrics: [
      { label: 'Accuracy', value: '91%', numericPart: 91, suffix: '%' },
      { label: 'Languages', value: '5', numericPart: 5, suffix: '' },
      { label: 'Faster Response', value: '60%', numericPart: 60, suffix: '%' },
    ],
    cta: 'View Project',
  },
  {
    id: 'recommendation-engine',
    title: 'Recommendation Engine',
    icon: Sparkles,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/5',
    borderColor: 'border-amber-500/20',
    problem: 'E-commerce platform struggling with 12% conversion rate — users couldn\'t discover relevant products',
    solution: 'Hybrid recommendation system combining collaborative filtering + content-based ML with real-time personalization',
    result: 'Conversion rate increased from 12% to 19%. Serves 10K+ personalized recommendations/second',
    tech: ['Python', 'FAISS', 'Neo4j', 'Redis', 'TensorFlow'],
    metrics: [
      { label: 'Conversion Boost', value: '58%', numericPart: 58, suffix: '%' },
      { label: 'Recs/Sec', value: '10K+', numericPart: 10, suffix: 'K' },
      { label: 'Response Time', value: '<10ms', numericPart: 10, suffix: 'ms' },
    ],
    cta: 'Explore Code',
  },
]

function AnimatedMetric({ metric, delay }: { metric: CaseStudyMetric; delay: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = metric.numericPart / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= metric.numericPart) {
        setDisplayValue(metric.numericPart)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current * 10) / 10)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, metric.numericPart])

  const formattedValue = metric.suffix === 'L' || metric.suffix === 'K'
    ? `${displayValue}${metric.suffix}`
    : metric.suffix === 'ms'
      ? `&lt;${displayValue}${metric.suffix}`
      : `${Number.isInteger(displayValue) ? displayValue : displayValue.toFixed(1)}${metric.suffix}`

  return (
    <div className="text-center px-3 py-2 rounded-lg bg-white/3 border border-white/5">
      <p ref={ref} className="text-xl sm:text-2xl font-bold font-mono" dangerouslySetInnerHTML={{ __html: formattedValue }} />
      <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{metric.label}</p>
    </div>
  )
}

export default function CaseStudies() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="case-studies" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge variant="outline" className="mb-4 border-emerald-500/20 text-emerald-400 bg-emerald-500/5">
            <TrendingUp className="w-3 h-3 mr-1.5" />
            Proven Results
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Case <span className="neon-text text-emerald-400">Studies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real problems solved with measurable impact. Every project tells a story of transformation.
          </p>
        </motion.div>

        {/* Case Study Cards */}
        <div className="space-y-6">
          {caseStudies.map((study, index) => {
            const Icon = study.icon

            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + index * 0.15, duration: 0.6 }}
              >
                <Card className={`glass card-hover overflow-hidden ${study.borderColor}`}>
                  {/* Top Bar */}
                  <div className={`h-1 w-full ${study.bgColor}`}>
                    <div className={`h-full ${study.color.replace('text-', 'bg-').replace('-400', '-500/60')}`} style={{ width: '100%' }} />
                  </div>

                  <div className="p-5 sm:p-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl ${study.bgColor} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-6 h-6 ${study.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold">{study.title}</h3>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {study.tech.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-[10px] bg-white/5 text-muted-foreground"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Problem / Solution / Result */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                      {/* Problem */}
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                        <Badge
                          variant="outline"
                          className="text-[10px] border-red-500/20 text-red-400 mb-3 bg-red-500/5"
                        >
                          Problem
                        </Badge>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {study.problem}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                        <Badge
                          variant="outline"
                          className="text-[10px] border-emerald-500/20 text-emerald-400 mb-3 bg-emerald-500/5"
                        >
                          Solution
                        </Badge>
                        <p className="text-sm text-foreground leading-relaxed">
                          {study.solution}
                        </p>
                      </div>

                      {/* Result */}
                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                        <Badge
                          variant="outline"
                          className="text-[10px] border-amber-500/20 text-amber-400 mb-3 bg-amber-500/5"
                        >
                          Result
                        </Badge>
                        <p className="text-sm text-foreground leading-relaxed">
                          {study.result}
                        </p>
                      </div>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {study.metrics.map((metric, mIndex) => (
                        <AnimatedMetric
                          key={metric.label}
                          metric={metric}
                          delay={0.3 + index * 0.15 + mIndex * 0.1}
                        />
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <Button
                        variant="ghost"
                        className={`text-sm ${study.color} hover:${study.bgColor} group`}
                      >
                        {study.cta}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        Live Demo
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
