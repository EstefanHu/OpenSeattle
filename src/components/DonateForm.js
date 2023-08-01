'use client';
import { useState } from 'react';
import { isValidEmail } from '@/lib/isValidEmail';
import styles from './DonateForm.module.scss'

const DEFAULT_FIELDS = {
    name: '',
    email: '',
    type: '',
    value: 0,
};

const ERROR_DEFAULTS = {
    name: '',
    email: '',
    type: '',
    value: '',
}

export default function DonateForm() {
    const [creating, setCreating] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(DEFAULT_FIELDS)
    const [errorData, setErrorData] = useState(ERROR_DEFAULTS)

    const toggleDonationForm = () => setCreating(!creating)

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isLoading) return;
        setErrorData(ERROR_DEFAULTS)
        const { name, email, type, value } = formData;
        const errors = { ...ERROR_DEFAULTS }
        
        if (!name) errors.name = 'please provide contact name'
        if (!email) errors.email = 'please provide contact email'
        if (!isValidEmail(email)) errors.email = 'invalid email address'
        if (!type) errors.type = 'please select donation type'
        if (value === 0) errors.value = 'please provide donation amount'
        if (JSON.stringify(errors) !== JSON.stringify(ERROR_DEFAULTS)) return setErrorData(errors);
        console.log('hello')
        
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

        if (code !== 201) return setErrorData('something went wrong');

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

                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option defaultValue=''>type</option>
                            <option value='food'>food</option>
                            <option value='money'>money</option>
                            <option value='clothes'>clothes</option>
                            <option value='other'>other</option>
                        </select>
                        <p>{errorData.type}</p>

                        <input
                            disabled={formData.type === ''}
                            type='text'
                            placeholder='value'
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        />
                        <p>{errorData.value}</p>
                    </fieldset>

                    <input type='submit' className='hidden' />

                    <button onClick={handleSubmit} type='submit'>Submit</button>
                </form>
            </div >
        </>
    )
}
