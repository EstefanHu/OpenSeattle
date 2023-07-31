'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import dayjs from 'dayjs';
import styles from './DonationFeed.module.scss'

export default function DonationFeed() {
    const [isLoading, setIsLoading] = useState(true)
    const [donations, setDonations] = useState([])
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        fetch('/api/donate', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
            .then(({ data }) => {
                setDonations(data)
                setIsLoading(false)
            })
    }, [])

    const doDeletion = async (id) => {
        setIsLoading(true)
        await fetch('/api/donate', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        setDonations(donations.filter((d) => d.id !== id))
        setIsLoading(false)
    }

    return (
        <>
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
                            onClick={() => doDeletion(id)}
                            disabled={isLoading}
                        >
                            Delete
                        </button>
                    </span>
                </div>
            ))}
        </>
    )
}