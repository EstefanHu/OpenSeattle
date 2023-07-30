import Image from 'next/image';
import DonateForm from '@/components/DonateForm';
import styles from './LandingPage.module.scss';

export default function LandingPage() {
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.imageWrapper}>
        <Image
          src='/imgs/hero.webp'
          alt='community'
          sizes='(max-width: 1px) 100vw'
          priority
          fill
        />
      </div>

      <div className={styles.formWrapper}>
        <h1>Donation Form</h1>
        <DonateForm />
      </div>
    </main>
  )
}
