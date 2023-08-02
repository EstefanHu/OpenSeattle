import DonatorReport from './DonatorReport'
import InventoryReport from './InventoryReport'
import styles from './page.module.scss'

export default function ReportsPage() {
    return (
        <div className={styles.reportsWrapper}>
            <h1>Reports</h1>

            <InventoryReport />

            <DonatorReport />
        </div>
    )
}