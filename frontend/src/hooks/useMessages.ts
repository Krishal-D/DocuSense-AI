import { useState, useEffect } from 'react'
import { chatAPI } from '../api/chat'
import type { Message } from '../types'

export const useMessages = (conversationId: number | null) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)

    const fetchMessages = async () => {
        if (!conversationId) return
        setLoading(true)
        try {
            const data = await chatAPI.getMessagesByConversation(conversationId)
            setMessages(data.messages || [])
        } finally {
            setLoading(false)
        }
    }

    const addMessage = (message: Message) => {
        setMessages(prev => [...prev, message])
    }

    useEffect(() => {
        setMessages([])
        fetchMessages()
    }, [conversationId])

    return { messages, loading, addMessage, refetch: fetchMessages }
}