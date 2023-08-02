import prisma from '@/lib/prisma';
import styles from './DonatorReport.module.scss'

const DEFAULT = { total: 0, food: 0, money: 0, clothes: 0, other: 0 }

export default async function DonatorReport() {
    // Prisma doesnt allow for complex SQL transactions so this is a temporary solution until I remove prisma
    const donators = await prisma.donation.findMany({ include: { allocations: true } });

    const res = {}

    for (let i = 0; i < donators.length; i++) {
        let d = donators[i]
        const { name, type, value } = d
        if (!res[name]) res[name] = structuredClone(DEFAULT)
        res[name].total = res[name].total + 1
        res[name][type] = res[name][type] + value
    }

    return (
        <div className={styles.donatorReport}>
            <h2>Donator Report</h2>

            {Object.entries(res).map(([k, v]) => (
                <div key={k}>
                    <p>{k}</p>
                    {Object.entries(v).map(([k, v]) => (
                        <li key={k}><b>{k}:</b> {v}</li>
                    ))}
                </div>
            ))}
        </div>
    )
}