import { NextResponse } from 'next/server'

export async function POST() {
  // Stub authentication - always return success
  return NextResponse.json({ success: true })
}