interface Props {
    conversationId: number
    documentId: number
}

const ChatWindow = ({ conversationId }: Props) => {
    return (
        <div className="flex h-full items-center justify-center">
            <p className="text-[#8A8680] text-sm">
                Conversation {conversationId}
            </p>
        </div>
    )
}

export default ChatWindow