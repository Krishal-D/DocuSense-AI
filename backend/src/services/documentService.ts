import { documentModel } from "../models/documentModel";
import { chunkModel } from "../models/chunkModel";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse').default ?? require('pdf-parse');
import { UploadResult, DocumentStatus, DocumentWithUser, Chunk } from "../types";
import { chunkText } from "../utils/chunk";
import { getEmbedding } from "../utils/embedding";
import { generateAnswer } from "../utils/generate";



export const documentService = {

    async uploadDocument(documentName: string, ownerId: number, status: DocumentStatus = "pending", pdfBuffer: Buffer): Promise<UploadResult> {
        const document = await documentModel.uploadDocument(documentName, ownerId, status)

        if (!document?.id) {
            throw new Error("Document creation failed");
        }

        try {

            const pdfData = await pdfParse(pdfBuffer);
            const cleanedText = pdfData.text.replace(/\s+/g, " ").trim();

            await documentModel.updateStatus('processing', document.id)

            const chunks = chunkText(cleanedText, 500, 50)

            const embeddings = await getEmbedding(chunks)

            for (let i = 0; i < chunks.length; i++) {
                const content = chunks[i]
                const vector = embeddings[i]
                if (content && vector) await chunkModel.insertChunk(i, content, vector, document.id)
            }

            await documentModel.updateStatus('indexed', document.id)

            return ({
                document: {
                    name: document.document_name,
                    ownerId: document.owner_id,
                    status: 'indexed'
                },
                pdfData,
                chunks
            })
        } catch (error) {
            await documentModel.updateStatus('failed', document.id)
            throw error
        }
    },

    async findDocumentByUser(ownerId: number): Promise<{ document: DocumentWithUser[] }> {

        const document = await documentModel.findDocumentByUser(ownerId)
        return { document }
    },

    async deleteDocument(documentId: number, ownerId: number): Promise<void> {
        await documentModel.deleteDocument(documentId, ownerId)
    },

    async queryDocument(userQuery: string, ownerId: number) {

        if (!userQuery || !userQuery.trim()) {
            throw new Error("Query is empty");
        }

        const [queryEmbedding] = await getEmbedding([userQuery]);


        if (!queryEmbedding) {
            throw new Error("Failed to generate query embedding");
        }

        const chunks = await chunkModel.searchSimilarChunks(ownerId, queryEmbedding);

        if (!chunks.length) {
            return {
                answer: "No relevant information found in your documents.",
                sources: []
            }
        }

        const topChunks = chunks.slice(0, 5);

        const context = topChunks
            .map((c, i) =>
                `Chunk ${i + 1} (Document: ${c.document_name}):\n${c.content}`
            )
            .join('\n\n');

        const answer = await generateAnswer(context, userQuery);

        return {
            answer,
            sources: topChunks.map(c => ({
                document: c.document_name,
                documentId: c.document_id,
                chunkIndex: c.chunk_idx
            }))
        }
    }

}