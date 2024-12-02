import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  
  try {
    // Log session check
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    console.log('Session:', session?.user?.id)
    
    if (sessionError) {
      console.error('Session error:', sessionError)
      return new Response('Auth error', { status: 500 })
    }
  
    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Log profile query
    console.log('Fetching profile for user:', session.user.id)
    
    // Fetch profile with error handling
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, username, full_name, bio, website')  // Explicitly list columns
      .eq('id', session.user.id)
      .single()

    // Log profile result
    console.log('Profile query result:', { profile, profileError })

    if (profileError) {
      console.error('Profile fetch error:', profileError)
      return new Response(JSON.stringify({ error: profileError }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  
    if (!profile) {
      return new Response('Profile not found', { status: 404 })
    }
  
    return Response.json(profile)
      
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(JSON.stringify({ error }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}