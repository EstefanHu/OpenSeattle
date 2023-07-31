import Link from 'next/link'
import styles from './layout.module.scss';

export default function LandingLayout({ children }) {

    return (
        <main className={styles.landingLayout}>
            <header className={styles.header}>
                <Link href='/'>
                    <h1>O<span>pen</span>S<span>eattle</span></h1>
                </Link>

                <Link href='/login'>login</Link>
            </header>
            {children}
        </main>
    )
}