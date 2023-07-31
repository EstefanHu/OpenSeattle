import styles from './default.module.scss'

const DUMMY = [
    {
        id: 1,
        name: 'Gary Host',
        email: 'ghost@gmail.com',
        type: 'money',
        value: 1000
    }
]

export default function controlCenter() {

    return (
        <div className={styles.controlCenter}>
            <h1>All Donations</h1>
        </div>
    )
}