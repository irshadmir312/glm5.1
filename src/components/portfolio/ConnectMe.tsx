'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Phone, Mail, MapPin, CheckCircle2, Loader2,
  Send, MessageCircle, User, ExternalLink, AlertTriangle,
  IndianRupee, Layers,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  budget: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const contactCards = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 9622334883',
    href: 'https://wa.me/919622334883?text=Hi%20Irshad!%20I%20found%20your%20portfolio%20and%20wanted%20to%20connect.',
    color: 'text-[#25D366]',
    bg: 'bg-[#25D366]/5',
    border: 'border-[#25D366]/20',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'irshadmir312@gmail.com',
    href: 'mailto:irshadmir312@gmail.com',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/5',
    border: 'border-cyan-500/20',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: null,
    color: 'text-purple-400',
    bg: 'bg-purple-500/5',
    border: 'border-purple-500/20',
  },
]

export default function ConnectMe() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      budget: '',
      projectType: '',
      message: '',
    },
  })

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          budget: data.budget,
          projectType: data.projectType,
          message: data.message,
        }),
      })
      const result = await res.json()

      if (!res.ok) {
        // Check for SMTP not configured error
        if (result.code === 'SMTP_NOT_CONFIGURED') {
          setSubmitError('Email service is being set up. Please contact me via WhatsApp for now.')
        } else {
          setSubmitError(result.error || 'Failed to send message. Please try again.')
        }
        return
      }
      setSubmitSuccess(true)
      form.reset()
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 gradient-bg opacity-50" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Connect <span className="neon-text text-emerald-400">With Me</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message and I&apos;ll get back to you soon.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Contact Info Cards — Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactCards.map((card) => {
              const Icon = card.icon
              const Wrapper = card.href ? 'a' : 'div'
              const linkProps = card.href
                ? { href: card.href, target: '_blank', rel: 'noopener noreferrer' }
                : {}

              return (
                <Card
                  key={card.label}
                  className={`glass p-4 card-hover ${card.border}`}
                >
                  <Wrapper {...linkProps} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{card.label}</p>
                      <p className={`text-sm font-medium ${card.color} truncate`}>{card.value}</p>
                    </div>
                    {card.href && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </Wrapper>
                </Card>
              )
            })}

            {/* Availability Badge */}
            <Card className="glass p-4 border-emerald-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                      Available for Hire
                    </Badge>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form — Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <Card className="glass neon-border overflow-hidden">
              <div className="p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-emerald-400" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="bg-white/5 border-white/10 focus:border-emerald-500/50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone, Email & Budget Row */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-emerald-400" />
                              Phone
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+91 9876543210"
                                className="bg-white/5 border-white/10 focus:border-emerald-500/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-emerald-400" />
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                className="bg-white/5 border-white/10 focus:border-emerald-500/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1.5">
                              <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                              Budget
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value || undefined}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full bg-white/5 border-white/10 focus:border-emerald-500/50">
                                  <SelectValue placeholder="Select budget" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="under-50k">Under ₹50K</SelectItem>
                                <SelectItem value="50k-1l">₹50K - ₹1L</SelectItem>
                                <SelectItem value="1l-5l">₹1L - ₹5L</SelectItem>
                                <SelectItem value="5l-10l">₹5L - ₹10L</SelectItem>
                                <SelectItem value="10l+">₹10L+</SelectItem>
                                <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Project Type */}
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-emerald-400" />
                            Project Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value || undefined}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full bg-white/5 border-white/10 focus:border-emerald-500/50">
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ai-chatbot">AI Chatbot</SelectItem>
                              <SelectItem value="data-analytics-dashboard">Data Analytics Dashboard</SelectItem>
                              <SelectItem value="ml-model-development">ML Model Development</SelectItem>
                              <SelectItem value="web-ai-integration">Web + AI Integration</SelectItem>
                              <SelectItem value="automation-pipeline">Automation Pipeline</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your project, idea, or just say hi..."
                              className="min-h-[120px] bg-white/5 border-white/10 resize-none focus:border-emerald-500/50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    {submitError && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm text-amber-300">{submitError}</p>
                          <a
                            href="https://wa.me/919622334883?text=Hi%20Irshad!%20I%20tried%20contacting%20from%20your%20portfolio."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-emerald-400 hover:underline mt-1 inline-block"
                          >
                            Chat on WhatsApp instead →
                          </a>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || submitSuccess}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold gap-2 h-11"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : submitSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Message Sent! ✅
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
