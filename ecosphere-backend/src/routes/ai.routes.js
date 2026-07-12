import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validator.middleware.js';
import { getConversations, startOrContinueConversation, recommend, risk, forecast } from '../controllers/ai.controller.js';

const router = express.Router();

router.use(protect);

router.get('/conversations', getConversations);
router.post('/ask', 
  [body('message').notEmpty().withMessage('Message is required')],
  validate,
  startOrContinueConversation
);

router.post('/recommend', protect, recommend);
router.post('/risk', protect, risk);
router.post('/forecast', protect, forecast);

export default router;
