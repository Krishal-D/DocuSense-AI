export async function userMigrate(pool: any) {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            refresh_token TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `)
    } catch (error) {
        console.error(error)

    }
}