'use client'
import { useState, useEffect } from 'react'
import styles from './DonatorReport.module.scss'

export default function DonatorReport() {
    const [donators, setDonators] = useState({})

    useEffect(() => {
        fetch('/app/reports/api', {
            method: 'GET',
        }).then(res => res.json())
            .then(({ donators }) => {
                setDonators(donators)
            })
    }, [])

    return (
        <div className={styles.donatorReport}>
            <h2>Donator Report</h2>

            {Object.entries(donators).map(([k, v]) => (
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