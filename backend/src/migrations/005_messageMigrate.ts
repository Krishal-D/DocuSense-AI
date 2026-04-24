import { Pool } from "pg"

export async function messageMigrate(pool: Pool): Promise<void> {

    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS messages(
        id SERIAL PRIMARY KEY,
        conversation_id INT REFERENCES conversations(id) ON DELETE CASCADE,
        message_content TEXT,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )
        `)

    } catch (error) {
        console.error(error)
        throw error
    }

}