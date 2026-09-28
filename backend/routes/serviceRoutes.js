import express from 'express';
import { getServices, getServiceById, createService, updateService, deleteService, reorderServices } from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protect, createService);

router.route('/reorder')
  .put(protect, reorderServices);

router.route('/:id')
  .get(getServiceById)
  .put(protect, updateService)
  .delete(protect, deleteService);

export default router;