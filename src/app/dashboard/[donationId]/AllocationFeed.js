'use client'
import { useState, useEffect } from 'react';
import styles from './AllocationFeed.module.scss'

export default function AllocationFeed({ id, initAmount }) {
    const [creating, setCreating] = useState(false)
    const [allocations, setAllocations] = useState([])
    const [totalSpend, setTotalSpend] = useState(0)

    useEffect(() => {
        fetch('/api/allocation', {
            method: 'GET',
        }).then((res) => res.json())
            .then(({ data }) => {
                setAllocations(data)
                setTotalSpend(allocations.reduce((a, b) => a.total + b.total, 0))
            })
    }, [])

    const toggleAllocationForm = () => setCreating(!creating)

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        let currError = ''

        if (amount === 0) currError = 'please enter an allocation amount';
        if (currError !== '') return setError(currError)

        setIsLoading(true)
        const { code } = await (
            await fetch('/api/allocation', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
        ).json();
        setIsLoading(false);

        if (code !== 201) return setError('something went wrong');

        setCreating(false)
    }

    return (
        <>
            <div className={styles.header}>
                <p><b>Total Spend:</b> {totalSpend}</p>

                <button
                    type='button'
                    onClick={toggleAllocationForm}>
                    new
                </button>
            </div>

            {allocations.map(({ id, amount, createdAt }) => (
                <div key={id} className={styles.AllocationFeed}>
                    <p>{createdAt}</p>
                    <p>{amount}</p>
                </div>
            ))}

            <div className={`${creating ? '' : 'hidden'} ${styles.allocationWrapper}`}>
                <form className={styles.allocationForm} noValidate autoComplete='on' onSubmit={handleSubmit}>
                    <button
                        className={styles.close}
                        type='button'
                        onClick={toggleAllocationForm}
                    >
                        &#x2715;
                    </button>

                    <h1>Allocation Form</h1>

                    <fieldset>
                        <input
                            type='number'
                            placeholder='allocation amount'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <p>{error}</p>
                    </fieldset>

                    <input type='submit' className='hidden' />

                    <button onClick={handleSubmit} type='submit'>Submit</button>
                </form>
            </div >
        </>
    )
}

function AllocationForm({ toggleAllocationForm, creating, setCreating }) {
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        setError('')

        if (amount === 0) setError('please enter an allocation amount');

        setIsLoading(true)
        const { code } = await (
            await fetch('/api/allocation', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
        ).json();
        setIsLoading(false);

        if (code !== 201) return setError('something went wrong');

        setCreating(false)
    }

    return (
        <div className={`${creating ? '' : 'hidden'} ${styles.allocationWrapper}`}>
            <form className={styles.allocationForm} noValidate autoComplete='on' onSubmit={handleSubmit}>
                <button
                    className={styles.close}
                    type='button'
                    onClick={toggleAllocationForm}
                >
                    &#x2715;
                </button>

                <h1>Allocation Form</h1>

                <fieldset>
                    <input
                        type='number'
                        placeholder='allocation amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    {/* <p>{error}</p> */}
                </fieldset>

                <input type='submit' className='hidden' />

                <button onClick={handleSubmit} type='submit'>Submit</button>
            </form>
        </div >
    )
}