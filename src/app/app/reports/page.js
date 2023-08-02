import DonatorReport from './DonatorReport'
import styles from './page.module.scss'

export default function ReportsPage() {
    return (
        <div className={styles.reportsWrapper}>
            <h1>Reports</h1>

            <DonatorReport />
        </div>
    )
}