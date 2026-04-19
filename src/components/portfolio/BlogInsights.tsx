'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BookOpen, Clock, ArrowRight, PenLine,
  Sparkles, Mail, Rss, X,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface BlogPost {
  slug: string
  title: string
  readTime: string
  category: string
  categoryColor: string
  categoryBg: string
  excerpt: string
  gradient: string
  date: string
  content: string
}

const blogPosts: BlogPost[] = [
  {
    slug: 'ai-chatbot-70-percent-customer-queries',
    title: 'How I Built an AI Chatbot That Handles 70% of Customer Queries',
    readTime: '5 min read',
    category: 'AI/ML',
    categoryColor: 'text-emerald-400',
    categoryBg: 'bg-emerald-500/10 border-emerald-500/20',
    excerpt: 'A deep dive into building an intelligent chatbot using LLMs, RAG pipelines, and real-time processing...',
    gradient: 'from-emerald-500/20 via-cyan-500/10 to-transparent',
    date: 'Jan 2025',
    content: `## 🤖 The Challenge

Every business faces the same problem: customers ask the same questions hundreds of times. Our client was spending ₹8L/month on a support team that could barely keep up with the volume.

**The goal was simple:** Build an AI chatbot that could handle at least 70% of customer queries automatically, accurately, and in multiple languages.

## 🏗️ Architecture

I designed a multi-layered architecture:

\`\`\`
User Message → Intent Classification → Knowledge Base Search → Response Generation → Delivery
                    ↓                           ↓                      ↓
               (94% accuracy)            (RAG pipeline)         (GPT-based)
\`\`\`

**Key Components:**
1. **Intent Classifier** — Fine-tuned BERT model for 15+ intent categories (94% accuracy)
2. **RAG Pipeline** — Vector database with product docs, FAQs, and policies
3. **Response Generator** — LLM-powered with context-aware generation
4. **Multi-language Support** — English, Hindi, Urdu with automatic detection
5. **Fallback System** — Escalates to human agents when confidence is low

## 📊 The Results

After 3 months of deployment:

- **70%+** of queries handled without human intervention
- **94%** intent classification accuracy
- **40%** reduction in support costs
- **3.2 second** average response time (vs 4 minutes for humans)
- **4.8/5** customer satisfaction rating

## 💡 Key Learnings

1. **Start with intent classification** — don't jump straight to LLMs. A good classifier saves tokens and improves speed.
2. **RAG is essential** — the chatbot needs access to your actual business data, not just general knowledge.
3. **Multi-language isn't optional** — in India, you need at least English + Hindi.
4. **Always have a human fallback** — no chatbot should be 100% automated.
5. **Monitor conversations** — set up dashboards to track sentiment, common issues, and failure patterns.

## 🛠️ Tech Stack

Python, Hugging Face Transformers, LangChain, FastAPI, Pinecone (vector DB), Redis, Docker, React

The chatbot paid for itself within 2 months. If you're thinking about building one for your business, let's talk! 💬`,
  },
  {
    slug: 'fraud-detection-ml-saved-15l-year',
    title: 'Fraud Detection with ML: A Real-World Approach That Saved ₹15L/Year',
    readTime: '8 min read',
    category: 'Data Science',
    categoryColor: 'text-amber-400',
    categoryBg: 'bg-amber-500/10 border-amber-500/20',
    excerpt: 'Building a production-grade fraud detection system using XGBoost ensemble with real-time scoring...',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    date: 'Dec 2024',
    content: `## 🔍 The Problem

A fintech client was losing approximately **₹5 lakh per month** to fraudulent transactions. Their existing rule-based system (if amount > X, flag it) was catching only **40%** of fraudulent activity while generating thousands of false positives.

**The business impact:**
- ₹5L/month in direct fraud losses
- Customer trust erosion
- Manual review team overwhelmed with false positives

## 🧠 My Approach

### 1. Data Exploration & Understanding
First, I analyzed 6 months of transaction data:
- **1.2 million transactions** total
- Only **0.3%** were fraudulent (heavily imbalanced!)
- Multiple fraud patterns: account takeover, synthetic identity, merchant fraud

### 2. Feature Engineering (The Game Changer)
Feature engineering was where I spent 60% of my time. Key features I engineered:
- **Transaction velocity** (transactions per hour/day)
- **Amount deviation** from user's historical average
- **Time-based features** (late-night transactions, weekend patterns)
- **Device fingerprinting** (new device, IP geolocation mismatch)
- **Behavioral patterns** (unusual merchant categories, atypical amounts)
- **Network features** (connected accounts, shared devices)

### 3. Model Building — Ensemble Approach
I built an ensemble of:
- **XGBoost** (primary model) — handles tabular data beautifully
- **Neural Network** (secondary) — captures non-linear interactions
- **Custom threshold** optimized for F1-score (not accuracy)

### 4. Handling Imbalanced Data
With only 0.3% positive class:
- SMOTE + ADASYN for oversampling
- Class-weighted loss functions
- Stratified K-fold cross-validation
- Precision-recall curve optimization

## 📊 Results

| Metric | Before | After |
|--------|--------|-------|
| Fraud Detection Rate | 40% | **96.4%** |
| False Positive Rate | 15% | **5%** |
| Monthly Fraud Loss | ₹5L | **₹1.2L** |
| Annual Savings | — | **₹15L** |
| Response Time | 24 hours | **<50ms** |

## 🚀 Deployment

The model was deployed as a real-time scoring service:
- **FastAPI** for the API layer
- **Redis** for caching and real-time features
- **Docker** for containerized deployment
- Processes **1M+ transactions/day** with <50ms latency

## 💡 Lessons Learned

1. Feature engineering > model selection. Always.
2. Imbalanced data needs special treatment — don't just use accuracy.
3. Real-time deployment changes everything. Think about latency from day one.
4. Business metrics matter more than ML metrics.

This project is my proudest work. If you need fraud detection for your business, let's discuss! 🎯`,
  },
  {
    slug: 'ai-startup-from-kashmir-lessons',
    title: 'How to Build an AI Startup from Kashmir: Lessons & Challenges',
    readTime: '6 min read',
    category: 'Career',
    categoryColor: 'text-purple-400',
    categoryBg: 'bg-purple-500/10 border-purple-500/20',
    excerpt: 'From self-learning ML in a small town to founding an AI solutions company — here\'s what I learned...',
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    date: 'Nov 2024',
    content: `## 🏔️ Starting Point: Kupwara, Kashmir

I grew up in Kupwara, a small town in Kashmir where access to tech resources was limited. No coding bootcamps nearby, no tech meetups, no mentors in AI/ML. But I had something more powerful: internet access and relentless curiosity.

This is the story of how I went from borrowing a laptop to learn Python to founding **RuleMatrix**, an AI solutions company serving international clients.

## 📚 The Self-Learning Phase

**Year 1-2 (B.Tech):** I discovered data science through YouTube and online courses. My routine was:
- Morning: College classes
- Evening: 4-6 hours of self-study (Kaggle, Coursera, research papers)
- Night: Building projects and debugging models

**Key resources that helped:**
- Andrew Ng's Machine Learning course (free on YouTube)
- Kaggle competitions (best practical learning)
- Fast.ai course (top-down approach to deep learning)
- Papers With Code (staying updated with research)

## 🏢 Starting RuleMatrix

**The realization:** Businesses need AI but don't know how to implement it. There's a massive gap between "AI can do X" and actually deploying X in production.

**How I got my first client:**
1. Built 3-4 impressive portfolio projects
2. Shared them on LinkedIn and GitHub
3. Offered a free proof-of-concept to a local business
4. Word of mouth from there

## 💪 Challenges I Faced

1. **No network:** Being from Kashmir meant no tech network. I built mine online through LinkedIn, Twitter, and open source.
2. **Trust deficit:** Clients prefer agencies in metros. I overcame this by over-delivering on first projects.
3. **Payment challenges:** International payments from India can be complicated. Wise and Payoneer helped.
4. **Isolation:** Working alone from a small town can be isolating. Online communities (Discord, Twitter) became my co-workers.
5. **Imposter syndrome:** Every tech person faces this. Building real projects and getting client results was the cure.

## 📈 What Worked

1. **Build in public** — Share your work, even if it's not perfect
2. **Start with local clients** — Build trust, then go international
3. **Specialize in ROI** — Clients don't care about your model, they care about their revenue
4. **Be reliable** — Meeting deadlines matters more than being the cheapest
5. **Keep learning** — The AI field moves weekly. Stay current or become irrelevant.

## 🌍 What's Next

I'm planning to move to the UK to access bigger markets and more challenging projects. The goal is to scale RuleMatrix into a team of AI engineers serving businesses globally.

If you're starting your AI journey from a small town — keep going. The internet has made geography irrelevant for tech careers. 💪`,
  },
  {
    slug: 'handling-imbalanced-data-techniques',
    title: 'Handling Imbalanced Data: Techniques That Actually Work in Production',
    readTime: '7 min read',
    category: 'ML',
    categoryColor: 'text-cyan-400',
    categoryBg: 'bg-cyan-500/10 border-cyan-500/20',
    excerpt: 'Practical approaches for dealing with real-world imbalanced datasets — from SMOTE to cost-sensitive learning...',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    date: 'Oct 2024',
    content: `## ⚖️ The Imbalanced Data Problem

In the real world, most interesting datasets are imbalanced:
- Fraud detection: 0.1-0.5% fraudulent transactions
- Disease diagnosis: 1-5% positive cases
- Churn prediction: 5-10% churners
- Manufacturing defects: 0.01-1% defective items

Using accuracy as your metric on these datasets is **dangerous**. A model that predicts "not fraud" for every transaction will be 99.7% accurate but completely useless.

## 🔧 Techniques That Actually Work

### 1. Resampling Methods

**SMOTE (Synthetic Minority Over-sampling Technique):**
\`\`\`python
from imblearn.over_sampling import SMOTE
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_train, y_train)
\`\`\`

**When to use:** Small to medium datasets where you need more minority samples.

**ADASYN (Adaptive Synthetic Sampling):**
Generates more samples in harder-to-learn regions. Better than SMOTE for complex decision boundaries.

### 2. Class Weighting

Most ML libraries support class weights directly:

\`\`\`python
# XGBoost
model = xgb.XGBClassifier(scale_pos_weight=ratio)

# Scikit-learn
model = RandomForestClassifier(class_weight='balanced')
\`\`\`

**When to use:** Always. It's the simplest technique with consistent improvement.

### 3. Custom Threshold Tuning

Don't use the default 0.5 threshold! Optimize for your business metric:

\`\`\`python
from sklearn.metrics import precision_recall_curve
precision, recall, thresholds = precision_recall_curve(y_test, y_proba)
f1_scores = 2 * (precision * recall) / (precision + recall)
optimal_threshold = thresholds[np.argmax(f1_scores)]
\`\`\`

### 4. Ensemble Methods

Combine multiple models trained with different techniques:
- Model 1: Trained on SMOTE-resampled data
- Model 2: Trained with class weights
- Model 3: Trained on undersampled data

Average their predictions for robust results.

### 5. Evaluation Metrics

**Never use accuracy.** Use:
- **F1-Score** (harmonic mean of precision and recall)
- **AUC-PR** (Area Under Precision-Recall Curve)
- **Cohen's Kappa** (accounts for class imbalance)
- **Business metric** (cost of false positive vs false negative)

## 📊 Real-World Results

In my fraud detection project:
| Technique | Precision | Recall | F1-Score |
|-----------|-----------|--------|----------|
| No balancing | 0.82 | 0.71 | 0.76 |
| SMOTE only | 0.85 | 0.88 | 0.86 |
| Class weights | 0.87 | 0.86 | 0.86 |
| **Full pipeline** | **0.91** | **0.93** | **0.92** |

## 💡 Pro Tips

1. **Combine techniques** — never rely on just one
2. **Stratified splits** — maintain class ratios in train/test
3. **Cross-validation** — use stratified K-fold
4. **Monitor in production** — data distribution shifts over time
5. **Business context matters** — is a false positive or false negative more expensive?

The key insight: imbalanced data isn't a problem to solve once — it's an ongoing challenge that requires continuous monitoring and adjustment. 🎯`,
  },
]

function BlogArticleDialog({ post, open, onClose }: { post: BlogPost | null; open: boolean; onClose: () => void }) {
  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto glass-strong border-white/10 bg-background/95 backdrop-blur-xl p-0">
        <DialogTitle className="sr-only">{post.title}</DialogTitle>
        <DialogDescription className="sr-only">{post.excerpt}</DialogDescription>

        {/* Article Header */}
        <div className={`relative h-40 sm:h-48 bg-gradient-to-br ${post.gradient} overflow-hidden`}>
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute bottom-4 left-6 right-6">
            <Badge variant="outline" className={`text-[10px] ${post.categoryBg} ${post.categoryColor} mb-2`}>
              {post.category}
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
              {post.title}
            </h2>
          </div>
        </div>

        {/* Article Meta */}
        <div className="px-6 pt-4 pb-2 flex items-center gap-4 text-xs text-muted-foreground border-b border-white/5">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
          <span>📅 {post.date}</span>
          <span>✍️ Irshad Majeed Mir</span>
        </div>

        {/* Article Content */}
        <div className="px-6 py-6">
          <div className="prose prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed">
            {post.content.split('\n').map((line, i) => {
              // Handle headers
              if (line.startsWith('## ')) {
                return <h2 key={i} className="text-lg font-bold text-foreground mt-6 mb-3">{line.replace('## ', '')}</h2>
              }
              if (line.startsWith('### ')) {
                return <h3 key={i} className="text-base font-semibold text-foreground mt-5 mb-2">{line.replace('### ', '')}</h3>
              }
              // Handle code blocks
              if (line.startsWith('```')) {
                return null
              }
              if (line.startsWith('| ')) {
                return (
                  <div key={i} className="overflow-x-auto my-3">
                    <pre className="text-xs bg-white/5 p-3 rounded-lg font-mono text-emerald-300/80">
                      {line}
                    </pre>
                  </div>
                )
              }
              // Handle list items
              if (line.startsWith('- ')) {
                return <p key={i} className="ml-4 mb-1">• {line.replace('- ', '')}</p>
              }
              if (/^\d+\./.test(line)) {
                return <p key={i} className="ml-4 mb-1">{line}</p>
              }
              // Handle code inline
              const parts = line.split(/`([^`]+)`/)
              if (parts.length > 1) {
                return (
                  <p key={i} className="mb-3">
                    {parts.map((part, j) =>
                      j % 2 === 1
                        ? <code key={j} className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono">{part}</code>
                        : part
                    )}
                  </p>
                )
              }
              // Skip empty lines
              if (!line.trim()) return <div key={i} className="h-2" />
              // Regular paragraph
              return <p key={i} className="mb-3">{line}</p>
            })}
          </div>

          {/* Article Footer */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-sm text-muted-foreground mb-4">
              💡 Enjoyed this article? Let&apos;s connect and discuss AI, ML, and building real-world systems!
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/919622334883?text=Hi%20Irshad!%20I%20read%20your%20blog%20post%20and%20wanted%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="gap-2 bg-emerald-500 hover:bg-emerald-400 text-black">
                  💬 Discuss on WhatsApp
                </Button>
              </a>
              <Button size="sm" variant="outline" className="border-white/10" onClick={onClose}>
                ← Back to Blog
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function BlogInsights() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openArticle = (post: BlogPost) => {
    setSelectedPost(post)
    setDialogOpen(true)
  }

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
              ✍️ Insights
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Blog &amp; <span className="neon-text text-emerald-400">Insights</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            📝 Sharing lessons from the trenches of AI/ML engineering, startup building, and career growth.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
            >
              <Card
                className="glass card-hover group h-full overflow-hidden cursor-pointer"
                onClick={() => openArticle(post)}
              >
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
                  {/* Read time & date */}
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                    <span>📅 {post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-foreground mb-3 leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read More - Clickable */}
                  <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-2.5 transition-all">
                    <span>Read More →</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
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
              📬 More insights coming soon...
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Stay tuned! I write about AI, ML, startups, and career growth. Subscribe to get notified when new posts drop.
            </p>

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
              No spam. Unsubscribe anytime. Just good content. 🤝
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Blog Article Dialog */}
      <BlogArticleDialog
        post={selectedPost}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </section>
  )
}
