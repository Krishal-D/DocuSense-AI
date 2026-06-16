import { useState } from 'react'
import { chatAPI } from '../api/chat'
import type { QueryResult } from '../types'

export const useChat = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendQuery = async (
        conversationId: number,
        question: string
    ): Promise<QueryResult | null> => {
        setLoading(true)
        setError(null)
        try {
            const data = await chatAPI.query(conversationId, question)
            return data
        } catch {
            setError('Failed to get answer')
            return null
        } finally {
            setLoading(false)
        }
    }

    return { sendQuery, loading, error }
}