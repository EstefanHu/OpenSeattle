import { NextResponse } from 'next/server';

export function middleware(req) {
    const authCookie = req.cookies.get('openSeattleAuth');

    if (!authCookie) {
        const url = req.nextUrl.clone();
        url.pathname = '/';

        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/app', '/app/:path*', '/reports'],
};