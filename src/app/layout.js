import Link from 'next/link'
import AppLinks from '@/components/AppLinks'
import './globals.css'
import styles from './layout.module.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Open Seattle',
  description: 'Toy app for show casing web dev abilities',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <header className={styles.header}>
          <Link href='/'>
            <h1>O<span>pen</span>S<span>eattle</span></h1>
          </Link>

          <AppLinks />
        </header>

        {children}
      </body>
    </html>
  )
}
