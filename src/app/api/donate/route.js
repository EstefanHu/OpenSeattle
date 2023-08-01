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
    const { name, email, type, value } = await req.json()
    if (!name || !email || !type || !value) return new Response(BAD_REQUEST);

    await prisma.donation.create({
        data: {
            name,
            email: email.toLowerCase(),
            type: type.toLowerCase(),
            value: parseInt(value)
        }
    })

    return new Response(CREATED);
}

export async function GET() {
    const donations = await prisma.donation.findMany()
    return new Response(JSON.stringify({ data: donations }))
}

export async function PATCH(req) {
    const { id } = req.json()
    if (!id) return new Response(BAD_REQUEST)
    return new Response(UPDATED);
}

export async function DELETE(req) {
    const { id } = await req.json()
    if (!id) return new Response(BAD_REQUEST)
    await prisma.allocation.deleteMany({ where: { donationId: parseInt(id) } })
    await prisma.donation.delete({ where: { id } })
    return new Response(SUCCESS);
}