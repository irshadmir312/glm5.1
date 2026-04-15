import { NextRequest, NextResponse } from 'next/server'

// GET /api/user?id=xxx — get user profile (no DB, return mock/defaults)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      )
    }

    // Return a default user profile — client-side Zustand store manages the real state
    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: null,
        name: 'Explorer',
        image: null,
        mode: 'explorer',
        xp: 0,
        level: 1,
        badges: [],
        isGuest: true,
        createdAt: new Date().toISOString(),
        stats: {
          totalMessages: 0,
          totalInteractions: 0,
          totalBookmarks: 0,
          totalQuizAttempts: 0,
          totalContactRequests: 0,
          sectionsVisited: 0,
          latestQuizScore: null,
        },
      },
    })
  } catch (error) {
    console.error('User GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}

// PUT /api/user — update user profile (no DB, client handles this)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()

    // Just acknowledge — client-side Zustand store handles the actual update
    return NextResponse.json({
      success: true,
      message: 'Profile updated (client-side)',
    })
  } catch (error) {
    console.error('User PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
}
