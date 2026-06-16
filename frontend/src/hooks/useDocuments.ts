import { useState, useEffect } from 'react'
import { documentAPI } from '../api/documents'
import type { Document } from '../types'

export const useDocuments = () => {
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchDocuments = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await documentAPI.findDocumentByUser()
            setDocuments(data?.document || [])
        } catch {
            setError('Failed to load documents')
        } finally {
            setLoading(false)
        }
    }

    const uploadDocument = async (file: File, name: string) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('documentName', name)
        await documentAPI.uploadDocument(formData)
        await fetchDocuments()
    }

    const deleteDocument = async (id: number) => {
        await documentAPI.deleteDocument(id)
        setDocuments(prev => prev.filter(d => d.id !== id))
    }

    useEffect(() => { fetchDocuments() }, [])

    return { documents, loading, error, uploadDocument, deleteDocument }
}