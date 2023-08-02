'use client'
import styles from './DonatorReport.module.scss'

const DEFAULT = { total: 0, food: 0, money: 0, clothes: 0, other: 0 }

export default function DonatorReport({ donations }) {
    const res = {}

    for (let i = 0; i < donations.length; i++) {
        let d = donations[i]
        const { name, type, value } = d
        if (!res[name]) res[name] = structuredClone(DEFAULT)
        res[name].total = res[name].total + 1
        res[name][type] = res[name][type] + value
    }

    return (
        <div className={styles.donatorReport}>
            <h2>Donator Report</h2>

            {Object.entries(res).map(([k, v]) => (
                <div key={k}>
                    <p>{k}</p>
                    {Object.entries(v).map(([k, v]) => (
                        <li key={k}><b>{k}:</b> {v}</li>
                    ))}
                </div>
            ))}
        </div>
    )
}