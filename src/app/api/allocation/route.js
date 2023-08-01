import {
    BAD_REQUEST,
    CONFLICT,
    NOT_AUTHENTICATED,
    INVALID_REQUEST,
    SUCCESS,
    CREATED,
    UPDATED,
} from '@/lib/httpResponses';
import prisma from '@/lib/prisma';

export async function POST(req) {
    const { amount } = await req.json()

    await prisma.allocation.create({ data: { amount } })

    return new Response(CREATED)
}

export async function GET(req) {
    // const { id } = req.query
    // console.log(id)
    const allocations = await prisma.allocation.findMany()
    return new Response(JSON.stringify({ data: allocations }))
}

export async function DELETE(req) {
    const { id } = await req.json()
    if (!id) return new Response(BAD_REQUEST)
    await prisma.allocation.delete({ where: { id } })
    return new Response(SUCCESS);
}