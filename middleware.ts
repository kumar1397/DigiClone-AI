// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// ✅ Use JWT_SECRET safely — no NEXT_PUBLIC prefix
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// 🔐 Helper to verify JWT
async function verifyToken(token: string) {
  try {
    const decoded = await jwtVerify(token, SECRET);
    console.log("✅ Token is valid. Payload:", decoded.payload);
    return true;
  } catch (err: any) {
    console.log("❌ Token verification failed:", err.message);
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("🔍 Middleware triggered for path:", pathname);

  const token = req.cookies.get('token')?.value;
  const protectedRoutes = ['/chat', '/profile', '/home', '/explore'];

  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const isValid = token && (await verifyToken(token));
    if (!isValid) {
      console.log("⛔ Unauthorized access. Redirecting to /login");
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

// ✅ Make sure matcher matches all subpaths
export const config = {
  matcher: ['/chat/:path*', '/profile/:path*', '/home/:path*', '/explore/:path*'],
};
