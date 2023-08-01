'use client'
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styles from './AllocationFeed.module.scss'

export default function AllocationFeed({ donationId, initAmount }) {
    const [creating, setCreating] = useState(false)
    const [allocations, setAllocations] = useState([])
    const [totalSpend, setTotalSpend] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('/api/allocation', {
            method: 'GET',
        }).then((res) => res.json())
            .then(({ data }) => {
                setAllocations(data)
                setTotalSpend(data.reduce((a, b) => a + parseInt(b.amount), 0))
            })
    }, [])

    const deleteAllocation = async (id, amount) => {
        await fetch('/api/allocation', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        setAllocations(allocations.filter((a) => a.id !== id))
        setTotalSpend(totalSpend - parseInt(amount))
    }

    const toggleAllocationForm = () => setCreating(!creating)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        let currError = ''

        if (amount === 0) currError = 'please enter an allocation amount';
        if (currError !== '') return setError(currError)

        setIsLoading(true)
        const { code, newAllocation } = await (
            await fetch('/api/allocation', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ donationId, amount })
            })
        ).json();
        setIsLoading(false);

        if (code !== 201) return setError('something went wrong');

        setAllocations([...allocations, newAllocation])
        setTotalSpend(totalSpend + parseInt(amount))
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

            <div className={styles.allocationFeed}>
                {allocations.map(({ id, amount, createdAt }) => (
                    <div key={id} className={styles.allocation}>
                        <p>{dayjs(createdAt).format('MMM DD, YY')}</p>
                        <p><b>amount:</b> {amount}</p>

                        <button
                            type='button'
                            onClick={() => deleteAllocation(id, amount)}
                        >
                            delete
                        </button>
                    </div>
                ))}
            </div>

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
