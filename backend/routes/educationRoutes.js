import express from 'express';
import { getEducations, getEducationById, createEducation, updateEducation, deleteEducation, reorderEducations } from '../controllers/educationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getEducations)
  .post(protect, createEducation);

router.route('/reorder')
  .put(protect, reorderEducations);

router.route('/:id')
  .get(getEducationById)
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

export default router;