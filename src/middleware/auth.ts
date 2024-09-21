// middleware/auth.ts
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const pathname = request.nextUrl.pathname;

  // Check if the user is authenticated
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url), { status: 307 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/tasks', '/kanban'], // Adjust the matcher to protect the desired routes
};