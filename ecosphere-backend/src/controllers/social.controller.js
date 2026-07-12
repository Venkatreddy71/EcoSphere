import { prisma } from '../config/db.js';

// ---- CSR Activities ----
export const getCSRActivities = async (req, res, next) => {
  try {
    const activities = await prisma.cSRActivity.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: activities });
  } catch (error) { next(error); }
};

export const createCSRActivity = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.date) data.date = new Date(data.date);
    
    const activity = await prisma.cSRActivity.create({ data });
    res.status(201).json({ status: 'success', data: activity });
  } catch (error) { next(error); }
};

export const joinCSRActivity = async (req, res, next) => {
  try {
    const participation = await prisma.cSRParticipation.create({
      data: {
        activityId: req.body.activityId,
        employeeId: req.user.id,
        proofText: req.body.proofText || '',
        approvalStatus: req.user.role === 'Admin' ? 'Approved' : 'Under Review'
      }
    });
    res.status(201).json({ status: 'success', data: participation });
  } catch (error) { next(error); }
};

// ---- Challenges ----
export const getChallenges = async (req, res, next) => {
  try {
    const challenges = await prisma.challenge.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: challenges });
  } catch (error) { next(error); }
};

export const createChallenge = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.deadline) data.deadline = new Date(data.deadline);
    
    const challenge = await prisma.challenge.create({ data });
    res.status(201).json({ status: 'success', data: challenge });
  } catch (error) { next(error); }
};

export const joinChallenge = async (req, res, next) => {
  try {
    const existing = await prisma.challengeParticipation.findFirst({ 
      where: { challengeId: req.body.challengeId, employeeId: req.user.id } 
    });
    if (existing) return res.status(400).json({ status: 'error', message: 'Already participating' });
    
    const participation = await prisma.challengeParticipation.create({
      data: {
        challengeId: req.body.challengeId,
        employeeId: req.user.id,
        progress: 0,
        approvalStatus: 'Active'
      }
    });
    res.status(201).json({ status: 'success', data: participation });
  } catch (error) { next(error); }
};

export const updateChallengeProgress = async (req, res, next) => {
  try {
    const { progress, proofText } = req.body;
    const isComplete = progress === 100;
    
    const participation = await prisma.challengeParticipation.update({
      where: { id: req.params.id },
      data: {
        progress,
        proofText,
        approvalStatus: isComplete ? 'Under Review' : 'Active',
        completionDate: isComplete ? new Date() : null
      }
    });
    
    res.json({ status: 'success', data: participation });
  } catch (error) { next(error); }
};

// ---- Gamification (Rewards & Badges) ----
export const getRewards = async (req, res, next) => {
  try {
    const rewards = await prisma.reward.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: rewards });
  } catch (error) { next(error); }
};

export const getBadges = async (req, res, next) => {
  try {
    const badges = await prisma.badge.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: badges });
  } catch (error) { next(error); }
};
