'use client';
import { useState } from 'react';
import { isValidEmail } from '@/lib/isValidEmail';
import styles from './DonateForm.module.scss'

const DEFAULT_FIELDS = {
    name: '',
    email: '',
    phone: '',
    type: '',
    value: 0,
};

export default function DonateForm() {
    const [creating, setCreating] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(DEFAULT_FIELDS)
    const [errorData, setErrorData] = useState(DEFAULT_FIELDS)

    const toggleDonationForm = () => setCreating(!creating)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        setErrorData(DEFAULT_FIELDS)
        const { name, email, type, value } = formData;
        const errors = { ...DEFAULT_FIELDS }

        if (!name) errors.name = 'please provide contact name'
        if (!email) errors.email = 'please provide contact email'
        if (!isValidEmail(email)) errors.email = 'invalid email address'
        if (!type) errors.type = 'please select donation type'
        if (!value) errors.value = 'please provide donation amount'
        if (JSON.stringify(errors) !== JSON.stringify(DEFAULT_FIELDS)) return setErrorData(errors);

        setIsLoading(true)
        const { code } = await (
            await fetch('/api/donate', {
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

        setCreating(false)
    }

    return (
        <>
            <button
                className={styles.openForm}
                type='button'
                onClick={toggleDonationForm}
            >
                Start Donation
            </button>

            <div className={`${creating ? '' : 'hidden'} ${styles.donateWrapper}`}>
                <form className={styles.donateForm} noValidate autoComplete='on' onSubmit={handleSubmit}>
                    <button
                        className={styles.close}
                        type='button'
                        onClick={toggleDonationForm}
                    >
                        &#x2715;
                    </button>

                    <h1>Donation Form</h1>

                    <fieldset>
                        <input
                            type='text'
                            placeholder='name'
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <p>{errorData.name}</p>

                        <input
                            type='email'
                            placeholder='email'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <p>{errorData.email}</p>

                        <input
                            type='text'
                            placeholder='type'
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        />
                        <p>{errorData.type}</p>

                        <input
                            type='text'
                            placeholder='value'
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        />
                        <p>{errorData.type}</p>
                    </fieldset>

                    <input type='submit' className='hidden' />

                    <button onClick={handleSubmit} type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}
