'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, GitCommit, TrendingUp, Award } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

function AnimatedNumber({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2500
    const steps = 80
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const skillsData = [
  { skill: 'Python', value: 95 },
  { skill: 'ML/DL', value: 92 },
  { skill: 'NLP', value: 88 },
  { skill: 'SQL', value: 90 },
  { skill: 'React', value: 82 },
  { skill: 'Cloud', value: 78 },
]

const radarData = [
  { subject: 'ML/AI', value: 95 },
  { subject: 'Python', value: 92 },
  { subject: 'Data Eng', value: 85 },
  { subject: 'Frontend', value: 78 },
  { subject: 'Backend', value: 88 },
  { subject: 'DevOps', value: 75 },
]

const commitData = [
  { day: 'Mon', commits: 12 },
  { day: 'Tue', commits: 8 },
  { day: 'Wed', commits: 15 },
  { day: 'Thu', commits: 6 },
  { day: 'Fri', commits: 18 },
  { day: 'Sat', commits: 9 },
  { day: 'Sun', commits: 4 },
]

const heatmapData = Array.from({ length: 52 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => ({
    week,
    day,
    count: Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0,
  }))
).flat()

const getHeatColor = (count: number) => {
  if (count === 0) return 'bg-white/5'
  if (count === 1) return 'bg-emerald-500/20'
  if (count === 2) return 'bg-emerald-500/40'
  if (count === 3) return 'bg-emerald-500/60'
  return 'bg-emerald-500/80'
}

const stats = [
  { icon: Users, label: 'Portfolio Visitors', value: 2847, color: 'text-emerald-400' },
  { icon: GitCommit, label: 'GitHub Commits', value: 1847, color: 'text-cyan-400' },
  { icon: TrendingUp, label: 'Projects Completed', value: 15, color: 'text-purple-400' },
  { icon: Award, label: 'Certifications', value: 6, color: 'text-amber-400' },
]

export default function LiveDashboard() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Live <span className="neon-text text-emerald-400">Dashboard</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics and analytics showcasing activity and impact.
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Card className="glass p-4 sm:p-5">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-xl sm:text-2xl font-bold font-mono">
                  <AnimatedNumber target={stat.value} />
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Contribution Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">GitHub Contributions</h3>
                <Badge variant="outline" className="text-[10px] border-white/10 text-muted-foreground">
                  Last 52 weeks
                </Badge>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <div className="flex gap-[3px] min-w-[600px]">
                  {Array.from({ length: 52 }, (_, week) => (
                    <div key={week} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }, (_, day) => {
                        const cell = heatmapData.find(h => h.week === week && h.day === day)
                        return (
                          <motion.div
                            key={day}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: week * 0.01 + day * 0.005, duration: 0.1 }}
                            className={`w-[10px] h-[10px] rounded-[2px] ${getHeatColor(cell?.count || 0)}`}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 justify-end">
                <span className="text-[10px] text-muted-foreground">Less</span>
                {['bg-white/5', 'bg-emerald-500/20', 'bg-emerald-500/40', 'bg-emerald-500/60', 'bg-emerald-500/80'].map((color, i) => (
                  <div key={i} className={`w-3 h-3 rounded-[2px] ${color}`} />
                ))}
                <span className="text-[10px] text-muted-foreground">More</span>
              </div>
            </Card>
          </motion.div>

          {/* Skills Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Skills Radar</h3>
                <Badge variant="outline" className="text-[10px] border-white/10 text-muted-foreground">
                  Proficiency
                </Badge>
              </div>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }}
                      axisLine={false}
                    />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="#00ff88"
                      fill="#00ff88"
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Weekly Commits Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="glass p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Weekly Activity</h3>
                <Badge variant="outline" className="text-[10px] border-white/10 text-muted-foreground">
                  This week
                </Badge>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={commitData}>
                    <XAxis
                      dataKey="day"
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 15, 25, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="commits" fill="#00ff88" radius={[4, 4, 0, 0]} opacity={0.6} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
