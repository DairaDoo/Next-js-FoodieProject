import sql from 'better-sqlite3';

const db = sql('meals.db'); 

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // count added on purpose.

    // throw new Error('Loading meals failed.')
    return db.prepare('SELECT * FROM meals').all(); // all is for fetching data (all rows.)
}

// get meal by slug (using the get and passing the slug to it prevents from SQL Injetion)
export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}