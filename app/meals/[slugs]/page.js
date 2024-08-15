import Link from "next/link";

export default function MealsExtraRoute({props}) {
    return (
        <main>
            <h1 style={{ color: 'white', textAlign: 'center' }}>Meals Dinamic Route.</h1>
            <p><Link href="/">Home Page</Link></p>
            <p>{props}</p>
            <p><Link href="/meals">Meals Page</Link></p>
            <p><Link href="/meals/share">Share Page</Link></p>
            <p><Link href="/meals/dinamic">Meals Dinamic Page</Link></p>
            <p><Link href="/community">Community Page</Link></p>
        </main>
    );
}