'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

const DEFAULT_FIELDS = {
    name: '',
    email: '',
    phone: '',
    type: '',
    value: 0,
};

export default function DonateForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(DEFAULT_FIELDS)
    const [errorData, setErrorData] = useState(DEFAULT_FIELDS)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        setErrorData(DEFAULT_FIELDS)
        const { name, type, value } = formData;
        const errors = { ...DEFAULT_FIELDS }

        if (!name) errors.name = 'please provide contact name'
        if (!email) errors.email = 'please provide contact email'
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

        alert('FORM SUBMITTED')
    }

    return (
        <form noValidate autoComplete='on' onSubmit={handleSubmit}>
            <h1>Donation Form</h1>

            <fieldset>
                <input type='text' placeholder='name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input type='email' placeholder='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <input type='text' placeholder='phone' value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <input type='text' placeholder='type' value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
                <input type='text' placeholder='value' value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} />
            </fieldset>

            <input tyupe='submit' className='hidden' />

            <button onClick={handleSubmit} type='submit'>Submit</button>
        </form>
    )
}
