import express from 'express';
import authRoutes from './auth.routes.js';
import settingsRoutes from './settings.routes.js';
import environmentalRoutes from './environmental.routes.js';
import socialRoutes from './social.routes.js';
import governanceRoutes from './governance.routes.js';
import notificationRoutes from './notification.routes.js';
import reportRouter from './report.routes.js';
import aiRouter from './ai.routes.js';
import dashboardRouter from './dashboard.routes.js';
import documentRouter from './document.routes.js';
import { auditLogger } from '../middleware/audit.middleware.js';

const router = express.Router();

// Apply Enterprise Audit Middleware to all API routes
router.use(auditLogger);

router.get('/status', (req, res) => {
  res.json({ message: 'API is operational' });
});

router.use('/auth', authRoutes);
router.use('/settings', settingsRoutes);
router.use('/environmental', environmentalRoutes);
router.use('/social', socialRoutes);
router.use('/governance', governanceRoutes);
router.use('/notifications', notificationRoutes);
router.use('/reports', reportRouter);
router.use('/ai', aiRouter);
router.use('/dashboard', dashboardRouter);
router.use('/documents', documentRouter);

export default router;
