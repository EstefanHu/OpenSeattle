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
                    <p className={styles.date}>{dayjs(createdAt).format('MMM DD, YYYY')}</p>
                    <h2>{name}</h2>

                    <p><b>contact:</b> {email}</p>
                    <p><b>type:</b> {type}</p>
                    <p><b>amount:</b> {value}</p>

                    <span>
                        <Link href={`/dashboard/${id}`}>View Allocations</Link>
                        <button
                            type='button'
                            onClick={null}
                        >
                            Delete
                        </button>
                    </span>
                </div>
            ))}
        </div>
    )
}