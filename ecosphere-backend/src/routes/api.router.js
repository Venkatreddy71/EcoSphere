import express from 'express';
import authRoutes from './auth.routes.js';
import settingsRoutes from './settings.routes.js';
import environmentalRoutes from './environmental.routes.js';
import socialRoutes from './social.routes.js';
import governanceRoutes from './governance.routes.js';
import notificationRoutes from './notification.routes.js';
import reportRoutes from './report.routes.js';
import aiRoutes from './ai.routes.js';

const router = express.Router();

router.get('/status', (req, res) => {
  res.json({ message: 'API is operational' });
});

router.use('/auth', authRoutes);
router.use('/settings', settingsRoutes);
router.use('/environmental', environmentalRoutes);
router.use('/social', socialRoutes);
router.use('/governance', governanceRoutes);
router.use('/notifications', notificationRoutes);
router.use('/reports', reportRoutes);
router.use('/ai', aiRoutes);

export default router;
