'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Trash2, Bot, User, Minimize2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePortfolioStore, type ChatMessage } from '@/store/portfolio'

const quickActions = [
  { label: '🚀 My Projects', prompt: 'Tell me about your projects and their impact' },
  { label: '💼 Hire You', prompt: 'I want to hire you for an AI project. What services do you offer?' },
  { label: '🤖 AI Solutions', prompt: 'What AI solutions can you build for businesses?' },
  { label: '💡 Your Tech Stack', prompt: "What's your complete tech stack and expertise?" },
  { label: '🎯 Career Advice', prompt: 'What career advice do you have for aspiring data scientists?' },
  { label: '📍 About You', prompt: 'Tell me about yourself, your journey, and where you\'re from' },
  { label: '🔍 Fraud Detection', prompt: 'Tell me about your fraud detection project in detail' },
  { label: '📊 ML Pipelines', prompt: 'How do you build production ML pipelines?' },
]

// Comprehensive fallback responses — used ONLY when API is completely unavailable
const fallbackResponses: Record<string, string> = {
  interview: `## 🎯 Handling Imbalanced Data in Production

Great question! Let me walk you through my experience:

**The Challenge:** In my fraud detection project, the data was heavily imbalanced (~0.3% fraud class). Here's my approach:

1. **SMOTE + ADASYN** for intelligent oversampling of the minority class
2. **Class-weighted loss functions** in XGBoost and the neural network
3. **Custom threshold tuning** — optimized for F1-score rather than accuracy
4. **Stratified K-fold cross-validation** to maintain class distribution across folds

**Results:** 96.4% accuracy with a 0.92 F1-score, and we reduced false positives by 35%.

Would you like to hear about the deployment architecture or the real-time scoring pipeline? 🔍`,

  fraud: `## 🔍 Fraud Detection System — My Flagship Project

This is one of my proudest achievements! Here's the deep dive:

**❌ The Problem:** A client was losing ₹5L/month to undetected fraudulent transactions. Their existing rule-based system only caught 40% of fraud.

**✅ What I Built:**
- **XGBoost + Neural Network ensemble** with real-time feature engineering
- Processing pipeline handling **1M+ transactions/day**
- Real-time scoring via FastAPI + Redis (<50ms latency)

**📊 Key Results:**
- **96.4% accuracy**, 0.92 F1-score
- Reduced false positives by 35%
- **₹15L saved annually** in prevented fraud losses
- 96.4% of fraud caught in real-time

**🛠️ Tech Stack:** Python, XGBoost, TensorFlow, FastAPI, Redis, Docker

Want to know more about the feature engineering or deployment strategy? 💬`,

  career: `## 🚀 Career Advice from My Journey

From Kupwara, Kashmir to building AI solutions globally — here's what I've learned:

1. **🏗️ Build a Strong Foundation** — Master Python, SQL, and statistics before jumping into frameworks
2. **💪 Learn by Building Real Things** — My fraud detection system taught me more than 100 tutorials combined
3. **🎯 Specialize, Then Generalize** — I started with ML, then expanded to full-stack AI
4. **🚀 Deploy Everything** — A model in a notebook isn't a product. Learn MLOps early
5. **📈 Show Impact with Numbers** — "Reduced processing time by 40%" speaks louder than "used PyTorch"
6. **🌐 Think Global** — AI has no borders. Target international opportunities
7. **📚 Never Stop Learning** — The field evolves weekly. Stay current with papers and open source

The field moves fast — focus on fundamentals, and you'll adapt to any new technology. 💡`,

  skills: `## 💡 My Complete Tech Stack & Expertise

**🤖 AI/ML (Expert):** Python, PyTorch, TensorFlow, Scikit-learn, XGBoost, Hugging Face, LangChain
**🖥️ Backend:** FastAPI, Flask, Node.js, Django
**🎨 Frontend:** React, Next.js, Tailwind CSS, TypeScript
**🗄️ Data:** PostgreSQL, MongoDB, Redis, Elasticsearch, BigQuery
**☁️ Cloud/DevOps:** AWS (SageMaker, EC2, Lambda), GCP, Docker, GitHub Actions, Kubernetes

**🏆 What I'm Best At:**
- End-to-end ML systems (data pipeline → model → deployment)
- Fraud detection & anomaly detection
- NLP pipelines & chatbot development
- Recommendation engines (collaborative + content-based)
- Real-time data processing pipelines

**🔮 Currently Exploring:** Advanced RAG architectures, real-time ML inference optimization, multi-agent AI systems

Want me to dive deeper into any specific area? 💬`,

  about: `## 👋 About Me — Irshad Majeed Mir

🏔️ **From:** Kupwara, Kashmir, India
🎓 **Role:** AI/ML Engineer & Data Scientist
🏢 **Founder:** RuleMatrix — AI Solutions Company
🌐 **Goal:** Making AI accessible and transformative for businesses worldwide

**My Journey:**
I grew up in Kupwara, a small town in Kashmir where resources were limited but dreams weren't. I taught myself data science during my B.Tech, and what started as curiosity became an obsession. I spent countless nights training models, reading research papers, and building real-world systems.

Today, I've built fraud detection systems saving ₹15L/year, recommendation engines boosting conversions by 58%, and ML pipelines processing 1M+ records daily.

I'm currently available for UK & remote roles, and I'm planning to move to the UK to tackle bigger challenges on the global stage. 🚀

Ask me anything about my projects, skills, or how I can help your business! 💬`,

  recommend: `## 🛒 Recommendation Engine Project

One of my proudest achievements:

**❌ Problem:** An e-commerce platform was stuck at 12% conversion — users couldn't find relevant products.

**✅ Solution:** I built a hybrid recommendation engine combining:
- **Collaborative filtering** (user behavior patterns)
- **Content-based filtering** (product similarity via embeddings)
- **Real-time personalization** serving 10K+ recommendations/second

**📊 Result:** **58% increase in conversion rate** — from 12% to 19% 🎉

**🛠️ Tech:** Python, TensorFlow, FastAPI, Redis, Docker

**💡 Key Learning:** Hybrid approaches always outperform single-method systems. Context matters — time of day, user session length, and browsing patterns all improve relevance.

Want to discuss how I can build something similar for your platform? 💬`,

  nlp: `## 🗣️ NLP & Chatbot Projects

I've built several NLP systems:

**1. AI Chatbot for Customer Support** 🤖
- Handles 70%+ of customer queries automatically
- Intent classification with 94% accuracy
- Multi-language support (English, Hindi, Urdu)
- Built with LangChain + custom fine-tuned models

**2. Sentiment Analysis Pipeline** 📊
- Real-time sentiment scoring for social media mentions
- Processes 50K+ posts/day
- Custom BERT fine-tuned for domain-specific language

**3. Document Extraction System** 📄
- Automated information extraction from unstructured documents
- Named Entity Recognition (NER) with 91% accuracy
- Reduced manual processing time by 85%

**🛠️ Tech:** Python, Hugging Face, spaCy, LangChain, FastAPI

Which project interests you most? I can share more technical details! 💬`,

  data: `## 📊 Data Engineering Expertise

I don't just build ML models — I build the entire data infrastructure:

**🏗️ Data Pipelines:**
- Built ETL pipelines processing 1M+ records/day
- Automated data cleaning reduced processing time by 40%
- Real-time streaming with Apache Kafka integration

**🗄️ Database Design:**
- PostgreSQL for structured data (complex queries, indexing)
- MongoDB for flexible document storage
- Redis for caching and real-time features
- Elasticsearch for full-text search

**📊 Data Visualization:**
- Interactive dashboards with real-time metrics
- Automated reporting reducing manual work by 80%
- Custom analytics for business stakeholders

**🛠️ Tools:** Python, Pandas, NumPy, Airflow, dbt, SQL, BigQuery

Need help with your data infrastructure? Let's talk! 💬`,

  deep: `## 🧠 Deep Learning Projects

Beyond traditional ML, I have extensive deep learning experience:

**1. Image Classification System** 📷
- Custom CNN architecture for product categorization
- 97% accuracy on 50K+ product images
- Transfer learning with EfficientNet backbone

**2. Fraud Detection Neural Network** 🔍
- Deep neural network with attention mechanism
- Handles temporal patterns in transaction data
- Ensemble with XGBoost for optimal performance

**3. Text Embedding System** 📝
- Custom sentence embeddings for document similarity
- Fine-tuned Sentence-BERT for domain-specific text
- Used in recommendation engine and search ranking

**4. Time Series Forecasting** 📈
- LSTM-based models for demand prediction
- 92% accuracy on 30-day forecasts
- Automated retraining pipeline

**🛠️ Frameworks:** PyTorch, TensorFlow, Keras, Hugging Face

Which area would you like to explore further? 🚀`,

  startup: `## 🏢 Building RuleMatrix — My AI Startup Journey

From Kupwara, Kashmir to running an AI solutions company — here's the real story:

**💡 The Beginning:**
It started with a simple realization — businesses need AI but don't know how to implement it. I started by solving local problems, then expanded to international clients.

**🚀 What We Do:**
- Custom AI/ML solutions for businesses of all sizes
- Chatbots, fraud detection, recommendation engines, predictive analytics
- Full-stack development from model training to deployment

**📈 Lessons Learned:**
1. Start small, deliver fast, iterate based on feedback
2. Focus on ROI for clients — not just cool technology
3. Build trust through transparency and consistent delivery
4. Every project is a case study for the next one
5. Pricing should reflect value, not just hours worked

**🌍 Vision:** Making AI accessible and transformative for businesses worldwide, no matter their size or location.

Want to know more about running an AI startup or discuss a potential project? 💬`,

  hire: `## 🤝 Let's Work Together!

I'm currently **available** for freelance and full-time opportunities. Here's how we can get started:

**📋 My Services:**
- 🔍 AI/ML Model Development
- 🤖 Chatbot & NLP Solutions
- 📊 Data Engineering & Analytics
- 🛒 Recommendation Engines
- ⚡ Full-Stack AI Applications
- 📈 Predictive Analytics & Forecasting

**💰 Pricing:** Flexible — from ₹50K for chatbots to ₹10L+ for full-stack AI apps. I always start with a free consultation to understand your needs.

**📞 Let's Connect:**
- 💬 WhatsApp: +91 9622334883 (fastest response)
- 📧 Email: irshadmir312@gmail.com
- 📬 Contact form: Scroll down on this page
- 🌐 Portfolio: https://www.irshad.help/

I typically respond within 2 hours on WhatsApp. Let's discuss your project! 🚀`,

  pricing: `## 💰 Pricing & Budget

I offer flexible, transparent pricing based on project scope and complexity:

**📋 Typical Ranges:**
- **🤖 AI Chatbot:** ₹50K - ₹3L (depending on features and complexity)
- **🧠 ML Model Development:** ₹1L - ₹5L (data science & ML pipeline)
- **🖥️ Full-Stack AI App:** ₹2L - ₹10L+ (end-to-end solution)
- **📊 Data Pipeline:** ₹50K - ₹2L (ETL, automation, analytics)
- **💡 AI Consulting:** Hourly or project-based rates

**✅ What I Believe In:**
- Transparent pricing (no hidden costs ever)
- Value-based pricing (you pay for impact, not hours)
- Flexible payment terms (milestone-based)
- Free initial consultation (no strings attached)

**🎯 Next Step:** Tell me about your project and I'll give you an honest estimate within 24 hours. No pressure, no obligation.

Let's discuss your specific requirements! 🤝`,

  tools: `## 🛠️ Tools & Technologies I Use Daily

**💻 Languages:** Python (primary), JavaScript/TypeScript, SQL, Bash, R
**🤖 ML/DL:** Scikit-learn, XGBoost, PyTorch, TensorFlow, Keras, Hugging Face
**🔗 NLP:** spaCy, NLTK, LangChain, Transformers, OpenAI API
**📊 Data:** Pandas, NumPy, Matplotlib, Plotly, Seaborn, Polars
**🌐 Backend:** FastAPI, Flask, Django, Node.js
**🎨 Frontend:** React, Next.js, Tailwind CSS, TypeScript
**🗄️ Databases:** PostgreSQL, MongoDB, Redis, Elasticsearch
**☁️ Cloud:** AWS, GCP, Docker, Kubernetes, GitHub Actions
**🔧 DevOps:** Git, Linux, Nginx, CI/CD, Apache Airflow
**📱 Monitoring:** Prometheus, Grafana, custom dashboards

I choose tools based on what solves the problem best — not what's trendy. The right tool for the right job. 💡`,

  resume: `## 📄 My Experience at a Glance

**🎓 Education:** B.Tech in Computer Science
**💼 Experience:** 2+ years professional AI/ML engineering
**🏢 Founder:** RuleMatrix — AI Solutions Company

**🏆 Key Highlights:**
- 🔍 Fraud detection system: 96.4% accuracy, ₹15L saved/year
- 🛒 Recommendation engine: 58% conversion boost
- 🤖 AI chatbot: Handles 70%+ customer queries automatically
- 📊 ML pipeline: 40% faster processing, 1M+ records/day
- 🌍 15+ projects completed, 10+ clients served
- 📍 Based in Kupwara, Kashmir | Open to UK & remote roles

For a formal CV or detailed resume, reach out via:
- 📧 irshadmir312@gmail.com
- 💬 WhatsApp: +91 9622334883

Or scroll down to the contact section! 💬`,
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase()

  if (lower.includes('interview') || lower.includes('mock') || lower.includes('imbalanced') || lower.includes('smote')) return fallbackResponses.interview
  if (lower.includes('fraud') || lower.includes('anomaly') || lower.includes('detection')) return fallbackResponses.fraud
  if (lower.includes('career') || lower.includes('advice') || lower.includes('tips') || lower.includes('learning path') || lower.includes('how to start') || lower.includes('beginner')) return fallbackResponses.career
  if (lower.includes('skill') || lower.includes('assess') || lower.includes('tech stack') || lower.includes('expertise') || lower.includes('technologies') || lower.includes('tools') || lower.includes('what do you')) return fallbackResponses.skills
  if (lower.includes('about') || lower.includes('who are you') || lower.includes('yourself') || lower.includes('introduce') || lower.includes('background') || lower.includes('story') || lower.includes('tell me about')) return fallbackResponses.about
  if (lower.includes('recommend') || lower.includes('conversion') || lower.includes('ecommerce') || lower.includes('e-commerce') || lower.includes('personalization')) return fallbackResponses.recommend
  if (lower.includes('nlp') || lower.includes('chatbot') || lower.includes('sentiment') || lower.includes('text') || lower.includes('language model') || lower.includes('llm') || lower.includes('transformer')) return fallbackResponses.nlp
  if (lower.includes('data engineer') || lower.includes('pipeline') || lower.includes('etl') || lower.includes('database') || lower.includes('sql') || lower.includes('bigquery') || lower.includes('airflow')) return fallbackResponses.data
  if (lower.includes('deep learning') || lower.includes('neural net') || lower.includes('cnn') || lower.includes('lstm') || lower.includes('pytorch') || lower.includes('image') || lower.includes('vision')) return fallbackResponses.deep
  if (lower.includes('startup') || lower.includes('company') || lower.includes('rulematrix') || lower.includes('business') || lower.includes('founder') || lower.includes('entrepreneur')) return fallbackResponses.startup
  if (lower.includes('hire') || lower.includes('contact') || lower.includes('email') || lower.includes('want to work') || lower.includes('freelance') || lower.includes('project inquiry') || lower.includes('available')) return fallbackResponses.hire
  if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('rate') || lower.includes('charge') || lower.includes('how much') || lower.includes('pricing')) return fallbackResponses.pricing
  if (lower.includes('tool') || lower.includes('framework') || lower.includes('library') || lower.includes('software')) return fallbackResponses.tools
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) return fallbackResponses.resume
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('salam') || lower.includes('assalam') || lower.includes('good morning') || lower.includes('good evening')) return "👋 Hey there! Welcome to my portfolio!\n\nI'm Irshad — an AI/ML Engineer & Data Scientist from Kupwara, Kashmir. I build intelligent systems like fraud detection (96.4% accuracy 🎯), recommendation engines (58% conversion boost), and AI chatbots.\n\nFeel free to ask me about my projects, skills, services, or career advice. I'm here to help! 💬"
  if (lower.includes('thank') || lower.includes('thanks') || lower.includes('appreciate')) return "You're very welcome! 😊🙏\n\nIf you'd like to discuss a project, opportunity, or just want to connect:\n- 📬 Use the contact form on this page\n- 💬 WhatsApp: +91 9622334883\n- 📧 Email: irshadmir312@gmail.com\n\nLooking forward to connecting with you! 🚀"
  if (lower.includes('machine learning') || lower.includes('ml model') || lower.includes('predict') || lower.includes('classification') || lower.includes('regression')) return "## 🤖 Machine Learning Expertise\n\nI've built production ML systems across multiple domains:\n\n**🏆 Key Projects:**\n- **Fraud Detection:** XGBoost + Neural Network ensemble, 96.4% accuracy\n- **Recommendation Engine:** Hybrid system, 58% conversion boost\n- **Churn Prediction:** Random Forest + feature engineering, 89% recall\n- **Price Prediction:** Gradient Boosting, 92% accuracy\n\n**📊 My ML Workflow:**\n1. Problem definition & data exploration\n2. Feature engineering (my strongest skill)\n3. Model selection & hyperparameter tuning\n4. Ensemble methods for production reliability\n5. A/B testing & deployment monitoring\n\nWant technical details on any specific project? 🔬"
  if (lower.includes('project') || lower.includes('portfolio') || lower.includes('work') || lower.includes('built') || lower.includes('what have you')) return "## 🚀 My Key Projects\n\n1. **🔍 Fraud Detection System** — 96.4% accuracy, ₹15L saved/year\n2. **🛒 Recommendation Engine** — 58% increase in conversion rate\n3. **🤖 AI Chatbot** — Handles 70%+ of customer queries\n4. **📊 ML Pipeline** — Processes 1M+ records/day, 40% faster\n5. **📈 Predictive Analytics** — Demand forecasting with 92% accuracy\n6. **🗣️ NLP Pipeline** — Sentiment analysis, 50K+ posts/day\n7. **🏢 RuleMatrix** — My AI solutions company\n\nWhich project would you like to explore in detail? I can share the problem, approach, tech stack, and results! 💡"
  if (lower.includes('python') || lower.includes('programming') || lower.includes('code') || lower.includes('coding')) return "## 🐍 Python — My Primary Language\n\nPython is the backbone of everything I build:\n\n**🛠️ What I Use Python For:**\n- **Machine Learning:** Scikit-learn, XGBoost, LightGBM\n- **Deep Learning:** PyTorch, TensorFlow, Keras\n- **NLP:** spaCy, NLTK, Hugging Face Transformers\n- **Data Manipulation:** Pandas, NumPy, Polars\n- **Web Frameworks:** FastAPI, Flask, Django\n- **Automation:** Selenium, Airflow, scripts\n- **Visualization:** Matplotlib, Plotly, Seaborn\n\nI write clean, PEP-8 compliant, well-documented code. Python is the best language for rapid prototyping AND production deployment. 🚀"
  if (lower.includes('react') || lower.includes('next') || lower.includes('frontend') || lower.includes('web') || lower.includes('website')) return "## 🌐 Full Stack Web Development\n\nI build both AI backends and modern web frontends:\n\n**🎨 Frontend:** React, Next.js, TypeScript, Tailwind CSS\n**🖥️ Backend:** FastAPI, Flask, Django, Node.js\n**🗄️ Databases:** PostgreSQL, MongoDB, Redis\n**☁️ Deployment:** Vercel, AWS, Docker, GitHub Actions\n\nThis portfolio itself is built with Next.js 16 + TypeScript! I believe every AI engineer should be comfortable with full-stack development — it lets you build end-to-end products, not just models.\n\nWant to see my code or discuss a web project? 💻"

  // Default comprehensive response
  return `Great question! 🤔

I'd love to help with that. Here's a quick overview of what I specialize in:

**🏆 Flagship Projects:**
- 🔍 **Fraud detection** — 96.4% accuracy, saving ₹15L/year
- 🛒 **Recommendation engine** — 58% conversion boost
- ⚡ **ML pipeline** — 40% faster processing, 1M+ records/day
- 🤖 **AI Chatbot** — Handles 70%+ of customer queries

**💼 Services I Offer:**
- AI/ML model development
- Full-stack AI applications
- Data engineering & analytics
- NLP & chatbot solutions

Try asking me about a specific topic like "fraud detection", "recommendation engines", "NLP", "data pipelines", "career advice", "my tech stack", or "pricing" and I'll give you a detailed answer! 💬

Or reach me directly:
- 💬 WhatsApp: +91 9622334883
- 📧 irshadmir312@gmail.com`
}

export default function AIChatBot() {
  const {
    chatOpen, setChatOpen,
    chatMessages, addChatMessage, clearChatMessages,
    currentMode, guestUserId,
  } = usePortfolioStore()

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatMessages, isTyping])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    }
    addChatMessage(userMsg)
    setInput('')
    setIsTyping(true)

    try {
      // Try to call the real AI API
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: guestUserId || `guest-${Date.now()}`,
          message: text,
          mode: currentMode,
          history: chatMessages.slice(-20).map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.message || data.error || 'Sorry, I could not process that.',
          timestamp: Date.now(),
        }
        addChatMessage(aiMsg)
      } else {
        throw new Error('API error')
      }
    } catch {
      // Use fallback response with simulated delay
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800))
      const response = getFallbackResponse(text)
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      }
      addChatMessage(aiMsg)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <AnimatePresence>
      {chatOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setChatOpen(false)}
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : 'min(600px, calc(100vh - 120px))',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-xl overflow-hidden glass-strong neon-border flex flex-col ${
              isMinimized ? '' : 'h-[min(600px,calc(100vh-120px))]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">👋 Hey! I&apos;m Irshad&apos;s AI Clone</h3>
                  <p className="text-[10px] text-emerald-400">
                    Ask me anything — projects, skills, career, AI! 🚀
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-7 h-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-7 h-7 text-muted-foreground hover:text-red-400"
                  onClick={clearChatMessages}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-7 h-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setChatOpen(false)}
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="flex flex-col overflow-hidden"
                >
                  {/* Messages */}
                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    {chatMessages.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-6"
                      >
                        <Sparkles className="w-8 h-8 text-emerald-400/50 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground mb-2">
                          👋 I&apos;m Irshad&apos;s AI assistant!
                        </p>
                        <p className="text-xs text-muted-foreground/70 mb-4">
                          Ask me about projects 💼, AI solutions 🤖, skills 💡, career advice 🎯, or anything else!
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {quickActions.map((action) => (
                            <button
                              key={action.label}
                              onClick={() => sendMessage(action.prompt)}
                              className="text-xs p-2.5 rounded-lg glass card-hover text-muted-foreground hover:text-foreground text-left"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {chatMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          msg.role === 'user'
                            ? 'bg-purple-500/20'
                            : 'bg-emerald-500/20'
                        }`}>
                          {msg.role === 'user'
                            ? <User className="w-3.5 h-3.5 text-purple-400" />
                            : <Bot className="w-3.5 h-3.5 text-emerald-400" />
                          }
                        </div>
                        <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-purple-500/10 text-purple-100 border border-purple-500/10'
                            : 'bg-white/5 text-muted-foreground border border-white/5'
                        }`}>
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2"
                      >
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div className="bg-white/5 rounded-lg px-4 py-3 border border-white/5">
                          <div className="flex gap-1">
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"
                            />
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                              className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"
                            />
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                              className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Actions (when few messages exist) */}
                  {chatMessages.length > 0 && chatMessages.length < 3 && (
                    <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
                      {quickActions.slice(0, 4).map((action) => (
                        <button
                          key={action.label}
                          onClick={() => sendMessage(action.prompt)}
                          className="text-[10px] px-2.5 py-1.5 rounded-full glass text-muted-foreground hover:text-emerald-400 whitespace-nowrap transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-3 border-t border-white/5">
                    <form
                      onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
                      className="flex gap-2"
                    >
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything... 💬"
                        className="bg-white/5 border-white/10 text-sm flex-1"
                        disabled={isTyping}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isTyping}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                    <p className="text-[10px] text-muted-foreground/40 mt-1.5 text-center">
                      🤖 Trained on Irshad&apos;s profile • For direct contact, use the form below or WhatsApp
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* Floating Button */}
      {!chatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 neon-glow"
        >
          <MessageSquare className="w-6 h-6 text-black" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center">
            1
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
