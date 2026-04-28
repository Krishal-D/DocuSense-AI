import client from "./client";

export const documentAPI = {

    async uploadDocument(formData: FormData) {
        const res = await client.post('/documents/upload', formData)
        return res.data

    },

    async findDocumentByUser() {

        const res = await client.get('/documents/')
        return res.data

    },

    async deleteDocument(documentId: number) {
        const res = await client.delete(`/documents/${documentId}`,)
        return res.data
    }


}