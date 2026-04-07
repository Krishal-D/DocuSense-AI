export async function messageMigrate(pool: any) {

    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS messages(
        id SERIAL PRIMARY KEY,
        conversation_id INT REFERENCES conversations(id) ON DELETE CASCADE,
        message_content TEXT,
        role TEXT DEFAULT 'user'
        )
        `)

    } catch (error) {
        console.error(error)
    }

}