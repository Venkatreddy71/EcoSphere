import express from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validator.middleware.js';
import {
  getDepartments, createDepartment, updateDepartment, deleteDepartment,
  getCategories, createCategory, deleteCategory
} from '../controllers/settings.controller.js';

const router = express.Router();

router.use(protect); // All settings routes require authentication

// Departments
router.route('/departments')
  .get(getDepartments)
  .post(
    authorize('Admin', 'Manager'),
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('code').notEmpty().withMessage('Code is required'),
      body('head').notEmpty().withMessage('Head is required')
    ],
    validate,
    createDepartment
  );

router.route('/departments/:id')
  .put(authorize('Admin', 'Manager'), updateDepartment)
  .delete(authorize('Admin'), deleteDepartment);

// Categories
router.route('/categories')
  .get(getCategories)
  .post(
    authorize('Admin', 'Manager'),
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('type').notEmpty().withMessage('Type is required')
    ],
    validate,
    createCategory
  );

router.route('/categories/:id')
  .delete(authorize('Admin'), deleteCategory);

export default router;
