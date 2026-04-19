'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { usePortfolioStore } from '@/store/portfolio'

interface Question {
  id: number
  topic: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    topic: '🐍 Python',
    question: 'What does the "self" parameter refer to in a Python class method?',
    options: ['The class itself', 'The current instance of the class', 'The parent class', 'A global variable'],
    correct: 1,
    explanation: '"self" refers to the current instance of the class, allowing access to instance attributes and methods within the class.',
  },
  {
    id: 2,
    topic: '🤖 Machine Learning',
    question: 'Which algorithm is used for both classification and regression tasks?',
    options: ['Naive Bayes', 'Random Forest', 'Linear Regression', 'K-Means'],
    correct: 1,
    explanation: 'Random Forest can be used for both classification (Random Forest Classifier) and regression (Random Forest Regressor) tasks.',
  },
  {
    id: 3,
    topic: '🧠 Deep Learning',
    question: 'What is the purpose of dropout in a neural network?',
    options: ['Increase model size', 'Prevent overfitting', 'Speed up training', 'Normalize data'],
    correct: 1,
    explanation: 'Dropout randomly deactivates neurons during training to prevent overfitting by reducing co-dependency between neurons.',
  },
  {
    id: 4,
    topic: '🗄️ SQL',
    question: 'Which SQL clause is used to filter aggregated results?',
    options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
    correct: 1,
    explanation: 'HAVING is used to filter results after GROUP BY aggregation, while WHERE filters rows before aggregation.',
  },
  {
    id: 5,
    topic: '📊 Data Engineering',
    question: 'What is the primary benefit of data partitioning in distributed systems?',
    options: ['Better compression', 'Parallel processing & faster queries', 'Data encryption', 'Schema validation'],
    correct: 1,
    explanation: 'Data partitioning divides large datasets into smaller chunks, enabling parallel processing across cluster nodes for faster queries.',
  },
  {
    id: 6,
    topic: '🤖 Machine Learning',
    question: 'What does the confusion matrix element "False Positive" represent?',
    options: ['Correctly predicted positive', 'Incorrectly predicted positive', 'Correctly predicted negative', 'Incorrectly predicted negative'],
    correct: 1,
    explanation: 'A False Positive occurs when the model incorrectly predicts a positive outcome for an actual negative case.',
  },
  {
    id: 7,
    topic: '🧠 Deep Learning',
    question: 'Which activation function is most commonly used in hidden layers of modern neural networks?',
    options: ['Sigmoid', 'ReLU', 'Tanh', 'Softmax'],
    correct: 1,
    explanation: 'ReLU (Rectified Linear Unit) is the default choice for hidden layers due to its simplicity and effectiveness in mitigating vanishing gradients.',
  },
  {
    id: 8,
    topic: '🐍 Python',
    question: 'What is the time complexity of dictionary lookups in Python?',
    options: ['O(n)', 'O(log n)', 'O(1) average', 'O(n log n)'],
    correct: 2,
    explanation: 'Python dictionaries use hash tables, providing O(1) average-case time complexity for lookups, insertions, and deletions.',
  },
]

const topicColors: Record<string, string> = {
  '🐍 Python': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  '🤖 Machine Learning': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  '🧠 Deep Learning': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  '🗄️ SQL': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  '📊 Data Engineering': 'text-pink-400 bg-pink-500/10 border-pink-500/20',
}

export default function SkillTesting() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizStarted, setQuizStarted] = useState(false)

  const { setQuizScore, addXp } = usePortfolioStore()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    const isCorrect = answerIndex === questions[currentQuestion].correct
    setAnswers((prev) => [...prev, answerIndex])
    if (isCorrect) setScore((s) => s + 1)
  }

  // Timer
  const handleAnswerRef = useRef(handleAnswer)
  useEffect(() => {
    handleAnswerRef.current = handleAnswer
  })

  useEffect(() => {
    if (!quizStarted || quizComplete || showExplanation) return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setTimeout(() => handleAnswerRef.current(-1), 0)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [quizStarted, quizComplete, showExplanation])

  const nextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      const finalScore = Math.round(((score) / questions.length) * 100)
      setQuizScore(finalScore)
      addXp(finalScore)
      setQuizComplete(true)
    } else {
      setCurrentQuestion((q) => q + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setTimeLeft(30)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizComplete(false)
    setScore(0)
    setAnswers([])
    setTimeLeft(30)
    setQuizStarted(true)
  }

  const q = questions[currentQuestion]
  const progressPercent = ((currentQuestion + (showExplanation ? 1 : 0)) / questions.length) * 100

  return (
    <section id="skills" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            🧠 Skill <span className="neon-text text-emerald-400">Quiz</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test your AI/ML knowledge with 8 questions across Python, ML, Deep Learning, SQL, and Data Engineering! 🎯
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!quizStarted ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="glass neon-border p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">🚀 Ready to Test Your Skills?</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  8 questions • 30 seconds each • Multiple topics
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {['🐍 Python', '🤖 Machine Learning', '🧠 Deep Learning', '🗄️ SQL', '📊 Data Engineering'].map((topic) => (
                    <Badge key={topic} variant="outline" className={topicColors[topic]}>
                      {topic}
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={() => setQuizStarted(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black gap-2"
                  size="lg"
                >
                  Start Quiz 🎯
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            </motion.div>
          ) : quizComplete ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="glass neon-border p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center mx-auto mb-4"
                >
                  <Trophy className="w-10 h-10 text-amber-400" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">🎉 Quiz Complete!</h3>
                <div className="text-5xl font-bold text-emerald-400 mb-2">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <p className="text-muted-foreground mb-6">
                  You got {score} out of {questions.length} questions correct ✅
                </p>
                <div className="space-y-2 mb-6">
                  {questions.map((question, i) => {
                    const isCorrect = answers[i] === question.correct
                    return (
                      <div key={question.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 text-sm">
                        {isCorrect
                          ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          : <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        }
                        <span className="text-muted-foreground truncate">{question.question}</span>
                      </div>
                    )
                  })}
                </div>
                <Button onClick={resetQuiz} className="bg-emerald-500 hover:bg-emerald-400 text-black gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Try Again 🔄
                </Button>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key={`q-${currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress bar only - no numbering */}
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className={topicColors[q.topic]}>
                  {q.topic}
                </Badge>
              </div>
              <Progress value={progressPercent} className="h-2 mb-5 [&>div]:bg-emerald-400" />

              {/* Timer */}
              <div className="flex items-center gap-2 mb-4">
                <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-muted-foreground'}`} />
                <span className={`text-sm font-mono ${timeLeft <= 10 ? 'text-red-400' : 'text-muted-foreground'}`}>
                  ⏱️ {timeLeft}s
                </span>
                <div className="flex-1" />
                <span className="text-sm text-emerald-400 font-mono">⭐ Score: {score}</span>
              </div>

              <Card className="glass p-6 mb-6">
                <h3 className="text-lg font-semibold mb-6">{q.question}</h3>

                <div className="space-y-3">
                  {q.options.map((option, i) => {
                    const isCorrect = i === q.correct
                    const isSelected = i === selectedAnswer
                    let borderColor = 'border-white/10 hover:border-white/20'
                    let bgColor = ''

                    if (showExplanation) {
                      if (isCorrect) {
                        borderColor = 'border-emerald-500/50'
                        bgColor = 'bg-emerald-500/5'
                      } else if (isSelected && !isCorrect) {
                        borderColor = 'border-red-500/50'
                        bgColor = 'bg-red-500/5'
                      }
                    } else if (isSelected) {
                      borderColor = 'border-emerald-500/30'
                      bgColor = 'bg-emerald-500/5'
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={showExplanation}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${borderColor} ${bgColor} ${
                          showExplanation ? 'cursor-default' : 'cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-mono shrink-0 ${
                            showExplanation && isCorrect ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                            : showExplanation && isSelected && !isCorrect ? 'border-red-500/50 bg-red-500/10 text-red-400'
                            : 'border-white/20 text-muted-foreground'
                          }`}>
                            {showExplanation && isCorrect ? <CheckCircle className="w-4 h-4" />
                              : showExplanation && isSelected && !isCorrect ? <XCircle className="w-4 h-4" />
                              : String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-sm">{option}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </Card>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <div className={`p-4 rounded-lg ${
                      selectedAnswer === q.correct
                        ? 'bg-emerald-500/5 border border-emerald-500/20'
                        : 'bg-amber-500/5 border border-amber-500/20'
                    }`}>
                      <p className={`text-sm font-medium mb-1 ${
                        selectedAnswer === q.correct ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {selectedAnswer === q.correct ? '✅ Correct!' : '💡 Not quite!'}
                      </p>
                      <p className="text-sm text-muted-foreground">{q.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {showExplanation && (
                <Button onClick={nextQuestion} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black gap-2">
                  {currentQuestion + 1 >= questions.length ? '🏆 See Results' : '➡️ Next Question'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
