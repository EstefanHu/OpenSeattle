'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AppLinks.module.scss';

export default function AppLinks() {
    const pathname = usePathname()
    const [isAuthed, setIsAuthed] = useState(document.cookie.split(';').includes('openSeattleAuth=supersecrettoken'))

    useEffect(() => {
        const stillAuthed = document.cookie.split(';').includes('openSeattleAuth=supersecrettoken')
        setIsAuthed(stillAuthed)
    }, [pathname])

    const openDonationForm = () => {
        
    }

    return (
        <span className={styles.appLinks}>
            {
                isAuthed
                    ? <button
                        className={styles.openForm}
                        type='button'
                        onClick={openDonationForm}
                    >
                        Start Donation
                    </button>
                    : <Link href='/login'>login</Link>
            }
        </span>
    )
}