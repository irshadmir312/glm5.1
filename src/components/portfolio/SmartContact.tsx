'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  DollarSign, Calendar, MessageSquare, Sparkles,
  ArrowRight, ArrowLeft, Check, FileText, Bot,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePortfolioStore } from '@/store/portfolio'

interface Step {
  id: number
  title: string
  icon: typeof FileText
}

const steps: Step[] = [
  { id: 1, title: 'Project Type', icon: FileText },
  { id: 2, title: 'Budget', icon: DollarSign },
  { id: 3, title: 'Timeline', icon: Calendar },
  { id: 4, title: 'Details', icon: MessageSquare },
  { id: 5, title: 'AI Proposal', icon: Sparkles },
]

const projectTypes = [
  'AI/ML Solution',
  'Data Science Project',
  'Full Stack Application',
  'Cloud & DevOps',
  'NLP / Chatbot',
  'Computer Vision',
  'Consulting',
]

const budgetRanges = [
  '< $5K',
  '$5K - $15K',
  '$15K - $50K',
  '$50K+',
]

const timelines = [
  'ASAP',
  '1-2 weeks',
  '1 month',
  '2-3 months',
  '3+ months',
]

const generateProposal = (projectType: string, budget: string, timeline: string, message: string) => {
  const proposals: Record<string, { title: string; description: string; deliverables: string[]; techStack: string[] }> = {
    'ai/ml solution': {
      title: 'AI/ML Solution Package',
      description: 'End-to-end machine learning solution with model development, training, deployment, and monitoring.',
      deliverables: ['Data pipeline setup', 'Model development & training', 'API deployment', 'Monitoring dashboard', 'Documentation'],
      techStack: ['Python', 'PyTorch/TensorFlow', 'FastAPI', 'Docker', 'AWS/GCP'],
    },
    'data science project': {
      title: 'Data Science Analytics Package',
      description: 'Comprehensive data analysis with actionable insights, visualizations, and predictive modeling.',
      deliverables: ['Data exploration report', 'Statistical analysis', 'Predictive models', 'Visualization dashboard', 'Executive summary'],
      techStack: ['Python', 'Pandas', 'Scikit-learn', 'Tableau/Plotly', 'Jupyter'],
    },
    'full stack application': {
      title: 'Full Stack Development Package',
      description: 'Complete web application with AI integration, responsive design, and scalable architecture.',
      deliverables: ['UI/UX design', 'Frontend development', 'Backend API', 'Database design', 'Deployment & CI/CD'],
      techStack: ['Next.js', 'React', 'Node.js/FastAPI', 'PostgreSQL', 'Vercel'],
    },
    default: {
      title: 'Custom AI Solution Package',
      description: 'Tailored solution based on your specific requirements with AI-powered features.',
      deliverables: ['Requirements analysis', 'Solution architecture', 'Development', 'Testing & QA', 'Launch support'],
      techStack: ['Python', 'React/Next.js', 'FastAPI', 'Cloud Services', 'Docker'],
    },
  }

  const key = projectType.toLowerCase() in proposals ? projectType.toLowerCase() : 'default'
  const proposal = proposals[key]

  return {
    ...proposal,
    estimatedDuration: timeline,
    budgetRange: budget,
    additionalNote: message ? `Client note: "${message}"` : '',
  }
}

export default function SmartContact() {
  const [currentStep, setCurrentStep] = useState(0)
  const [projectType, setProjectType] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [message, setMessage] = useState('')
  const [proposal, setProposal] = useState<ReturnType<typeof generateProposal> | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const { setContactProjectType, setContactBudget, setContactTimeline, addXp, unlockBadge } = usePortfolioStore()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!projectType
      case 1: return !!budget
      case 2: return !!timeline
      case 3: return true
      case 4: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (currentStep === 0) setContactProjectType(projectType)
    if (currentStep === 1) setContactBudget(budget)
    if (currentStep === 2) setContactTimeline(timeline)

    if (currentStep === 3) {
      setIsGenerating(true)
      setTimeout(() => {
        const p = generateProposal(projectType, budget, timeline, message)
        setProposal(p)
        setCurrentStep(4)
        setIsGenerating(false)
        addXp(50)
        unlockBadge({
          id: 'networker',
          name: 'Networker',
          icon: '🤝',
          description: 'Submitted a contact request',
        })
      }, 1500)
      return
    }

    setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 0))

  return (
    <section id="contact" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 gradient-bg opacity-50" />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let&apos;s <span className="neon-text text-emerald-400">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tell me about your project and I&apos;ll generate a personalized proposal using AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass neon-border overflow-hidden">
            {/* Step Progress */}
            <div className="border-b border-white/5 px-6 py-4">
              <div className="flex items-center justify-between">
                {steps.map((step, i) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                      i < currentStep ? 'bg-emerald-500/20 text-emerald-400'
                        : i === currentStep ? 'bg-emerald-500 text-black'
                        : 'bg-white/5 text-muted-foreground'
                    }`}>
                      {i < currentStep ? <Check className="w-4 h-4" /> : step.id}
                    </div>
                    <span className={`hidden sm:block ml-2 text-xs ${
                      i === currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                    {i < steps.length - 1 && (
                      <div className={`w-6 sm:w-10 h-px mx-2 ${i < currentStep ? 'bg-emerald-500/50' : 'bg-white/10'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">What type of project do you need?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {projectTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => setProjectType(type)}
                            className={`p-3 rounded-lg border text-left text-sm transition-all ${
                              projectType === type
                                ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400'
                                : 'border-white/10 hover:border-white/20 text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {projectType === type && <Check className="w-4 h-4 inline mr-2" />}
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">What&apos;s your budget range?</h3>
                      <div className="space-y-2">
                        {budgetRanges.map((range) => (
                          <button
                            key={range}
                            onClick={() => setBudget(range)}
                            className={`w-full p-4 rounded-lg border text-left text-sm transition-all ${
                              budget === range
                                ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400'
                                : 'border-white/10 hover:border-white/20 text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {budget === range && <Check className="w-4 h-4 inline mr-2" />}
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">What&apos;s your preferred timeline?</h3>
                      <div className="space-y-2">
                        {timelines.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTimeline(t)}
                            className={`w-full p-4 rounded-lg border text-left text-sm transition-all ${
                              timeline === t
                                ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400'
                                : 'border-white/10 hover:border-white/20 text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {timeline === t && <Check className="w-4 h-4 inline mr-2" />}
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Any additional details?</h3>
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me more about your project, goals, or any specific requirements..."
                        className="min-h-[150px] bg-white/5 border-white/10 resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        Optional — skip this if you&apos;d like the AI to suggest everything.
                      </p>
                    </div>
                  )}

                  {currentStep === 4 && proposal && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-lg font-semibold">AI-Generated Proposal</h3>
                      </div>

                      <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <h4 className="font-semibold text-emerald-400 mb-2">{proposal.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="p-2 rounded bg-white/5 text-center">
                            <p className="text-[10px] text-muted-foreground">Budget</p>
                            <p className="text-sm font-semibold">{proposal.budgetRange}</p>
                          </div>
                          <div className="p-2 rounded bg-white/5 text-center">
                            <p className="text-[10px] text-muted-foreground">Timeline</p>
                            <p className="text-sm font-semibold">{proposal.estimatedDuration}</p>
                          </div>
                        </div>

                        <h5 className="text-xs font-medium mb-2 text-muted-foreground">Deliverables</h5>
                        <ul className="space-y-1 mb-3">
                          {proposal.deliverables.map((d) => (
                            <li key={d} className="text-xs text-muted-foreground flex items-center gap-2">
                              <Check className="w-3 h-3 text-emerald-400" />
                              {d}
                            </li>
                          ))}
                        </ul>

                        <h5 className="text-xs font-medium mb-2 text-muted-foreground">Tech Stack</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {proposal.techStack.map((t) => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-8 h-8 text-emerald-400" />
                      </motion.div>
                      <p className="text-sm text-muted-foreground">AI is generating your proposal...</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0 || isGenerating}
                className="text-muted-foreground gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <span className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>

              <Button
                onClick={handleNext}
                disabled={!canProceed() || isGenerating || currentStep === 4}
                className="bg-emerald-500 hover:bg-emerald-400 text-black gap-1"
              >
                {currentStep === 3 ? 'Generate Proposal' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
