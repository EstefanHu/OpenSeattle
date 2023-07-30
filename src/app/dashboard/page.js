import { cookies } from 'next/headers'

export default function Dashboard() {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('openSeattleAuth')

    if (!authCookie) return null

    return (
        <main>
            <h1>Admin Dashboard</h1>
        </main>
    )
}