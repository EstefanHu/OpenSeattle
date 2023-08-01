'use client'
import {useState,useEffect} from 'react'
import styles from './DonatorReport.module.scss'

export default function DonatorReport() {
    const [donators, setDonators] = useState([])

    useEffect(() => {

    }, [])

    return (
        <div className={styles.donatorReport}>
            <h2>Donator Report</h2>

            
        </div>
    )
}