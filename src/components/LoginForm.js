'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.scss'

export default function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        setError('')

        if (!password) setError('please provide a passcode')

        setIsLoading(true)
        const { code } = await (
            await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(password)
            })
        ).json();
        setIsLoading(false);

        if (code !== 201) return setError('request failed');
        
        router.push('/dashboard')
    }

    return (
        <form className={styles.LoginForm} noValidate autoComplete='on' onSubmit={handleSubmit}>
            <fieldset>
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p>{error}</p>
            </fieldset>

            <input tyupe='submit' className='hidden' />

            <button onClick={handleSubmit} type='submit'>Login</button>
        </form>
    )
}
