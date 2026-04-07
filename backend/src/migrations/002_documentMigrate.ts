import { Pool } from "pg"

export async function documentMigrate(pool: Pool): Promise<void> {

    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS documents(
        id SERIAL PRIMARY KEY,
        owner_id INT REFERENCES users(id) ON DELETE CASCADE,
        document_name varchar(100) NOT NULL,
        status varchar(100) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `)
    } catch (error) {
        console.error(error)
        throw error

    }
}