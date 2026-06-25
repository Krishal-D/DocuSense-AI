import express from "express";
import { chatController } from "../controllers/chatController";
import { authenticate } from "../middleware/auth";


const router = express.Router()

router.post('/conversations/:conversationId/query', authenticate, chatController.query)
router.post('/conversations', authenticate, chatController.createConversation)
router.get('/conversations', authenticate, chatController.getConversationsByUser)
router.get('/documents/:documentId/conversations', authenticate, chatController.getConversationsByDocument)
router.get('/conversations/:conversationId', authenticate, chatController.getConversationById)
router.put('/conversations/:conversationId', authenticate, chatController.updateConversationName)
router.get('/conversations/:conversationId/messages', authenticate, chatController.getMessagesByConversation)
router.post('/conversations/:conversationId/messages', authenticate, chatController.createMessage)
router.delete('/conversations/:conversationId', authenticate, chatController.deleteConversation)




export default router