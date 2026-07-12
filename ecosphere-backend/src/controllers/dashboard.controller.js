import { getDashboardSummary, getDashboardCharts, getDashboardKPIs } from '../services/dashboardAnalytics.service.js';

export const getSummary = async (req, res, next) => {
  try {
    const data = await getDashboardSummary();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const getCharts = async (req, res, next) => {
  try {
    const data = await getDashboardCharts();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const getKPIs = async (req, res, next) => {
  try {
    const data = await getDashboardKPIs();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};
