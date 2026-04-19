'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquareHeart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Testimonial {
  quote: string
  name: string
  title: string
  company: string
  initials: string
  stars: number
}

const testimonials: Testimonial[] = [
  {
    quote: "Irshad delivered a fraud detection system that exceeded our expectations. His ML expertise and ability to translate business requirements into technical solutions is remarkable. The system saves us significant revenue monthly.",
    name: 'Arun K.',
    title: 'CTO',
    company: 'FinServe Solutions',
    initials: 'AK',
    stars: 5,
  },
  {
    quote: "Working with Irshad was a game-changer for our analytics. He built us a real-time dashboard that gives us insights we never had before. Highly professional and technically brilliant.",
    name: 'Priya M.',
    title: 'Head of Data',
    company: 'RetailPro',
    initials: 'PM',
    stars: 5,
  },
  {
    quote: "Irshad's recommendation engine boosted our conversion rate by 58%. He understood our business deeply and delivered a solution that just works. Truly exceptional engineer.",
    name: 'Rahul S.',
    title: 'Founder',
    company: 'ShopSmart',
    initials: 'RS',
    stars: 5,
  },
  {
    quote: "The chatbot system Irshad built for our customer support handles 70% of queries automatically. Our customer satisfaction improved significantly. He's our go-to AI engineer.",
    name: 'Sarah L.',
    title: 'VP Operations',
    company: 'TechCorp',
    initials: 'SL',
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  )
}

function AvatarInitials({ initials }: { initials: string }) {
  return (
    <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
      <span className="text-sm font-bold text-emerald-400">{initials}</span>
    </div>
  )
}

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="flex justify-center px-4"
        >
          <Card className="glass card-hover relative overflow-hidden max-w-2xl w-full border-emerald-500/10">
            {/* Emerald accent glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/3 rounded-full blur-[60px]" />

            <div className="relative p-6 sm:p-8 md:p-10">
              {/* Quote icon */}
              <div className="mb-5">
                <Quote className="w-8 h-8 text-emerald-400/40" />
              </div>

              {/* Quote text */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Stars */}
              <div className="mb-6">
                <StarRating count={testimonial.stars} />
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-5 border-t border-white/5">
                <AvatarInitials initials={testimonial.initials} />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title} at <span className="text-emerald-400">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (!isInView || isPaused) return
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [isInView, isPaused, goToNext])

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 gradient-bg opacity-30" />
      <div className="absolute inset-0 dot-pattern opacity-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquareHeart className="w-5 h-5 text-emerald-400" />
            <Badge variant="outline" className="text-xs border-emerald-500/20 text-emerald-400 bg-emerald-500/5">
              Social Proof
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What <span className="neon-text text-emerald-400">Clients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Don&apos;t just take my word for it. Here&apos;s what people I&apos;ve worked with have to say.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative min-h-[340px] sm:min-h-[320px] flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <TestimonialCard
            testimonial={testimonials[currentIndex]}
            isActive={true}
          />

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="w-9 h-9 rounded-full border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="w-9 h-9 rounded-full border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? 'w-8 h-2.5 bg-emerald-400'
                  : 'w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
