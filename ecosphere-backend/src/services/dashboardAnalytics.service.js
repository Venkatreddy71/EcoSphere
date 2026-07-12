import { prisma } from '../config/db.js';
import { calculateESGScore } from './esgCalculator.service.js';

/**
 * Generates summary and executive analytics for the dashboard
 */
export const getDashboardSummary = async () => {
  const esgScores = await calculateESGScore();

  const totalUsers = await prisma.user.count({ where: { isDeleted: false } });
  const totalDepartments = await prisma.department.count({ where: { isDeleted: false } });

  // Get top departments by xp
  const topDepartments = await prisma.department.findMany({
    where: { isDeleted: false },
    include: {
      users: {
        select: { xp: true }
      }
    }
  });

  const departmentRanking = topDepartments.map(dept => {
    const totalXP = dept.users.reduce((sum, user) => sum + user.xp, 0);
    return {
      id: dept.id,
      name: dept.name,
      totalXP
    };
  }).sort((a, b) => b.totalXP - a.totalXP).slice(0, 5);

  const activeGoals = await prisma.goal.count({ where: { status: 'On Track', isDeleted: false } });

  return {
    esgScores,
    overview: {
      totalUsers,
      totalDepartments,
      activeGoals
    },
    departmentRanking
  };
};

export const getDashboardCharts = async () => {
  // Aggregate emissions by month for chart
  const transactions = await prisma.carbonTransaction.findMany({
    where: { isDeleted: false },
    select: { timestamp: true, co2e: true }
  });

  const emissionsTrend = transactions.reduce((acc, curr) => {
    const month = curr.timestamp.toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + curr.co2e;
    return acc;
  }, {});

  return {
    emissionsTrend: Object.keys(emissionsTrend).map(key => ({
      label: key,
      value: emissionsTrend[key]
    }))
  };
};

export const getDashboardKPIs = async () => {
  // Key performance indicators for enterprise view
  const openIssues = await prisma.complianceIssue.count({ where: { status: 'Open', isDeleted: false } });
  
  return {
    complianceRisk: openIssues > 10 ? 'High' : (openIssues > 5 ? 'Medium' : 'Low'),
    openComplianceIssues: openIssues
  };
};
