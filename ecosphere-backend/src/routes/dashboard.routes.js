import express from 'express';
import { getSummary, getCharts, getKPIs } from '../controllers/dashboard.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Enterprise Dashboard API
 */

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get overall dashboard summary (ESG scores, user counts)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/summary', getSummary);

/**
 * @swagger
 * /dashboard/charts:
 *   get:
 *     summary: Get charting data for emissions
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/charts', getCharts);

/**
 * @swagger
 * /dashboard/kpis:
 *   get:
 *     summary: Get Key Performance Indicators
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/kpis', getKPIs);

export default router;
