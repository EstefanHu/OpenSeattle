import Image from 'next/image';
import DonateForm from '@/components/DonateForm';
import styles from './marketing.module.scss';

export default function Home() {
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
        <h1>Donate</h1>
        <DonateForm />
      </div>
    </main>
  )
}