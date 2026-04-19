'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Award, Cloud, GraduationCap, Terminal,
  Database, Brain, ExternalLink,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Certification {
  title: string
  issuer: string
  description: string
  icon: typeof Award
  color: string
  bgColor: string
  borderColor: string
}

const certifications: Certification[] = [
  {
    title: 'AWS Certified Machine Learning — Specialty',
    issuer: 'Amazon Web Services',
    description: 'ML model deployment, SageMaker, and cloud ML operations',
    icon: Cloud,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/5',
    borderColor: 'border-amber-500/10',
  },
  {
    title: 'Google Professional Data Engineer',
    issuer: 'Google Cloud',
    description: 'Data pipelines, BigQuery, ML on GCP, and data governance',
    icon: Database,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/5',
    borderColor: 'border-cyan-500/10',
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'Coursera (Andrew Ng)',
    description: 'Neural networks, CNNs, RNNs, sequence models, and optimization',
    icon: Brain,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/5',
    borderColor: 'border-purple-500/10',
  },
  {
    title: 'Python for Data Science and ML',
    issuer: 'NPTEL',
    description: 'Python ecosystem, NumPy, Pandas, Scikit-learn, TensorFlow',
    icon: Terminal,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    borderColor: 'border-emerald-500/10',
  },
  {
    title: 'SQL for Data Science',
    issuer: 'HackerRank (Gold)',
    description: 'Advanced queries, window functions, optimization, and database design',
    icon: Database,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/5',
    borderColor: 'border-pink-500/10',
  },
  {
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    description: 'Building and training ML models with TensorFlow 2.x',
    icon: GraduationCap,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/5',
    borderColor: 'border-orange-500/10',
  },
]

export default function Certifications() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="certifications" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-15" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-5 h-5 text-emerald-400" />
            <Badge variant="outline" className="text-xs border-emerald-500/20 text-emerald-400 bg-emerald-500/5">
              Credentials
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Certifications &amp; <span className="neon-text text-emerald-400">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Continuously learning and earning industry-recognized certifications to stay at the cutting edge.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {certifications.map((cert, index) => {
            const Icon = cert.icon

            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className={`glass card-hover h-full ${cert.borderColor}`}>
                  <div className="p-5 sm:p-6 flex flex-col h-full">
                    {/* Icon + Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 rounded-lg ${cert.bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <Icon className={`w-5 h-5 ${cert.color}`} />
                      </div>
                      <ExternalLink className={`w-4 h-4 ${cert.color} opacity-40`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <Badge
                      variant="outline"
                      className={`text-[10px] self-start mb-3 ${cert.bgColor} ${cert.color} ${cert.borderColor}`}
                    >
                      {cert.issuer}
                    </Badge>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
                      {cert.description}
                    </p>
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
