'use client'
import { useState, useEffect } from 'react';
import styles from './AllocationFeed.module.scss'

export default function AllocationFeed({ id, initAmount }) {
    const [isLoading, setIsLoading] = useState(true)
    const [allocations, setAllocations] = useState([])

    useEffect(() => {
        fetch('/api/allocation', {
            method: 'GET',
        }).then((res) => res.json())
            .then(({ data }) => {
                setAllocations(data)
                setIsLoading(false)
            })
    }, [])

    return (
        <>
            {/* <p><b>Current balance:</b> {allocations.map}</p> */}
            {allocations.map(({ id, amount, createdAt }) => (
                <div key={id} className={styles.AllocationFeed}>
                    <p>{createdAt}</p>
                    <p>{amount}</p>
                </div>
            ))}
        </>
    )
}