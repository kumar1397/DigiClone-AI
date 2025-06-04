import express from 'express';
import {
  saveMessage,
  getUserConversations,
  getConversationByClone,
} from '../controllers/conversation.js';
// import authMiddleware from '../middleware/auth.js'; // assumes JWT middleware

const router = express.Router();

router.post('/save', saveMessage);
router.get('/', getUserConversations);
router.get('/:cloneId', getConversationByClone);

export default router;
