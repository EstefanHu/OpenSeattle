import DonateForm from '@/app/app/(donation)/DonateForm'
import DonationFeed from './DonationFeed'
import styles from './page.module.scss'

export default async function controlCenter() {

    return (
        <div className={styles.controlCenter}>
            <div className={styles.header}>
                <h1>All Donations</h1>
                <DonateForm />
            </div>
            <DonationFeed />
        </div>
    )
}