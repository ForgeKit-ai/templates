import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // You can add additional health checks here
    // e.g., database connectivity, external services, etc.
    
    return NextResponse.json(
      { 
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Health check failed'
      },
      { status: 500 }
    )
  }
}