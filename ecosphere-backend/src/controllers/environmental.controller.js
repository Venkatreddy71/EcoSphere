import { prisma } from '../config/db.js';
import carbonCalculator from '../services/carbonCalculator.service.js';

// ---- Emission Factors ----
export const getEmissionFactors = async (req, res, next) => {
  try {
    const factors = await prisma.emissionFactor.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: factors });
  } catch (error) { next(error); }
};

export const createEmissionFactor = async (req, res, next) => {
  try {
    const factor = await prisma.emissionFactor.create({ data: req.body });
    res.status(201).json({ status: 'success', data: factor });
  } catch (error) { next(error); }
};

export const deleteEmissionFactor = async (req, res, next) => {
  try {
    await prisma.emissionFactor.update({
      where: { id: req.params.id },
      data: { isDeleted: true }
    });
    res.json({ status: 'success', message: 'Factor deleted' });
  } catch (error) { next(error); }
};

// ---- Product Profiles ----
export const getProductProfiles = async (req, res, next) => {
  try {
    const profiles = await prisma.productProfile.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: profiles });
  } catch (error) { next(error); }
};

export const createProductProfile = async (req, res, next) => {
  try {
    const profile = await prisma.productProfile.create({ data: req.body });
    res.status(201).json({ status: 'success', data: profile });
  } catch (error) { next(error); }
};

export const deleteProductProfile = async (req, res, next) => {
  try {
    await prisma.productProfile.update({
      where: { id: req.params.id },
      data: { isDeleted: true }
    });
    res.json({ status: 'success', message: 'Profile deleted' });
  } catch (error) { next(error); }
};

// ---- Carbon Transactions ----
export const getCarbonTransactions = async (req, res, next) => {
  try {
    const transactions = await prisma.carbonTransaction.findMany({ 
      where: { isDeleted: false },
      orderBy: { timestamp: 'desc' }
    });
    res.json({ status: 'success', data: transactions });
  } catch (error) { next(error); }
};

export const createCarbonTransaction = async (req, res, next) => {
  try {
    const { co2e, scope } = await carbonCalculator.calculateEmissions(req.body);
    
    // Ensure deadline/timestamp formatting isn't lost if provided explicitly
    const data = { ...req.body, co2e, scope };
    
    const transaction = await prisma.carbonTransaction.create({ data });
    res.status(201).json({ status: 'success', data: transaction });
  } catch (error) { next(error); }
};

// ---- Goals ----
export const getGoals = async (req, res, next) => {
  try {
    const goals = await prisma.goal.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: goals });
  } catch (error) { next(error); }
};

export const createGoal = async (req, res, next) => {
  try {
    // Convert deadline to ISO Date object for Prisma
    const data = { ...req.body };
    if (data.deadline) data.deadline = new Date(data.deadline);
    
    const goal = await prisma.goal.create({ data });
    res.status(201).json({ status: 'success', data: goal });
  } catch (error) { next(error); }
};

export const deleteGoal = async (req, res, next) => {
  try {
    await prisma.goal.update({
      where: { id: req.params.id },
      data: { isDeleted: true }
    });
    res.json({ status: 'success', message: 'Goal deleted' });
  } catch (error) { next(error); }
};
