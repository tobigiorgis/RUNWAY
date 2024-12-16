import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  console.log('Middleware executed')
  
  try {
    // const supabase = createClient()
    const { supabase } = createClient(request);

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)

    if (error) {
      console.error(error)
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (profile?.[0]?.role == 'user') {
      return NextResponse.redirect(new URL('/create?showModal=true', request.url))
    }

    return NextResponse.next()
    
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}



