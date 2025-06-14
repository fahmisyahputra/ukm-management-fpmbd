import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Izinkan akses ke halaman login dan Next internal
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  // Kalau belum login, redirect ke /login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Proteksi halaman per role
  if (pathname.startsWith('/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (pathname.startsWith('/manager') && token.role !== 'clubManager') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (pathname.startsWith('/student') && token.role !== 'student') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// ✅ Untuk Next.js 13+ (termasuk 15.3), matcher cukup ditaruh di sini
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth|login).*)',
  ],
};
