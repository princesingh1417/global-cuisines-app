import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define strictly protected paths
  const isProtectedPath = path.startsWith('/explore') || path.startsWith('/recipe');

  // Define public auth paths
  const isPublicAuthPath = path === '/login' || path === '/signup' || path === '/forgot-password' || path === '/resetpassword';

  // Extract the token cookie safely
  const token = request.cookies.get('token')?.value || '';

  // 1. If trying to access protected content without a token -> Redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // 2. If logged in and trying to access login/signup -> Redirect straight to explore
  if (isPublicAuthPath && token) {
    return NextResponse.redirect(new URL('/explore', request.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/explore/:path*',
    '/recipe/:path*',
    '/login',
    '/signup',
    '/forgot-password',
    '/resetpassword'
  ]
};
