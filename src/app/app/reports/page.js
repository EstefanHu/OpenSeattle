import DonatorReport from './DonatorReport'
import InventoryReport from './InventoryReport'
import prisma from '@/lib/prisma'
import styles from './page.module.scss'

export default async function ReportsPage() {
    // Prisma doesnt allow for complex SQL transactions so this is a temporary solution until I remove prisma
    const donations = await prisma.donation.findMany({
        orderBy: { name: 'asc' },
        include: { allocations: true }
    })

    return (
        <div className={styles.reportsWrapper}>
            <h1>Reports</h1>
            <p>NOTE: reports revalidate once a day to reduce expensive DB calls</p>

            <InventoryReport donations={donations} />

            <DonatorReport donations={donations} />
        </div>
    )
}

export const revalidate = 3600 * 24;