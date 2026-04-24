import { documentService } from "../services/documentService";
import type { Request, Response, NextFunction } from "express";

export const documentController = {

    async uploadDocument(req: Request, res: Response, next: NextFunction) {
        try {
            const { documentName, status } = req.body;
            const ownerId = req.user?.id;
            const pdfBuffer = req.file?.buffer;

            const document = await documentService.uploadDocument(documentName, ownerId, status, pdfBuffer);
            return res.status(201).json({ document: document.document, message: "File uploaded successfully" });
        } catch (error) {
            next(error);
        }
    },

    async findDocumentByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const ownerId = req.user?.id;

            const { document } = await documentService.findDocumentByUser(ownerId);
            return res.status(200).json({ document });
        } catch (error) {
            next(error);
        }
    },

    async deleteDocument(req: Request, res: Response, next: NextFunction) {
        try {
            const documentId = req.params.id as string;
            const ownerId = req.user?.id;

            await documentService.deleteDocument(documentId, ownerId);
            return res.status(200).json({ message: "Document deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
};