import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./utils/supabase/middleware";

// middleware.ts
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

    // Type-safe path checking
    const publicPaths = ['/', '/discover', '/about', '/sign-in', '/sign-up', '/forgot-password', '/reset/email', 'auth/callback'];
    const isPublicPath = publicPaths.includes(path);
    const isPostPath = /^\/post\/[^\/]+$/.test(path);

  const { supabase, response } = createClient(req);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublicPath && !isPostPath) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  return response;
}
  




export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}