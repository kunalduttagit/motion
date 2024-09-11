import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup';

    const token = request.cookies.get('token')?.value || '';

    if (path === '/') {
        return NextResponse.next();
    }
    //means you're in login or signup page but you have a token.
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/home', request.nextUrl));
    }

    //you are in protected pages and you don't have a token
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    //incase a expired token in cookie is sending request, delete cookie from user browser
    if (token) {
        try {
          jwt.verify(token, process.env.TOKEN_SECRET!);
        } catch (error:any) {
          if (error.name === 'TokenExpiredError') {
            cookies().delete('token');
          }
        }
      }
}

export const config = {
    matcher: ['/', '/home/:path*', '/login', '/signup', '/movie/:path*'],
};
