'use client'
import styles from './InventoryReport.module.scss'

export default function InventoryReport({ donations }) {
    return (
        <div className={styles.inventoryReport}>
            <h2>Inventory Report</h2>

            <table>
                <tr>
                    <th>#</th>
                    <th>Donor</th>
                    <th>type</th>
                    <th>Initial donation</th>
                    <th># of allocations</th>
                    <th>Allocations total</th>
                </tr>

                {donations.map(({ id, name, type, value, allocations }) => {

                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{type}</td>
                            <td>{value}</td>
                            <td>{allocations.length}</td>
                            <td>{allocations.reduce((a, d) => a + d.amount, 0)}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}