import LoginForm from '@/components/LoginForm'
import PasswordToClipboard from '@/components/PasswordToClipboard'
import styles from './login.module.scss'

export default function LoginPage() {

    return (
        <div className={styles.loginPage}>
            <h1>Admin Login</h1>
            <LoginForm />
            <PasswordToClipboard />
        </div>
    )
}