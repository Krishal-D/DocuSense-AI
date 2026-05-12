import client from "./client";
import type { Document } from "../types";

export const documentAPI = {

    async uploadDocument(formData: FormData): Promise<Document> {
        const res = await client.post('/documents/upload', formData)
        return res.data

    },

    async findDocumentByUser(): Promise<Document[]> {

        const res = await client.get('/documents/')
        return res.data

    },

    async deleteDocument(documentId: number): Promise<{ message: string }> {
        const res = await client.delete(`/documents/${documentId}`,)
        return res.data
    }


}