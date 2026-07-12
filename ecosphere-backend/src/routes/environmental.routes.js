import express from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validator.middleware.js';
import {
  getEmissionFactors, createEmissionFactor, deleteEmissionFactor,
  getProductProfiles, createProductProfile, deleteProductProfile,
  getCarbonTransactions, createCarbonTransaction,
  getGoals, createGoal, deleteGoal
} from '../controllers/environmental.controller.js';

const router = express.Router();

router.use(protect); // Secure module

// Emission Factors
router.route('/factors')
  .get(getEmissionFactors)
  .post(
    authorize('Admin', 'Manager'),
    [
      body('category').notEmpty().withMessage('Category is required'),
      body('factor').isNumeric().withMessage('Factor must be a number'),
      body('unit').notEmpty().withMessage('Unit is required'),
      body('scope').isIn(['Scope 1', 'Scope 2', 'Scope 3']).withMessage('Valid scope is required')
    ],
    validate,
    createEmissionFactor
  );
router.delete('/factors/:id', authorize('Admin'), deleteEmissionFactor);

// Product Profiles
router.route('/products')
  .get(getProductProfiles)
  .post(
    authorize('Admin', 'Manager'),
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('carbonProfile').isNumeric().withMessage('Carbon profile must be a number'),
      body('unit').notEmpty().withMessage('Unit is required'),
      body('factorId').notEmpty().withMessage('Factor ID is required')
    ],
    validate,
    createProductProfile
  );
router.delete('/products/:id', authorize('Admin'), deleteProductProfile);

// Carbon Transactions
router.route('/transactions')
  .get(getCarbonTransactions)
  .post(
    authorize('Admin', 'Manager', 'Employee'),
    [
      body('source').notEmpty().withMessage('Source is required'),
      body('departmentId').notEmpty().withMessage('Department ID is required'),
      body('transactionType').notEmpty().withMessage('Transaction Type is required')
    ],
    validate,
    createCarbonTransaction
  );

// Goals
router.route('/goals')
  .get(getGoals)
  .post(
    authorize('Admin', 'Manager'),
    [
      body('title').notEmpty().withMessage('Title is required'),
      body('target').isNumeric().withMessage('Target must be a number'),
      body('unit').notEmpty().withMessage('Unit is required'),
      body('deadline').notEmpty().withMessage('Deadline is required')
    ],
    validate,
    createGoal
  );
router.delete('/goals/:id', authorize('Admin'), deleteGoal);

export default router;
