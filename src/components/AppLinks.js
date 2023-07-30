'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './AppLinks.module.scss'

export default function AppLinks() {
    const router = useRouter()
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        setIsAuthed(document.cookie.split(';').includes('openSeattleAuth=supersecrettoken'))
    }, [router, setIsAuthed])

    return (
        <span className={styles.AppLinks}>
            {
                isAuthed
                    ? <h1>hello</h1>
                    : <Link href='/login'>login</Link>
            }
        </span>
    )
}