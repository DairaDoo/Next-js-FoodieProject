import Link from "next/link";

export default function CommunityPage() {
    return (
        <main>
            <h1 style={{ color: 'white', textAlign: 'center' }}>Community Page</h1>
            <p><Link href="/meals">Meals Page</Link></p>
            <p><Link href="/meals/share">Share Page</Link></p>
            <p><Link href="/meals/dinamic">Meals Dinamic Page</Link></p>
            <p><Link href="/community">Community Page</Link></p>
            <p><Link href="/">Home Page</Link></p>
        </main>
    )
}