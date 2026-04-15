'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Bot, BarChart3, BrainCircuit, Code2, Zap,
  ArrowRight, Sparkles, MessageCircle, Send,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Service {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
  gradientFrom: string
  gradientTo: string
  price: string
  features: string[]
}

const services: Service[] = [
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots & Assistants',
    description: 'Custom AI chatbots powered by LLMs, RAG pipelines, and intelligent automation for your business',
    icon: Bot,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    borderColor: 'border-emerald-500/20',
    gradientFrom: 'from-emerald-500/20',
    gradientTo: 'to-emerald-500/5',
    price: 'Custom Quote',
    features: ['Custom LLM Integration', 'RAG Pipeline Setup', 'Multi-channel Deployment', 'Context Memory'],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & Dashboards',
    description: 'Real-time analytics platforms that transform raw data into actionable business intelligence',
    icon: BarChart3,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/5',
    borderColor: 'border-cyan-500/20',
    gradientFrom: 'from-cyan-500/20',
    gradientTo: 'to-cyan-500/5',
    price: 'Custom Quote',
    features: ['Real-time Dashboards', 'Custom Visualizations', 'ETL Pipelines', 'Automated Reports'],
  },
  {
    id: 'ml-models',
    title: 'ML Model Development',
    description: 'End-to-end ML systems from data preprocessing to model deployment and monitoring',
    icon: BrainCircuit,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/5',
    borderColor: 'border-purple-500/20',
    gradientFrom: 'from-purple-500/20',
    gradientTo: 'to-purple-500/5',
    price: 'Custom Quote',
    features: ['Model Training & Tuning', 'Feature Engineering', 'API Deployment', 'Performance Monitoring'],
  },
  {
    id: 'web-ai-integration',
    title: 'Web + AI Integration',
    description: 'Full-stack applications with embedded AI capabilities — from React frontends to Python backends',
    icon: Code2,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/5',
    borderColor: 'border-amber-500/20',
    gradientFrom: 'from-amber-500/20',
    gradientTo: 'to-amber-500/5',
    price: 'Custom Quote',
    features: ['Next.js / React Apps', 'Python API Backends', 'AI Feature Embedding', 'CI/CD Setup'],
  },
  {
    id: 'automation',
    title: 'Automation & Pipelines',
    description: 'Data pipelines, web scraping, workflow automation, and ETL systems that save hours daily',
    icon: Zap,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/5',
    borderColor: 'border-pink-500/20',
    gradientFrom: 'from-pink-500/20',
    gradientTo: 'to-pink-500/5',
    price: 'Custom Quote',
    features: ['Web Scraping Bots', 'Workflow Automation', 'ETL Systems', 'Scheduled Jobs'],
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-40px' })
  const Icon = service.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
    >
      <Card className={`glass card-hover h-full flex flex-col ${service.borderColor}`}>
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          {/* Icon with Gradient Background */}
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} flex items-center justify-center mb-5`}>
            <Icon className={`w-7 h-7 ${service.color}`} />
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-2 mb-5 flex-1">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${service.color.replace('text-', 'bg-')}`} />
                <span className="text-xs text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="pt-4 border-t border-white/5 mb-4">
            <p className="text-xs text-muted-foreground mb-1">Starting from</p>
            <p className={`text-sm font-semibold ${service.color}`}>{service.price}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              size="sm"
              className={`flex-1 bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo} border border-white/10 hover:border-white/20 text-foreground text-xs`}
              asChild
            >
              <a href="#contact">
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Get Proposal
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-white/10 text-xs text-muted-foreground hover:text-foreground hover:border-white/20"
            >
              Learn More
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} className="relative py-20 sm:py-28">
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
            <Sparkles className="w-3 h-3 mr-1.5" />
            Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What I Can Do <span className="neon-text text-emerald-400">For You</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From AI-powered chatbots to full-stack web applications, I deliver solutions that drive real business results.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16"
        >
          <Card className="glass overflow-hidden border-emerald-500/10">
            <div className="relative p-8 sm:p-12 text-center">
              {/* Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-emerald-400" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  Ready to Build Something <span className="neon-text text-emerald-400">Amazing</span>?
                </h3>
                <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                  Let&apos;s turn your idea into reality. Whether you need an AI solution, a full-stack application, or a data pipeline — I&apos;m here to help.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8"
                    asChild
                  >
                    <a href="#contact">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Hire Me
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 px-8"
                    asChild
                  >
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Book a Call
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 px-8"
                    asChild
                  >
                    <a href="#contact">
                      <Send className="w-4 h-4 mr-2" />
                      Get Proposal
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
