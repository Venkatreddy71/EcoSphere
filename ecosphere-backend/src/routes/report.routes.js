import express from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validator.middleware.js';
import { getReports, generateReport } from '../controllers/report.controller.js';

const router = express.Router();

router.use(protect);

router.get('/', getReports);
router.post('/generate', 
  authorize('Admin', 'Manager'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('format').isIn(['pdf', 'csv', 'json']).withMessage('Format must be pdf, csv, or json')
  ],
  validate,
  generateReport
);

export default router;
