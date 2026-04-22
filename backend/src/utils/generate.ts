import OpenAI from "openai";
import dotenv from 'dotenv'

dotenv.config()


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export const generateAnswer = async (context: string, question: string): Promise<string> => {

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.2,
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful AI assistant.
                        Answer the question ONLY using the provided context.
                        If the answer is not in the context, say:
                        "I could not find the answer in the provided document."
                        Do not make up information.`,
                },
                {
                    role: 'user',
                    content:
                        `
                        ###Context:
                        ${context}

                        ###Question:
                        ${question}
                    `
                }
            ]

        })
        const response = completion.choices[0]?.message?.content;

        if (!response) {
            throw new Error("Empty LLM response");
        }

        return response;

    } catch (error) {
        console.error("LLM Error:", error);
        throw new Error("Failed to generate answer");
    }

}
