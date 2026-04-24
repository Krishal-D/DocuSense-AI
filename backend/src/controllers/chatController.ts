import type { Request, Response, NextFunction } from "express";
import { chatService } from "../services/chatService";

export const chatController = {
    async query(req: Request, res: Response, next: NextFunction) {
        try {
            const { question } = req.body;
            const ownerId = req.user?.id;

            const result = await chatService.queryDocument(question, ownerId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async createConversation(req: Request, res: Response, next: NextFunction) {
        try {
            const { conversationName, documentId } = req.body;
            const ownerId = req.user?.id;

            const { conversation } = await chatService.createConversation(conversationName, documentId, ownerId);
            return res.status(201).json({ conversation });
        } catch (error) {
            next(error);
        }
    },

    async updateConversationName(req: Request, res: Response, next: NextFunction) {
        try {
            const conversationId = req.params.id as string;
            const ownerId = req.user?.id;
            const { newName } = req.body;

            const { conversation } = await chatService.updateConversationName(conversationId, ownerId, newName);
            return res.status(200).json({ message: "Conversation updated successfully", newName: conversation.conversation_name });
        } catch (error) {
            next(error);
        }
    },

    async getConversationsByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const ownerId = req.user?.id;

            const { conversation } = await chatService.getConversationsByUser(ownerId);
            return res.status(200).json({ conversation });
        } catch (error) {
            next(error);
        }
    },

    async getConversationsByDocument(req: Request, res: Response, next: NextFunction) {
        try {
            const ownerId = req.user?.id;
            const documentId = req.params.id as string;

            const { conversation } = await chatService.getConversationsByDocument(ownerId, documentId);
            return res.status(200).json({ conversation });
        } catch (error) {
            next(error);
        }
    },

    async getConversationById(req: Request, res: Response, next: NextFunction) {
        try {
            const ownerId = req.user?.id;
            const conversationId = req.params.id as string;

            const { conversation } = await chatService.getConversationById(ownerId, conversationId);
            return res.status(200).json({ conversation });
        } catch (error) {
            next(error);
        }
    },

    async createMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const { conversationId, role, messageContent } = req.body;
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
            const conversationId = req.params.id as string;

            const messages = await chatService.getMessagesByConversation(ownerId, conversationId);
            return res.status(200).json({ messages });
        } catch (error) {
            next(error);
        }
    }
}