import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
console.log('Middleware executed')
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  //Removed login redirect as per update instructions.
  // if (!user) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  console.log('Middleware executed')
  console.log('User:', user)

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single()

  if (profile?.role !== 'creator') {
    // Updated redirect URL to include the full path as per update instructions.
    return NextResponse.redirect(new URL('/create?showModal=true', request.url))
  }

  if (error) {
    console.error(error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/create'],
}

