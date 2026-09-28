import express from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject, reorderProjects } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getProjects)
    .post(protect, createProject);

router.route('/reorder')
    .put(protect, reorderProjects);

router.route('/:id')
    .get(getProjectById)
    .put(protect, updateProject)
    .delete(protect, deleteProject);

export default router;
