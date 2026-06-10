import express from 'express';
import { authUser, registerUser, updatePassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.put('/password', protect, updatePassword);

export default router;
