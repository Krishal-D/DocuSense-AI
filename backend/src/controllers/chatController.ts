import type { Request, Response, NextFunction } from "express";
import { chatService } from "../services/chatService";

export const chatController = {
    async query(req: Request, res: Response, next: NextFunction) {
        try {
            const conversationId = req.params.conversationId as string;
            const { question } = req.body;
            const ownerId = req.user?.id;

            const result = await chatService.queryDocument(question, conversationId, ownerId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async createConversation(req: Request, res: Response, next: NextFunction) {
        try {
            const { conversationName, documentId } = req.body;
            const ownerId = req.user?.id;

            const conversations = await chatService.createConversation(conversationName, documentId, ownerId);
            console.log('body:', req.body)
            return res.status(201).json({ conversation: conversations.conversation });
        } catch (error) {
            next(error);
        }
    },

    async updateConversationName(req: Request, res: Response, next: NextFunction) {
        try {
            const conversationId = req.params.conversationId as string;
            const ownerId = req.user?.id;
            const { newName } = req.body;

            const conversations = await chatService.updateConversationName(conversationId, ownerId, newName);
            return res.status(200).json({ message: "Conversation updated successfully", newName: conversations.conversation.conversation_name });
        } catch (error) {
            next(error);
        }
    },

    async getConversationsByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const ownerId = req.user?.id;

            const conversations = await chatService.getConversationsByUser(ownerId);
            return res.status(200).json({ conversations: conversations.conversation });
        } catch (error) {
            next(error);
        }
    },

    async getConversationsByDocument(req: Request, res: Response, next: NextFunction) {
        try {
            const ownerId = req.user?.id;
            const documentId = req.params.documentId as string;

            const conversations = await chatService.getConversationsByDocument(ownerId, documentId);
            return res.status(200).json({ conversations: conversations.conversation });
        } catch (error) {
            next(error);
        }
    },

    async getConversationById(req: Request, res: Response, next: NextFunction) {
        try {
            const ownerId = req.user?.id;
            const conversationId = req.params.conversationId as string;

            const conversations = await chatService.getConversationById(ownerId, conversationId);
            return res.status(200).json({ conversation: conversations.conversation });
        } catch (error) {
            next(error);
        }
    },

    async createMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const conversationId = req.params.conversationId as string;
            const { role, messageContent } = req.body;
            const ownerId = req.user?.id;

            const message = await chatService.createMessage(conversationId, role, messageContent, ownerId);
            return res.status(201).json({ message });
        } catch (error) {
            next(error);
        }
    },

    async getMessagesByConversation(req: Request, res: Response, next: NextFunction) {
        try {
            const ownerId = req.user?.id;
            const conversationId = req.params.conversationId as string;

            const messages = await chatService.getMessagesByConversation(ownerId, conversationId);
            return res.status(200).json({ messages });
        } catch (error) {
            next(error);
        }
    },
    async deleteConversation(req: Request, res: Response, next: NextFunction) {
        try {
            const conversationId = Number(req.params.conversationId)
            const ownerId = req.user?.id
            if (!ownerId) return res.status(401).json({ message: 'Unauthorized' })
            await chatService.deleteConversation(ownerId, conversationId)
            return res.status(200).json({ message: 'Deleted' })
        } catch (error) {
            next(error)
        }
    }
}