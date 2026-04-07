
export async function chunkMigrate(pool: any) {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS chunks(
                    id SERIAL PRIMARY KEY,
                    chunk_idx INT NOT NULL,
                    content TEXT NOT NULL,
                    embedding VECTOR(1536),
                    document_id INT REFERENCES documents(id) ON DELETE CASCADE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `)
    } catch (error) {
        console.error(error)
    }
}