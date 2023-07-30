'use client';
import { useState } from 'react';
import styles from './LoginForm.module.scss'

const DEFAULT_FIELDS = {
    password: '',
};

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(DEFAULT_FIELDS)
    const [errorData, setErrorData] = useState(DEFAULT_FIELDS)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        setErrorData(DEFAULT_FIELDS)
        const { password } = formData;
        const errors = { ...DEFAULT_FIELDS }

        if (!password) errors.password = 'please provide password'
        if (JSON.stringify(errors) !== JSON.stringify(DEFAULT_FIELDS)) return setErrorData(errors);

        setIsLoading(true)
        const { code } = await (
            await fetch('/auth', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
        ).json();
        setIsLoading(false);

        if (code !== 200) return setErrorData('something went wrong');

        alert('FORM SUBMITTED')
    }

    return (
        <form className={styles.LoginForm} noValidate autoComplete='on' onSubmit={handleSubmit}>
            <fieldset>
                <input
                    type='password'
                    placeholder='password'
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <p>{errorData.password}</p>
            </fieldset>

            <input tyupe='submit' className='hidden' />

            <button onClick={handleSubmit} type='submit'>Login</button>
        </form>
    )
}
