'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BookOpen, Clock, ArrowRight, PenLine,
  Sparkles, Mail, Rss,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface BlogPost {
  title: string
  readTime: string
  category: string
  categoryColor: string
  categoryBg: string
  excerpt: string
  gradient: string
}

const blogPosts: BlogPost[] = [
  {
    title: 'How I Built an AI Chatbot That Handles 70% of Customer Queries',
    readTime: '5 min read',
    category: 'AI/ML',
    categoryColor: 'text-emerald-400',
    categoryBg: 'bg-emerald-500/10 border-emerald-500/20',
    excerpt: 'A deep dive into building an intelligent chatbot using LLMs, RAG pipelines, and real-time processing...',
    gradient: 'from-emerald-500/20 via-cyan-500/10 to-transparent',
  },
  {
    title: 'Fraud Detection with ML: A Real-World Approach That Saved ₹15L/Year',
    readTime: '8 min read',
    category: 'Data Science',
    categoryColor: 'text-amber-400',
    categoryBg: 'bg-amber-500/10 border-amber-500/20',
    excerpt: 'Building a production-grade fraud detection system using XGBoost ensemble with real-time scoring...',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
  },
  {
    title: 'How to Build an AI Startup from Kashmir: Lessons & Challenges',
    readTime: '6 min read',
    category: 'Career',
    categoryColor: 'text-purple-400',
    categoryBg: 'bg-purple-500/10 border-purple-500/20',
    excerpt: 'From self-learning ML in a small town to founding an AI solutions company — here\'s what I learned...',
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
  },
  {
    title: 'Handling Imbalanced Data: Techniques That Actually Work',
    readTime: '7 min read',
    category: 'ML',
    categoryColor: 'text-cyan-400',
    categoryBg: 'bg-cyan-500/10 border-cyan-500/20',
    excerpt: 'Practical approaches for dealing with real-world imbalanced datasets — from SMOTE to cost-sensitive learning...',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
  },
]

export default function BlogInsights() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')

  return (
    <section id="blog" ref={ref} className="relative py-20 sm:py-28">
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
            <PenLine className="w-5 h-5 text-emerald-400" />
            <Badge variant="outline" className="text-xs border-emerald-500/20 text-emerald-400 bg-emerald-500/5">
              Insights
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Blog &amp; <span className="neon-text text-emerald-400">Insights</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Sharing lessons from the trenches of AI/ML engineering, startup building, and career growth.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
            >
              <Card className="glass card-hover group h-full overflow-hidden cursor-pointer">
                {/* Thumbnail Gradient */}
                <div className={`relative h-36 sm:h-40 bg-gradient-to-br ${post.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="absolute bottom-3 left-4">
                    <Badge variant="outline" className={`text-[10px] ${post.categoryBg} ${post.categoryColor}`}>
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <BookOpen className="w-5 h-5 text-foreground/10" />
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col h-full">
                  {/* Read time */}
                  <div className="flex items-center gap-1.5 mb-3 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-foreground mb-3 leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-2.5 transition-all">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon + Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <Card className="glass border-emerald-500/10 p-8 sm:p-10 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Rss className="w-5 h-5 text-emerald-400" />
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              More insights coming soon...
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Stay tuned! I write about AI, ML, startups, and career growth. Subscribe to get notified when new posts drop.
            </p>

            {/* Newsletter Signup */}
            <div className="flex gap-2 max-w-sm mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 text-sm placeholder:text-muted-foreground/40"
                />
              </div>
              <Button
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shrink-0 gap-1.5"
                disabled={!email.trim()}
              >
                <span className="hidden sm:inline">Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground/50 mt-3">
              No spam. Unsubscribe anytime. Just good content.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
