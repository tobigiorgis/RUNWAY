import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const path = req.nextUrl.pathname;

  const { data: {
    session
  }, error } = await supabase
    .auth
    .getSession()
  
    // post/[id] was deleted -> it needs user id
    if (!session && !['/', '/discover', '/about', '/login', '/signup', '/reset', '/reset/email'].includes(path) && !/^\/post\/[^\/]+$/.test(path)) {
      return NextResponse.rewrite(new URL('/signup', req.url));
    }

  console.log(session);
  
  
  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}