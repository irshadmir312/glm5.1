import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ViewMode = 'recruiter' | 'client' | 'student' | 'explorer'

interface Badge {
  id: string
  name: string
  icon: string
  description: string
  unlockedAt?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface PortfolioState {
  // User Mode
  currentMode: ViewMode
  setMode: (mode: ViewMode) => void

  // Guest user ID
  guestUserId: string
  setGuestUserId: (id: string) => void

  // Auth state
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  userName: string
  setUserName: (name: string) => void
  userEmail: string
  setUserEmail: (email: string) => void

  // Gamification
  xp: number
  addXp: (amount: number) => void
  level: number
  badges: Badge[]
  unlockBadge: (badge: Badge) => void
  completedSections: string[]
  completeSection: (section: string) => void

  // AI Chat
  chatOpen: boolean
  setChatOpen: (open: boolean) => void
  chatMessages: ChatMessage[]
  addChatMessage: (message: ChatMessage) => void
  clearChatMessages: () => void

  // Navigation
  activeSection: string
  setActiveSection: (section: string) => void

  // Bookmarks
  bookmarkedProjects: string[]
  toggleBookmark: (projectId: string) => void

  // Memory / Personalization
  visitedSections: string[]
  visitSection: (section: string) => void
  searchHistory: string[]
  addSearch: (query: string) => void
  interests: string[]
  addInterest: (interest: string) => void

  // Quiz
  quizScore: number
  setQuizScore: (score: number) => void

  // Contact form
  contactBudget: string
  setContactBudget: (budget: string) => void
  contactProjectType: string
  setContactProjectType: (type: string) => void
  contactTimeline: string
  setContactTimeline: (timeline: string) => void

  // UI
  showModeSelector: boolean
  setShowModeSelector: (show: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const BADGES: Badge[] = [
  { id: 'explorer', name: 'Explorer', icon: '🧭', description: 'Visited 5 sections' },
  { id: 'ai-challenger', name: 'AI Challenger', icon: '🤖', description: 'Had 10 AI conversations' },
  { id: 'data-analyst', name: 'Data Analyst', icon: '📊', description: 'Completed a quiz' },
  { id: 'full-stack', name: 'Full Stack Fan', icon: '💻', description: 'Viewed all projects' },
  { id: 'networker', name: 'Networker', icon: '🤝', description: 'Submitted a contact request' },
  { id: 'night-owl', name: 'Night Owl', icon: '🦉', description: 'Visited after midnight' },
  { id: 'speed-runner', name: 'Speed Runner', icon: '⚡', description: 'Explored 10 sections in one visit' },
  { id: 'deep-thinker', name: 'Deep Thinker', icon: '🧠', description: 'Spent 5+ minutes on a section' },
]

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      // User Mode
      currentMode: 'explorer',
      setMode: (mode) => {
        set({ currentMode: mode })
        get().addXp(10)
        get().addInterest(mode)
      },

      // Guest user ID
      guestUserId: '',
      setGuestUserId: (id) => set({ guestUserId: id }),

      // Auth state
      isAuthenticated: false,
      setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
      userName: '',
      setUserName: (name) => set({ userName: name }),
      userEmail: '',
      setUserEmail: (email) => set({ userEmail: email }),

      // Gamification
      xp: 0,
      addXp: (amount) => {
        const newXp = get().xp + amount
        const newLevel = Math.floor(newXp / 100) + 1
        set({ xp: newXp, level: newLevel })

        // Check for badge unlocks
        const state = get()
        if (state.visitedSections.length >= 5 && !state.badges.find(b => b.id === 'explorer')) {
          get().unlockBadge(BADGES.find(b => b.id === 'explorer')!)
        }
        if (state.chatMessages.length >= 10 && !state.badges.find(b => b.id === 'ai-challenger')) {
          get().unlockBadge(BADGES.find(b => b.id === 'ai-challenger')!)
        }
      },
      level: 1,
      badges: [],
      unlockBadge: (badge) => {
        const exists = get().badges.find(b => b.id === badge.id)
        if (!exists) {
          set({ badges: [...get().badges, { ...badge, unlockedAt: new Date().toISOString() }] })
          get().addXp(25)
        }
      },
      completedSections: [],
      completeSection: (section) => {
        const exists = get().completedSections.includes(section)
        if (!exists) {
          set({ completedSections: [...get().completedSections, section] })
          get().addXp(20)
        }
      },

      // AI Chat
      chatOpen: false,
      setChatOpen: (open) => set({ chatOpen: open }),
      chatMessages: [],
      addChatMessage: (message) => {
        set({ chatMessages: [...get().chatMessages, message] })
        if (message.role === 'user') {
          get().addXp(2)
        }
      },
      clearChatMessages: () => set({ chatMessages: [] }),

      // Navigation
      activeSection: 'hero',
      setActiveSection: (section) => set({ activeSection: section }),

      // Bookmarks
      bookmarkedProjects: [],
      toggleBookmark: (projectId) => {
        const bookmarks = get().bookmarkedProjects
        if (bookmarks.includes(projectId)) {
          set({ bookmarkedProjects: bookmarks.filter(id => id !== projectId) })
        } else {
          set({ bookmarkedProjects: [...bookmarks, projectId] })
          get().addXp(5)
        }
      },

      // Memory / Personalization
      visitedSections: [],
      visitSection: (section) => {
        const visited = get().visitedSections
        if (!visited.includes(section)) {
          set({ visitedSections: [...visited, section] })
          get().addXp(5)
        }
      },
      searchHistory: [],
      addSearch: (query) => {
        set({ searchHistory: [...get().searchHistory.slice(-19), query] })
      },
      interests: [],
      addInterest: (interest) => {
        const interests = get().interests
        if (!interests.includes(interest)) {
          set({ interests: [...interests, interest] })
        }
      },

      // Quiz
      quizScore: 0,
      setQuizScore: (score) => {
        set({ quizScore: score })
        if (score > 0 && !get().badges.find(b => b.id === 'data-analyst')) {
          get().unlockBadge(BADGES.find(b => b.id === 'data-analyst')!)
        }
      },

      // Contact form
      contactBudget: '',
      setContactBudget: (budget) => set({ contactBudget: budget }),
      contactProjectType: '',
      setContactProjectType: (type) => set({ contactProjectType: type }),
      contactTimeline: '',
      setContactTimeline: (timeline) => set({ contactTimeline: timeline }),

      // UI
      showModeSelector: false,
      setShowModeSelector: (show) => set({ showModeSelector: show }),
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'irshad-portfolio-store',
      partialize: (state) => ({
        currentMode: state.currentMode,
        xp: state.xp,
        level: state.level,
        badges: state.badges,
        completedSections: state.completedSections,
        bookmarkedProjects: state.bookmarkedProjects,
        visitedSections: state.visitedSections,
        interests: state.interests,
        chatMessages: state.chatMessages,
      }),
    }
  )
)

export { BADGES }
