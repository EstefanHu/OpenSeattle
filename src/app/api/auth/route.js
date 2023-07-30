import {
    BAD_REQUEST,
    CONFLICT,
    NOT_AUTHENTICATED,
    INVALID_REQUEST,
    SUCCESS,
    CREATED,
    UPDATED,
} from '@/lib/httpResponses';

export async function POST(req) {
    const { password } = req.json()
    if (!password || password !== 'openseattle') return new Response(INVALID_REQUEST)

    return new Response(CREATED);
}

export async function GET() {
    return new Response(SUCCESS);
}

export async function PATCH(req) {
    const { id } = req.json()
    if (!id) return new Response(BAD_REQUEST)
    return new Response(UPDATED);
}

export async function PUT() {
    const { id } = req.json()
    if (!id) return new Response(BAD_REQUEST)
    return new Response(UPDATED);
}

export async function DELETE() {
    const { id } = req.json()
    if (!id) return new Response(BAD_REQUEST)
    return new Response(SUCCESS);
}