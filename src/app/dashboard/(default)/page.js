import Link from 'next/link';
import prisma from '@/lib/prisma';
import styles from './default.module.scss'
import dayjs from 'dayjs';

export default async function controlCenter() {
    const donations = await prisma.donation.findMany()

    return (
        <div className={styles.controlCenter}>
            <h1>All Donations</h1>

            {donations.map(({ id, name, email, type, value, createdAt }) => (
                <div key={id} className={styles.donation}>
                    <h2>{name}</h2>

                    <p>{dayjs(createdAt).format('MM-DD-YY')}</p>
                    <p>{email}</p>
                    <p>{type}</p>
                    <p>{value}</p>
                    <Link href={`/dashboard/${id}`}>View Allocations</Link>
                </div>
            ))}
        </div>
    )
}