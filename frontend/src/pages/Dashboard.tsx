import { useState } from 'react'
import Sidebar from '../components/layouts/SideBar'
import EmptyState from '../components/ui/EmptyState'
import ChatWindow from '../components/chat/ChatWindow'

const Dashboard = () => {
    const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null)
    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null)

    const handleSelectDocument = (id: number) => {
        setSelectedDocumentId(id)
        setSelectedConversationId(null)
    }

    return (
        <div className="flex h-screen bg-[#F8F7F4] overflow-hidden">
            <Sidebar
                selectedDocumentId={selectedDocumentId}
                selectedConversationId={selectedConversationId}
                onSelectDocument={handleSelectDocument}
                onSelectConversation={setSelectedConversationId}
            />
            <main className="flex-1 overflow-hidden">
                {selectedConversationId ? (
                    <ChatWindow
                        conversationId={selectedConversationId}
                        documentId={selectedDocumentId!}
                    />
                ) : (
                    <EmptyState />
                )}
            </main>
        </div>
    )
}

export default Dashboard