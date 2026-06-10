import express from 'express';
import { createMessage, getMessages, updateMessage, deleteMessage } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(createMessage)
    .get(protect, getMessages);

router.route('/:id')
    .put(protect, updateMessage)
    .delete(protect, deleteMessage);

export default router;
