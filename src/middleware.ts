import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isHomePage = request.nextUrl.pathname === '/'

  // If user is logged in and tries to access auth pages or home, redirect to bookings
  if (token && (isAuthPage || isHomePage)) {
    return NextResponse.redirect(new URL('/bookings', request.url))
  }

  // If user is not logged in and tries to access protected pages
  if (!token && request.nextUrl.pathname.startsWith('/bookings')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/auth/:path*', '/bookings/:path*']
} 