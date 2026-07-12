import express from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validator.middleware.js';
import {
  getPolicies, createPolicy, acknowledgePolicy,
  getAudits, createAudit,
  getComplianceIssues, createComplianceIssue, resolveComplianceIssue
} from '../controllers/governance.controller.js';

const router = express.Router();

router.use(protect); // Secure module

// Policies
router.route('/policies')
  .get(getPolicies)
  .post(
    authorize('Admin', 'Manager'),
    [
      body('title').notEmpty().withMessage('Title is required'),
      body('content').notEmpty().withMessage('Content is required')
    ],
    validate,
    createPolicy
  );

router.post('/policies/acknowledge', 
  [body('policyId').notEmpty().withMessage('Policy ID required')], 
  validate, 
  acknowledgePolicy
);

// Audits
router.route('/audits')
  .get(getAudits)
  .post(
    authorize('Admin', 'Manager'),
    [
      body('title').notEmpty().withMessage('Title is required'),
      body('auditor').notEmpty().withMessage('Auditor is required'),
      body('date').notEmpty().withMessage('Date is required'),
      body('scope').notEmpty().withMessage('Scope is required')
    ],
    validate,
    createAudit
  );

// Compliance Issues
router.route('/compliance')
  .get(getComplianceIssues)
  .post(
    authorize('Admin', 'Manager'),
    [
      body('auditId').notEmpty().withMessage('Audit ID is required'),
      body('severity').notEmpty().withMessage('Severity is required'),
      body('description').notEmpty().withMessage('Description is required'),
      body('owner').notEmpty().withMessage('Owner is required'),
      body('dueDate').notEmpty().withMessage('Due Date is required')
    ],
    validate,
    createComplianceIssue
  );

router.put('/compliance/:id/resolve', authorize('Admin', 'Manager'), resolveComplianceIssue);

export default router;
