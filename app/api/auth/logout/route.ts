import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = cookies()
  
  // Clear auth cookies
  cookieStore.delete('profile')
  cookieStore.delete('user')
  
  return NextResponse.json({ success: true })
}