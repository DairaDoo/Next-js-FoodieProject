// esta sintaxis especial del error solo funciona si el error
// ocurre en la misma página o carpeta donde esta el page.js 
// también ocurre en cualquiera anidado. Si se añade en el root
// directory atrapara cualquier error de mi app.
"use client"; // el error debe ser un client component.

export default function Error() {
    return (
        <main className="error">
            <h1>An error ocurred!</h1>
            <p>Failed to fetch meal data. Please try again later.</p>
        </main>
    )
}