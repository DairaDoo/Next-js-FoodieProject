import sql from 'better-sqlite3';

const db = sql('meals.db'); 

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // count added on purpose.
    return db.prepare('SELECT * FROM meals').all(); // all is for fetching data (all rows.)
}