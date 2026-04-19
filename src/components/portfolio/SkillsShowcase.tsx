'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Code2, Brain, Database, Cloud, Wrench, Layers,
  ChevronDown, ChevronUp,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Skill {
  name: string
  proficiency: number
  color: string
}

interface SkillCategory {
  name: string
  icon: typeof Code2
  color: string
  bgColor: string
  skills: Skill[]
}

const categories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: Code2,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    skills: [
      { name: 'Python', proficiency: 95, color: 'bg-emerald-400' },
      { name: 'JavaScript/TS', proficiency: 85, color: 'bg-amber-400' },
      { name: 'SQL', proficiency: 90, color: 'bg-cyan-400' },
      { name: 'Bash/Shell', proficiency: 75, color: 'bg-purple-400' },
      { name: 'R', proficiency: 65, color: 'bg-pink-400' },
    ],
  },
  {
    name: 'AI / ML',
    icon: Brain,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/5',
    skills: [
      { name: 'Machine Learning', proficiency: 95, color: 'bg-cyan-400' },
      { name: 'Deep Learning', proficiency: 90, color: 'bg-emerald-400' },
      { name: 'NLP', proficiency: 88, color: 'bg-purple-400' },
      { name: 'Computer Vision', proficiency: 80, color: 'bg-pink-400' },
      { name: 'LLMs/RAG', proficiency: 85, color: 'bg-amber-400' },
    ],
  },
  {
    name: 'Data',
    icon: Database,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/5',
    skills: [
      { name: 'Pandas/NumPy', proficiency: 95, color: 'bg-purple-400' },
      { name: 'Data Visualization', proficiency: 88, color: 'bg-cyan-400' },
      { name: 'ETL Pipelines', proficiency: 85, color: 'bg-emerald-400' },
      { name: 'Feature Engineering', proficiency: 90, color: 'bg-amber-400' },
      { name: 'Statistical Analysis', proficiency: 82, color: 'bg-pink-400' },
    ],
  },
  {
    name: 'Frameworks',
    icon: Layers,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/5',
    skills: [
      { name: 'React/Next.js', proficiency: 82, color: 'bg-amber-400' },
      { name: 'FastAPI/Flask', proficiency: 90, color: 'bg-emerald-400' },
      { name: 'TensorFlow/PyTorch', proficiency: 92, color: 'bg-cyan-400' },
      { name: 'LangChain', proficiency: 80, color: 'bg-purple-400' },
      { name: 'Scikit-learn', proficiency: 93, color: 'bg-pink-400' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/5',
    skills: [
      { name: 'AWS', proficiency: 80, color: 'bg-amber-400' },
      { name: 'GCP', proficiency: 75, color: 'bg-cyan-400' },
      { name: 'Docker', proficiency: 85, color: 'bg-emerald-400' },
      { name: 'CI/CD', proficiency: 78, color: 'bg-purple-400' },
      { name: 'Kubernetes', proficiency: 65, color: 'bg-pink-400' },
    ],
  },
  {
    name: 'Tools',
    icon: Wrench,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    skills: [
      { name: 'Git/GitHub', proficiency: 92, color: 'bg-emerald-400' },
      { name: 'PostgreSQL', proficiency: 85, color: 'bg-cyan-400' },
      { name: 'MongoDB', proficiency: 78, color: 'bg-purple-400' },
      { name: 'Redis', proficiency: 75, color: 'bg-amber-400' },
      { name: 'Linux', proficiency: 80, color: 'bg-pink-400' },
    ],
  },
]

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div ref={ref} className="group cursor-default">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {skill.name}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {skill.proficiency}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
              transition={{ duration: 1, delay, ease: 'easeOut' }}
              className={`h-full rounded-full ${skill.color}`}
            />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{skill.name}: {skill.proficiency}% proficiency</p>
      </TooltipContent>
    </Tooltip>
  )
}

function CategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const [expanded, setExpanded] = useState(true)
  const Icon = category.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Card className="glass card-hover overflow-hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between p-5 text-left"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${category.color}`} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.skills.length} skills</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex gap-1">
              {category.skills.slice(0, 3).map((s) => (
                <Badge key={s.name} variant="secondary" className="text-[9px] bg-white/5 text-muted-foreground">
                  {s.name}
                </Badge>
              ))}
              {category.skills.length > 3 && (
                <Badge variant="secondary" className="text-[9px] bg-white/5 text-muted-foreground">
                  +{category.skills.length - 3}
                </Badge>
              )}
            </div>
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </button>

        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4"
          >
            {category.skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} delay={i * 0.1} />
            ))}
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}

export default function SkillsShowcase() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0)
  const avgProficiency = Math.round(
    categories.reduce((sum, c) => sum + c.skills.reduce((s, sk) => s + sk.proficiency, 0), 0) / totalSkills
  )

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Skills <span className="neon-text text-emerald-400">Showcase</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {totalSkills} skills across {categories.length} categories with an average proficiency of {avgProficiency}%.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((category, i) => (
            <CategoryCard key={category.name} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
