import client from "./client";

export const chatAPI = {
    async query(conversationId: number, question: string) {
        const res = await client.post(`/conversations/${conversationId}/query`, { question })
        return res.data

    },

    async createConversation(conversationName: string, documentId: number) {
        const res = await client.post('/conversations', { conversationName, documentId })
        return res.data
    },

    async getConversationByUser() {
        const res = await client.get('/conversations')
        return res.data
    },

    async updateConversationName(conversationId: number, newName: string) {
        const res = await client.put(`/conversations/${conversationId}`, { newName })
        return res.data
    },

    async getConversationById(conversationId: number) {
        const res = await client.get(`/conversations/${conversationId}`)
        return res.data
    },

    async getConversationByDocument(documentId: number) {
        const res = await client.get(`/documents/${documentId}/conversations/`)
        return res.data
    },

    async createMessage(conversationId: number, role: string, messageContent: string) {
        const res = await client.post(`/conversations/${conversationId}/messages`, { role, messageContent })
        return res.data
    },
    async getMessagesByConversation(conversationId: number) {
        const res = await client.get(`/conversations/${conversationId}/messages`)
        return res.data
    }

}