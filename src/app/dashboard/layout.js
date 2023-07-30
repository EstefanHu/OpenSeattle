import Link from 'next/link';
import DonateForm from '@/components/DonateForm';
import styles from './layout.module.scss';

export default function DashboardLayout({ children }) {

    return (
        <main className={styles.dashboardLayout}>
            <header>
                <Link href='/dashboard'>
                    <h1>O<span>pen</span>S<span>eattle</span></h1>
                </Link>

                <DonateForm />
            </header>
            {children}
        </main>
    )
}