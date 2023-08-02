import prisma from '@/lib/prisma';

export async function GET() {
    // Prisma doesnt allow for complex SQL transactions so this is a temporary solution until I remove prisma
    const donators = await prisma.donation.findMany({
        include: {
            allocations: true
        }
    })

    const dict = {}

    const DEFAULT = { total: 0, food: 0, money: 0, clothes: 0, other: 0 }

    for (let i = 0; i < donators.length; i++) {
        let d = donators[i]
        const { name, type, value } = d
        if (!dict[name]) dict[name] = structuredClone(DEFAULT)
        dict[name].total = dict[name].total + 1
        dict[name][type] = dict[name][type] + value
    }

    return new Response(JSON.stringify({ donators: dict }))
}