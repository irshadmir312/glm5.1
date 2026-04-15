import { NextRequest, NextResponse } from 'next/server'

// POST /api/visitor — track visitor (no DB, just acknowledge)
export async function POST(req: NextRequest) {
  try {
    // Just acknowledge the visit — client-side handles display
    return NextResponse.json({
      success: true,
      message: 'Visitor tracked',
    })
  } catch (error) {
    console.error('Visitor POST error:', error)
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    )
  }
}

// GET /api/visitor — return mock visitor stats
export async function GET() {
  try {
    // Return mock stats for display
    const now = new Date()
    const hourOfDay = now.getHours()

    // Generate somewhat realistic mock data
    return NextResponse.json({
      totalToday: 12 + Math.floor(hourOfDay / 3),
      totalAllTime: 1847,
      uniqueVisitorsToday: 8 + Math.floor(hourOfDay / 4),
      uniqueVisitorsAllTime: 1203,
      topPaths: [
        { path: '/', visits: 952 },
        { path: '/#projects', visits: 345 },
        { path: '/#skills', visits: 287 },
        { path: '/#about', visits: 198 },
        { path: '/#contact', visits: 165 },
      ],
      topReferrers: [
        { referrer: 'linkedin.com', visits: 342 },
        { referrer: 'github.com', visits: 234 },
        { referrer: 'google.com', visits: 189 },
        { referrer: 'twitter.com', visits: 98 },
        { referrer: 'direct', visits: 984 },
      ],
    })
  } catch (error) {
    console.error('Visitor GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch visitor stats' },
      { status: 500 }
    )
  }
}
