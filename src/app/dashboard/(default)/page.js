// import prisma from '@/lib/prisma';
import styles from './default.module.scss'

const DUMMY = [
    {
        id: 1,
        name: 'Gary Host',
        email: 'ghost@gmail.com',
        type: 'money',
        value: 1000
    }
]

export default async function controlCenter() {
    // const donations = await prisma.donation.findMany()

    return (
        <div className={styles.controlCenter}>
            <h1>All Donations</h1>

            {/* {donations.map(({ id, name, email, type, value }) => (
                <div key={id} className={styles.donation}>
                    <p><b>{name}</b></p>
                    <p>{email}</p>
                    <p>{type}</p>
                    <p>{value}</p>
                </div>
            ))} */}
        </div>
    )
}