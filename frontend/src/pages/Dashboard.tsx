import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/layouts/SideBar'
import EmptyState from '../components/ui/EmptyState'
import ChatWindow from '../components/chat/ChatWindow'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'

const Dashboard = () => {
    const { documentId, conversationId } = useParams()
    const navigate = useNavigate()

    const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(
        documentId ? Number(documentId) : null
    )

    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(
        conversationId ? Number(conversationId) : null
    )

    const [sidebarOpen, setSidebarOpen] = useState(true)

    const handleSelectDocument = (id: number) => {
        setSelectedDocumentId(id)
        setSelectedConversationId(null)
        navigate(`/dashboard/document/${id}`)
    }

    const handleSelectConversation = (id: number) => {
        setSelectedConversationId(id)

        if (selectedDocumentId) {
            navigate(`/dashboard/document/${selectedDocumentId}/conversation/${id}`)
        }
    }

    return (
        <div className="flex h-screen bg-[#F8F7F4] overflow-hidden">
            {sidebarOpen && (
                <Sidebar
                    selectedDocumentId={selectedDocumentId}
                    selectedConversationId={selectedConversationId}
                    onSelectDocument={handleSelectDocument}
                    onSelectConversation={handleSelectConversation}
                />
            )}

            <main className="flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center p-3 border-b border-[#E5E2DC] bg-white">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-[#F0EDE8] transition-colors"
                    >
                        <HiOutlineMenuAlt2 className="w-5 h-5 text-[#8A8680]" />
                    </button>
                </div>

                <div className="flex-1 overflow-hidden">
                    {selectedConversationId && selectedDocumentId ? (
                        <ChatWindow
                            conversationId={selectedConversationId}
                            documentId={selectedDocumentId}
                        />
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </main>
        </div>
    )
}

export default Dashboard