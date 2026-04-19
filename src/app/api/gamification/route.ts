import { NextRequest, NextResponse } from 'next/server'

function getXPForAction(section: string, action: string): number {
  const xpMap: Record<string, Record<string, number>> = {
    hero: { view: 5, interact: 10 },
    projects: { view: 5, click: 10, bookmark: 15 },
    journey: { view: 5, interact: 10 },
    skills: { view: 5, interact: 10 },
    contact: { view: 5, submit: 20 },
    'ai-chat': { message: 2, view: 5 },
    quiz: { start: 5, complete: 20 },
    default: { view: 3, click: 5, interact: 8, complete: 15 },
  }

  return xpMap[section]?.[action] ?? xpMap.default[action] ?? 3
}

// POST /api/gamification — track interaction (no DB, return XP info for client-side tracking)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { section, action } = body

    if (!section || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: section, action' },
        { status: 400 }
      )
    }

    const xpAmount = getXPForAction(section, action)

    // Return XP info — the client-side Zustand store handles actual tracking
    return NextResponse.json({
      success: true,
      xpEarned: xpAmount,
      message: 'XP tracked client-side',
    })
  } catch (error) {
    console.error('Gamification POST error:', error)
    return NextResponse.json(
      { error: 'Failed to track interaction' },
      { status: 500 }
    )
  }
}

// GET /api/gamification — return mock leaderboard
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const endpoint = searchParams.get('endpoint')

    if (endpoint === 'leaderboard') {
      // Return mock leaderboard data for display
      return NextResponse.json({
        leaderboard: [
          { rank: 1, id: 'demo-1', name: 'Irshad Majeed Mir', xp: 2850, level: 29, badges: ['first-visit', 'quiz-master', 'ai-chatter'], isGuest: false },
          { rank: 2, id: 'demo-2', name: 'Anonymous Explorer', xp: 450, level: 5, badges: ['first-visit'], isGuest: true },
          { rank: 3, id: 'demo-3', name: 'Curious Visitor', xp: 320, level: 4, badges: ['first-visit', 'ai-chatter'], isGuest: true },
          { rank: 4, id: 'demo-4', name: 'Tech Enthusiast', xp: 180, level: 2, badges: ['first-visit'], isGuest: true },
          { rank: 5, id: 'demo-5', name: 'Data Science Fan', xp: 150, level: 2, badges: ['first-visit'], isGuest: true },
        ],
        totalParticipants: 42,
      })
    }

    return NextResponse.json({
      message: 'Gamification API. Use POST to track interactions, GET?endpoint=leaderboard for leaderboard.',
    })
  } catch (error) {
    console.error('Gamification GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gamification data' },
      { status: 500 }
    )
  }
}

// PUT /api/gamification — add XP or badge (no DB, client handles this)
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const action = searchParams.get('action')

    if (action === 'xp') {
      const body = await req.json()
      const { amount } = body
      return NextResponse.json({
        success: true,
        xpEarned: amount || 5,
        message: 'XP tracked client-side',
      })
    }

    if (action === 'badge') {
      const body = await req.json()
      const { badgeId } = body
      return NextResponse.json({
        success: true,
        badgeId,
        xpEarned: 25,
        message: 'Badge tracked client-side',
      })
    }

    return NextResponse.json(
      { error: 'Invalid action. Use ?action=xp or ?action=badge' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Gamification PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to process gamification request' },
      { status: 500 }
    )
  }
}
