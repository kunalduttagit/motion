import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup';
    const isApiPath = path.startsWith('/api/');

    const token = request.cookies.get('motion-user-token')?.value || '';

    if (path === '/') {
        return NextResponse.next();
    }

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/home', request.nextUrl));
    }

    if (!isPublicPath && !token) {
        if (isApiPath) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (token) {
        try {
            const user = await verifyAuth(token);
            const response = NextResponse.next();
            response.headers.set('x-user-name', user.username);
            response.headers.set('x-user-id', user.id);
            response.headers.set('x-user-email', user.email);
            return response;
        } catch (error: any) {
            console.error(error.message);
            if (isApiPath) {
                return new NextResponse('Unauthorized', { status: 401 });
            }
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/home/:path*', '/login', '/signup', '/movie/:path*', '/api/user/:path*', '/api/movie/:path*'],
};