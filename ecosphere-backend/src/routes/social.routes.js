import express from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validator.middleware.js';
import {
  getCSRActivities, createCSRActivity, joinCSRActivity,
  getChallenges, createChallenge, joinChallenge, updateChallengeProgress,
  getRewards, getBadges
} from '../controllers/social.controller.js';

const router = express.Router();

router.use(protect); // Secure module

// CSR Activities
router.route('/csr')
  .get(getCSRActivities)
  .post(
    authorize('Admin', 'Manager'),
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('category').notEmpty().withMessage('Category is required'),
      body('date').notEmpty().withMessage('Date is required')
    ],
    validate,
    createCSRActivity
  );

router.post('/csr/join', 
  [body('activityId').notEmpty().withMessage('Activity ID required')], 
  validate, 
  joinCSRActivity
);

// Challenges
router.route('/challenges')
  .get(getChallenges)
  .post(
    authorize('Admin', 'Manager'),
    [
      body('title').notEmpty().withMessage('Title is required'),
      body('category').notEmpty().withMessage('Category is required')
    ],
    validate,
    createChallenge
  );

router.post('/challenges/join', 
  [body('challengeId').notEmpty().withMessage('Challenge ID required')], 
  validate, 
  joinChallenge
);

router.put('/challenges/progress/:id', updateChallengeProgress);

// Rewards and Badges
router.get('/rewards', getRewards);
router.get('/badges', getBadges);

export default router;
