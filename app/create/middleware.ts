import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';


export async function middleware(request: NextRequest) {
  // Create a response object
  const response = NextResponse.next();

  // Create a Supabase client with the request and response
  const supabase = createClient()

  // Get the user session
  const { data: { user } } = await supabase.auth.getUser()

  // If a session exists, check the user's role
  if (user) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user?.id)
      .single();

    // If there is an error or the user role is 'user', redirect to the /apply page
    if (error || profile?.role === 'user') {
      return NextResponse.redirect(new URL('/apply', request.url));
    }
  }

  // Allow the request to proceed
  return response;
}

// Configure the middleware matcher
export const config = {
  matcher: '/create',
};