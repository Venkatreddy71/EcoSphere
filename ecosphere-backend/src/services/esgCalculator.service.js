import { prisma } from '../config/db.js';

/**
 * Enterprise ESG Score Calculator
 * Dynamically aggregates Carbon Transactions (Environmental),
 * CSR and Challenges (Social), and Policy/Audits (Governance).
 */
export const calculateESGScore = async () => {
  // Environmental calculation (Based on emission reductions or goals vs current emissions)
  // Let's assume a baseline score of 50, and emissions subtract from it, goals met add to it
  const transactions = await prisma.carbonTransaction.findMany({
    where: { isDeleted: false }
  });
  const totalEmissions = transactions.reduce((acc, curr) => acc + curr.co2e, 0);

  // Example simple heuristic for Environment Score out of 100
  // In a real app, this would be compared against industry baselines.
  let envScore = 100 - (totalEmissions / 1000); // 1 point lost per 1000 co2e
  if (envScore < 0) envScore = 0;
  if (envScore > 100) envScore = 100;

  // Social calculation (CSR Participations, Challenge participations, Points/XP)
  const users = await prisma.user.findMany({
    where: { isDeleted: false }
  });
  const totalXP = users.reduce((acc, user) => acc + user.xp, 0);
  const averageXP = users.length > 0 ? totalXP / users.length : 0;
  
  // Example simple heuristic for Social Score
  let socScore = 50 + (averageXP / 10);
  if (socScore > 100) socScore = 100;

  // Governance calculation (Policy acknowledgements vs total users, Audit compliance)
  const policies = await prisma.policy.count({ where: { status: 'Active', isDeleted: false } });
  const acknowledgements = await prisma.policyAcknowledgement.count({ where: { isDeleted: false } });
  
  const expectedAcks = policies * users.length;
  const ackRatio = expectedAcks > 0 ? acknowledgements / expectedAcks : 1;

  const openAudits = await prisma.audit.count({ where: { status: 'Open', isDeleted: false } });
  
  let govScore = (ackRatio * 100) - (openAudits * 5);
  if (govScore < 0) govScore = 0;
  if (govScore > 100) govScore = 100;

  // Overall ESG Score
  const overallScore = (envScore * 0.4) + (socScore * 0.3) + (govScore * 0.3);

  return {
    overall: Math.round(overallScore),
    environmental: Math.round(envScore),
    social: Math.round(socScore),
    governance: Math.round(govScore),
    metrics: {
      totalEmissions,
      averageEmployeeXP: Math.round(averageXP),
      policyAcknowledgementRate: (ackRatio * 100).toFixed(1) + '%'
    }
  };
};
