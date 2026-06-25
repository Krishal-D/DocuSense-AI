const INTENTS = [
    {
        keywords: ["hi", "hello", "hey", "good morning", "good evening"],
        reply: "Hi! 👋 How are you. Ask me anything about your uploaded documents."
    },
    {
        keywords: ["bye", "goodbye", "see you", "take care"],
        reply: "Goodbye! 👋 Have a great time."
    },
    {
        keywords: ["thanks", "thank you", "thx", "ty"],
        reply: "You're welcome! 😊"
    },
    {
        keywords: ["sorry", "my bad", "apologies"],
        reply: "No worries at all!"
    },
    {
        keywords: ["help", "who are you", "what can you do"],
        reply: "I'm DocuSense AI. Upload a PDF and ask questions about your documents."
    }
];

export function getCasualReply(message: string): string | null {
    const text = message
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, "");

    for (const intent of INTENTS) {
        if (intent.keywords.some(k => text === k || text.includes(k))) {
            return intent.reply;
        }
    }

    return null;
}