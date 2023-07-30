import { NextResponse } from 'next/server';

export function middleware(req) {
    console.log(req.nextUrl.pathname)
    const authCookie = req.cookies.get('openSeattleAuth');

    if (!authCookie) {
        const url = req.nextUrl.clone();
        url.pathname = '/';

        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard'],
};