import { HiOutlineDocument } from 'react-icons/hi'

const EmptyState = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center px-6">
            <HiOutlineDocument className="w-16 h-16 text-[#8A8680]" />
            <h2 className="text-xl font-semibold text-[#1A1A1A]">
                No conversation selected
            </h2>
            <p className="text-sm text-[#8A8680] max-w-sm">
                Select a document from the sidebar and start a new conversation to ask questions about it.
            </p>
        </div>
    )
}

export default EmptyState