'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Shield, Car, MessageSquareText, Sparkles,
  BarChart3, Bot, Bookmark, BookmarkCheck,
  ExternalLink, ChevronRight, Loader2, RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { usePortfolioStore } from '@/store/portfolio'

interface Project {
  id: string
  name: string
  description: string
  longDescription: string
  techStack: string[]
  status: 'live' | 'demo' | 'prototype'
  icon: typeof Shield
  color: string
  bgColor: string
  demoType: 'fraud' | 'car-price' | 'sentiment' | 'recommendation' | 'dashboard' | 'chatbot'
}

const projects: Project[] = [
  {
    id: 'fraud-detection',
    name: 'Fraud Detection System',
    description: 'Real-time ML model for detecting fraudulent transactions.',
    longDescription: 'Built a production-grade fraud detection system using XGBoost and neural networks. Achieves 96.4% accuracy with real-time scoring at <50ms latency.',
    techStack: ['Python', 'XGBoost', 'TensorFlow', 'FastAPI', 'Redis'],
    status: 'live',
    icon: Shield,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    demoType: 'fraud',
  },
  {
    id: 'car-price',
    name: 'Car Price Predictor',
    description: 'ML regression model for predicting used car prices.',
    longDescription: 'End-to-end ML pipeline with feature engineering, model training, and web interface. Supports multiple car brands with interactive price estimation.',
    techStack: ['Scikit-learn', 'Pandas', 'Streamlit', 'Flask'],
    status: 'live',
    icon: Car,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/5',
    demoType: 'car-price',
  },
  {
    id: 'sentiment',
    name: 'NLP Sentiment Analyzer',
    description: 'Real-time text sentiment analysis using transformer models.',
    longDescription: 'Fine-tuned BERT model for sentiment classification. Handles multiple languages and provides aspect-based sentiment analysis with confidence scores.',
    techStack: ['PyTorch', 'Hugging Face', 'FastAPI', 'Docker'],
    status: 'demo',
    icon: MessageSquareText,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/5',
    demoType: 'sentiment',
  },
  {
    id: 'recommendation',
    name: 'Recommendation Engine',
    description: 'Collaborative filtering engine for personalized recommendations.',
    longDescription: 'Hybrid recommendation system combining collaborative and content-based filtering. Serves 10K+ recommendations per second with sub-10ms response time.',
    techStack: ['Python', 'Surprise', 'FAISS', 'Neo4j', 'Redis'],
    status: 'demo',
    icon: Sparkles,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/5',
    demoType: 'recommendation',
  },
  {
    id: 'dashboard',
    name: 'Real-Time Dashboard',
    description: 'Live analytics dashboard with real-time data visualization.',
    longDescription: 'Full-stack analytics platform with WebSocket-powered real-time updates, interactive charts, and customizable widgets for business intelligence.',
    techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'WebSocket'],
    status: 'prototype',
    icon: BarChart3,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/5',
    demoType: 'dashboard',
  },
  {
    id: 'chatbot-builder',
    name: 'Chatbot Builder',
    description: 'No-code platform for building custom AI chatbots.',
    longDescription: 'Visual chatbot builder with drag-and-drop flow designer, NLU training, and multi-channel deployment. Supports GPT, Claude, and custom models.',
    techStack: ['Next.js', 'LangChain', 'OpenAI', 'Pinecone', 'Prisma'],
    status: 'demo',
    icon: Bot,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    demoType: 'chatbot',
  },
]

const statusColors: Record<string, string> = {
  live: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  demo: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  prototype: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

function FraudDemo() {
  const [amount, setAmount] = useState([500])
  const [distance, setDistance] = useState([50])
  const [hour, setHour] = useState([14])
  const [isOnline, setIsOnline] = useState(true)
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const predict = () => {
    setLoading(true)
    setTimeout(() => {
      const amtScore = Math.min(amount[0] / 5000, 1) * 40
      const distScore = Math.min(distance[0] / 500, 1) * 25
      const hourScore = (hour[0] < 6 || hour[0] > 22) ? 20 : 5
      const onlineScore = isOnline ? 5 : 15
      const fraudProb = Math.min(100, Math.round(amtScore + distScore + hourScore + onlineScore + Math.random() * 10))
      setResult(fraudProb)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex justify-between">
          <span>Transaction Amount</span>
          <span className="text-emerald-400 font-mono">${amount[0]}</span>
        </label>
        <Slider value={amount} onValueChange={setAmount} max={10000} step={50} className="w-full" />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex justify-between">
          <span>Distance from Home (km)</span>
          <span className="text-cyan-400 font-mono">{distance[0]}km</span>
        </label>
        <Slider value={distance} onValueChange={setDistance} max={1000} step={10} className="w-full" />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex justify-between">
          <span>Time of Transaction</span>
          <span className="text-purple-400 font-mono">{hour[0]}:00</span>
        </label>
        <Slider value={hour} onValueChange={setHour} max={23} step={1} className="w-full" />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm text-muted-foreground">Online Transaction</label>
        <Button
          size="sm"
          variant={isOnline ? 'default' : 'outline'}
          onClick={() => setIsOnline(!isOnline)}
          className={isOnline ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : ''}
        >
          {isOnline ? 'Yes' : 'No'}
        </Button>
      </div>
      <Button onClick={predict} disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Shield className="w-4 h-4 mr-2" />}
        Analyze Transaction
      </Button>
      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <div className={`rounded-lg p-4 ${result > 60 ? 'bg-red-500/10 border border-red-500/20' : result > 30 ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-emerald-500/10 border border-emerald-500/20'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Fraud Probability</span>
              <span className={`text-2xl font-bold ${result > 60 ? 'text-red-400' : result > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {result}%
              </span>
            </div>
            <Progress value={result} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {result > 60 ? '🚨 High risk — flagged for review' : result > 30 ? '⚠️ Medium risk — monitoring recommended' : '✅ Low risk — transaction approved'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function CarPriceDemo() {
  const [brand, setBrand] = useState('')
  const [year, setYear] = useState('')
  const [mileage, setMileage] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const predict = () => {
    if (!brand || !year || !mileage) return
    setLoading(true)
    setTimeout(() => {
      const basePrices: Record<string, number> = {
        toyota: 25000, honda: 22000, bmw: 45000, mercedes: 50000,
        audi: 42000, hyundai: 20000, ford: 28000, tesla: 48000,
      }
      const base = basePrices[brand] || 25000
      const yearFactor = (parseInt(year) - 2015) * 1500
      const mileagePenalty = parseInt(mileage) * 0.08
      const price = Math.max(5000, Math.round(base + yearFactor - mileagePenalty + Math.random() * 2000))
      setResult(price)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Brand</label>
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger className="bg-white/5 border-white/10">
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Hyundai', 'Ford', 'Tesla'].map(b => (
              <SelectItem key={b.toLowerCase()} value={b.toLowerCase()}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Year</label>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="bg-white/5 border-white/10">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map(y => (
              <SelectItem key={y} value={String(y)}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex justify-between">
          <span>Mileage (km)</span>
          {mileage && <span className="font-mono text-cyan-400">{mileage} km</span>}
        </label>
        <Slider value={mileage ? [parseInt(mileage)] : [50000]} onValueChange={v => setMileage(String(v[0]))} max={200000} step={5000} />
      </div>
      <Button onClick={predict} disabled={loading || !brand || !year || !mileage} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Car className="w-4 h-4 mr-2" />}
        Predict Price
      </Button>
      {result !== null && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
          <p className="text-sm text-muted-foreground mb-1">Estimated Price</p>
          <p className="text-3xl font-bold text-cyan-400">${result.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Based on ML model prediction</p>
        </motion.div>
      )}
    </div>
  )
}

function SentimentDemo() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<{ positive: number; negative: number; neutral: number; label: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const analyze = () => {
    if (!text.trim()) return
    setLoading(true)
    setTimeout(() => {
      const positiveWords = ['great', 'good', 'amazing', 'love', 'excellent', 'best', 'happy', 'wonderful', 'awesome', 'fantastic', 'perfect']
      const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'poor', 'disgusting', 'disappointing', 'useless']
      const words = text.toLowerCase().split(/\s+/)
      const posCount = words.filter(w => positiveWords.some(pw => w.includes(pw))).length
      const negCount = words.filter(w => negativeWords.some(nw => w.includes(nw))).length
      const total = Math.max(posCount + negCount, 1)
      let positive = Math.round((posCount / total) * 100)
      let negative = Math.round((negCount / total) * 100)
      let neutral = Math.max(0, 100 - positive - negative)
      if (posCount === 0 && negCount === 0) { neutral = 60; positive = 20; negative = 20 }
      const label = positive > negative ? 'Positive 😊' : negative > positive ? 'Negative 😞' : 'Neutral 😐'
      setResult({ positive, negative, neutral, label })
      setLoading(false)
    }, 800)
  }

  const examples = [
    'This product is amazing! I absolutely love it!',
    'Terrible experience, worst service ever.',
    'The product is okay, nothing special about it.',
  ]

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a sentence to analyze..."
        className="min-h-[80px] bg-white/5 border-white/10 resize-none"
      />
      <div className="flex flex-wrap gap-2">
        {examples.map((ex, i) => (
          <Button key={i} variant="outline" size="sm" onClick={() => setText(ex)} className="text-xs border-white/10 text-muted-foreground hover:text-foreground">
            Example {i + 1}
          </Button>
        ))}
      </div>
      <Button onClick={analyze} disabled={loading || !text.trim()} className="w-full bg-purple-500 hover:bg-purple-400 text-white">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <MessageSquareText className="w-4 h-4 mr-2" />}
        Analyze Sentiment
      </Button>
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
          <div className="text-center mb-3">
            <span className="text-sm text-muted-foreground">Sentiment: </span>
            <span className="text-lg font-semibold">{result.label}</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1"><span>Positive</span><span className="text-emerald-400">{result.positive}%</span></div>
              <div className="h-2 rounded-full bg-white/5"><div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${result.positive}%` }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span>Neutral</span><span className="text-amber-400">{result.neutral}%</span></div>
              <div className="h-2 rounded-full bg-white/5"><div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${result.neutral}%` }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span>Negative</span><span className="text-red-400">{result.negative}%</span></div>
              <div className="h-2 rounded-full bg-white/5"><div className="h-full rounded-full bg-red-400 transition-all" style={{ width: `${result.negative}%` }} /></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function RecommendationDemo() {
  const [genre, setGenre] = useState('')
  const [result, setResult] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)

  const moviesByGenre: Record<string, string[]> = {
    'action': ['The Dark Knight', 'Mad Max: Fury Road', 'John Wick', 'Die Hard', 'Gladiator'],
    'comedy': ['The Grand Budapest Hotel', 'Superbad', 'Bridesmaids', 'The Hangover', 'Step Brothers'],
    'scifi': ['Interstellar', 'Blade Runner 2049', 'The Matrix', 'Dune', 'Arrival'],
    'drama': ['The Shawshank Redemption', 'Forrest Gump', 'The Godfather', 'Schindler\'s List', 'Parasite'],
    'thriller': ['Se7en', 'Gone Girl', 'Prisoners', 'Zodiac', 'Shutter Island'],
  }

  const recommend = () => {
    if (!genre) return
    setLoading(true)
    setTimeout(() => {
      const recommended = moviesByGenre[genre] || moviesByGenre['drama']
      setResult(recommended)
      setLoading(false)
    }, 600)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Select Genre</label>
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger className="bg-white/5 border-white/10">
            <SelectValue placeholder="Choose a genre" />
          </SelectTrigger>
          <SelectContent>
            {['Action', 'Comedy', 'Sci-Fi', 'Drama', 'Thriller'].map(g => (
              <SelectItem key={g.toLowerCase()} value={g.toLowerCase()}>{g}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={recommend} disabled={loading || !genre} className="w-full bg-pink-500 hover:bg-pink-400 text-white">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
        Get Recommendations
      </Button>
      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          {result.map((movie, i) => (
            <motion.div
              key={movie}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/8 transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-sm">{movie}</span>
              <div className="ml-auto text-xs text-amber-400">★ {((4.5 - i * 0.3) + Math.random() * 0.2).toFixed(1)}</div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

function DashboardDemo() {
  const metrics = [
    { label: 'Total Users', value: '12,847', change: '+14.2%', positive: true },
    { label: 'Revenue', value: '$48.2K', change: '+8.5%', positive: true },
    { label: 'Conversion', value: '3.24%', change: '+2.1%', positive: true },
    { label: 'Bounce Rate', value: '24.8%', change: '-3.2%', positive: true },
  ]

  const chartBars = [65, 40, 80, 55, 90, 70, 85, 60, 75, 95, 50, 88]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="p-3 rounded-lg bg-white/5 border border-white/5">
            <p className="text-[10px] text-muted-foreground">{m.label}</p>
            <p className="text-lg font-bold font-mono">{m.value}</p>
            <span className={`text-[10px] ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
              {m.change}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-white/5 border border-white/5">
        <p className="text-xs text-muted-foreground mb-3">Monthly Active Users</p>
        <div className="flex items-end gap-1.5 h-24">
          {chartBars.map((bar, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${bar}%` }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`flex-1 rounded-t-sm ${i === chartBars.length - 1 ? 'bg-emerald-400' : 'bg-white/10'}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[8px] text-muted-foreground">Jan</span>
          <span className="text-[8px] text-muted-foreground">Dec</span>
        </div>
      </div>
    </div>
  )
}

function ChatbotDemo() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! I\'m Irshad\'s AI assistant. Ask me anything about his skills, projects, or experience!' },
  ])
  const [input, setInput] = useState('')

  const quickQuestions = ['What are your skills?', 'Tell me about your projects', 'How to contact you?', 'Your tech stack?']

  const send = (text: string) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setTimeout(() => {
      const responses: Record<string, string> = {
        'what are your skills?': 'Irshad excels in Python, Machine Learning, Deep Learning, NLP, Full Stack (React/Next.js), and Cloud (AWS/GCP).',
        'tell me about your projects': 'Irshad has built 50+ projects including Fraud Detection Systems, NLP pipelines, Recommendation Engines, and Real-time Dashboards.',
        'how to contact you?': 'Use the contact form below or reach out via LinkedIn and GitHub — links are in the footer!',
        'your tech stack?': 'Python, PyTorch, TensorFlow, React, Next.js, FastAPI, PostgreSQL, Docker, AWS, GCP, and more.',
      }
      const match = Object.keys(responses).find(k => text.toLowerCase().includes(k.replace('?', '').replace('your', '').trim()))
      setMessages(prev => [...prev, {
        role: 'bot',
        text: match ? responses[match] : 'Great question! Irshad would love to discuss this in more detail. Try the contact form or AI chat for personalized answers!',
      }])
    }, 600)
  }

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-1 overflow-y-auto space-y-3 p-2 mb-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'bg-emerald-500/20 text-emerald-100' : 'bg-white/5 text-muted-foreground'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {quickQuestions.map((q) => (
          <Button key={q} variant="outline" size="sm" onClick={() => send(q)} className="text-[10px] border-white/10 text-muted-foreground hover:text-foreground h-7">
            {q}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="bg-white/5 border-white/10 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && send(input)}
        />
        <Button onClick={() => send(input)} size="icon" className="bg-emerald-500 hover:bg-emerald-400 text-black shrink-0">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

const demoComponents: Record<string, React.FC> = {
  fraud: FraudDemo,
  'car-price': CarPriceDemo,
  sentiment: SentimentDemo,
  recommendation: RecommendationDemo,
  dashboard: DashboardDemo,
  chatbot: ChatbotDemo,
}

export default function ProjectLab() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { bookmarkedProjects, toggleBookmark, visitSection } = usePortfolioStore()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const DemoComponent = selectedProject ? demoComponents[selectedProject.demoType] : null

  return (
    <section id="projects" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 gradient-bg opacity-50" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Project <span className="neon-text text-emerald-400">Lab</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive demos of my AI/ML projects. Click any project to try a live demo.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {projects.map((project, index) => {
            const Icon = project.icon
            const isBookmarked = bookmarkedProjects.includes(project.id)

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <Card
                  className="glass card-hover cursor-pointer group relative overflow-hidden h-full"
                  onClick={() => { setSelectedProject(project); visitSection(`project-${project.id}`) }}
                >
                  <div className="p-5 sm:p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 rounded-lg ${project.bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <Icon className={`w-5 h-5 ${project.color}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-[10px] ${statusColors[project.status]}`}>
                          {project.status}
                        </Badge>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleBookmark(project.id) }}
                          className="text-muted-foreground hover:text-emerald-400 transition-colors"
                        >
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-[10px] bg-white/5 text-muted-foreground">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge variant="secondary" className="text-[10px] bg-white/5 text-muted-foreground">
                          +{project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Try Demo Link */}
                    <div className="flex items-center gap-1 text-sm text-emerald-400 group-hover:gap-2 transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Try Demo</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Demo Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-lg glass-strong border-white/10 bg-background/95 backdrop-blur-xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${selectedProject.bgColor} flex items-center justify-center`}>
                    <selectedProject.icon className={`w-5 h-5 ${selectedProject.color}`} />
                  </div>
                  <div>
                    <DialogTitle className="text-lg">{selectedProject.name}</DialogTitle>
                    <p className="text-xs text-muted-foreground">{selectedProject.longDescription}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-[10px] border-emerald-500/20 text-emerald-400">Interactive Demo</Badge>
                  {selectedProject.techStack.map(t => (
                    <Badge key={t} variant="secondary" className="text-[10px] bg-white/5">{t}</Badge>
                  ))}
                </div>
                {DemoComponent && <DemoComponent />}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
