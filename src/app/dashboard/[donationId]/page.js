import Link from 'next/link'
import AllocationFeed from './AllocationFeed'
import prisma from '@/lib/prisma'
import styles from './page.module.scss'

export default async function DonationPage({ params: { donationId } }) {
    const { id, name, type, value } = await prisma.donation.findFirst({ where: { id: parseInt(donationId) } })

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <Link href='/dashboard' className={styles.back}>&lt;- back</Link>

            </div>

            <label>donation #{id}</label>
            <h1><span>{type}</span> from <span>{name}</span></h1>
            <p><b>Initial amount:</b> {value}</p>

            <AllocationFeed id={id} initAmount={value} />
        </div>
    )
}