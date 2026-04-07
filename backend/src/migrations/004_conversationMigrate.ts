export async function conversationMigrate(pool: any) {

    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS conversations(
        id SERIAL PRIMARY KEY,
        conversation_name VARCHAR(100) NOT NULL,
        document_id INT REFERENCES documents(id) ON DELETE CASCADE,
        owner_id INT REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `)
    } catch (error) {
        console.error(error)

    }

}