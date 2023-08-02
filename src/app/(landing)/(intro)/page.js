import Image from 'next/image';
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
        <h1>Greetings!</h1>
        <p>Welcome to my mini app for tracking donations.</p>
        <p>I&apos;ve made this as a quick and dirty UI for a super simple set of lambdas to handle donations CRUD.</p>
      </div>
    </main>
  )
}
