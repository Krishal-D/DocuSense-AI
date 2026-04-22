import { pool } from "../config/db";
import { Chunk, IChunkModel, ChunkSearchResult } from "../types";

export const chunkModel: IChunkModel = {

    async insertChunk(chunkIdx: number, content: string, embedding: number[], documentId: number): Promise<Chunk> {
        const embeddingVector = `[${embedding.join(",")}]`;
        const result = await pool.query(
            `INSERT INTO chunks(chunk_idx, content,embedding, document_id)
             VALUES($1, $2, $3::vector, $4)
             RETURNING *`,
            [chunkIdx, content, embeddingVector, documentId]
        );
        return result.rows[0];
    },

    async getChunksByDocument(documentId: number): Promise<Chunk[]> {
        const result = await pool.query(
            `SELECT * FROM chunks WHERE document_id = $1 ORDER BY chunk_idx`,
            [documentId]
        );
        return result.rows;
    },

    async searchSimilarChunks(ownerId: number, embedding: number[]): Promise<ChunkSearchResult[]> {
        const embeddingVector = `[${embedding.join(",")}]`;

        const result = await pool.query(`
            SELECT c.content, c.id, c.document_id, c.chunk_idx, d.document_name
            FROM chunks c
            JOIN documents d ON c.document_id = d.id
            WHERE d.owner_id = $1
            ORDER BY c.embedding <=> $2::vector
            LIMIT 5
            `, [ownerId, embeddingVector])

        return result.rows

    }
}