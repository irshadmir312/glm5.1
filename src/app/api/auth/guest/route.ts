import { NextRequest, NextResponse } from 'next/server'

// POST /api/auth/guest — create guest user (no DB, return mock guest)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name } = body
    const guestName = name || `Explorer_${Math.random().toString(36).substring(2, 8)}`
    const guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`

    return NextResponse.json({
      success: true,
      user: {
        id: guestId,
        name: guestName,
        email: null,
        isGuest: true,
        mode: 'explorer',
        xp: 0,
        level: 1,
        badges: [],
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Guest auth error:', error)
    return NextResponse.json(
      { error: 'Failed to create guest user' },
      { status: 500 }
    )
  }
}
