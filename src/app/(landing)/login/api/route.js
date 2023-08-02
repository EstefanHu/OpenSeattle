import {
    BAD_REQUEST,
    SUCCESS,
    CREATED,
} from '@/lib/httpResponses';

export async function POST(req) {
    const password = await req.json()
    if (!password || password !== 'openseattle') return new Response(BAD_REQUEST)

    return new Response(CREATED, {
        headers: { 'Set-Cookie': `openSeattleAuth=supersecrettoken; Max-Age=7200; SameSite=Strict; Path=/; HttpOnly ${process.env.NODE_ENV !== 'development' && '; Secure'}` },
    });
}

export async function DELETE() {
    const cookieStore = cookies();
    const value = cookieStore.get('openSeattleAuth')?.value;
    if (!value) return new Response(BAD_REQUEST)

    return new Response(SUCCESS, {
        headers: { 'Set-Cookie': 'openSeattleAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Max-Age=0;' },
    });
}