import DonationFeed from './DonationFeed'
import styles from './page.module.scss'

export default async function controlCenter() {

    return (
        <div className={styles.controlCenter}>
            <h1>All Donations</h1>
            <DonationFeed />
        </div>
    )
}