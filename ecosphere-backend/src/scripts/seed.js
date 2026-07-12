import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const importData = async () => {
  try {
    console.log('Clearing database...');
    // Delete in reverse order of dependencies
    await prisma.auditLog.deleteMany();
    await prisma.document.deleteMany();
    await prisma.aIMessage.deleteMany();
    await prisma.aIConversation.deleteMany();
    await prisma.report.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.complianceIssue.deleteMany();
    await prisma.audit.deleteMany();
    await prisma.policyAcknowledgement.deleteMany();
    await prisma.policy.deleteMany();
    await prisma.badge.deleteMany();
    await prisma.reward.deleteMany();
    await prisma.challengeParticipation.deleteMany();
    await prisma.challenge.deleteMany();
    await prisma.cSRParticipation.deleteMany();
    await prisma.cSRActivity.deleteMany();
    await prisma.goal.deleteMany();
    await prisma.carbonTransaction.deleteMany();
    await prisma.productProfile.deleteMany();
    await prisma.emissionFactor.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    await prisma.department.deleteMany();

    console.log('Seeding Departments...');
    const d1 = await prisma.department.create({ data: { name: 'Engineering', code: 'ENG', head: 'Sarah Connor', employeeCount: 150 } });
    await prisma.department.create({ data: { name: 'Marketing', code: 'MKT', head: 'John Smith', employeeCount: 45 } });
    await prisma.department.create({ data: { name: 'Operations', code: 'OPS', head: 'Jane Doe', employeeCount: 200 } });

    console.log('Seeding Users...');
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    await prisma.user.create({ data: { name: 'Admin User', email: 'admin@ecosphere.com', password, role: 'Admin', departmentId: d1.id, xp: 5000, points: 1200, avatar: 'AD' } });
    await prisma.user.create({ data: { name: 'Manager User', email: 'manager@ecosphere.com', password, role: 'Manager', departmentId: d1.id, xp: 2000, points: 500, avatar: 'MA' } });
    await prisma.user.create({ data: { name: 'Employee User', email: 'employee@ecosphere.com', password, role: 'Employee', departmentId: d1.id, xp: 150, points: 50, avatar: 'EM' } });

    console.log('Seeding Emission Factors & Products...');
    const f1 = await prisma.emissionFactor.create({ data: { category: 'Electricity', factor: 0.85, unit: 'kWh', scope: 'Scope 2' } });
    await prisma.emissionFactor.create({ data: { category: 'Commute', factor: 0.12, unit: 'km', scope: 'Scope 3' } });

    await prisma.productProfile.create({ data: { name: 'Server Hosting (1 Month)', carbonProfile: 120, unit: 'Month', factorId: f1.id, description: 'Standard AWS instance' } });

    console.log('Seeding Goals...');
    await prisma.goal.create({ data: { title: 'Reduce Energy Consumption by 10%', target: 10000, current: 8500, unit: 'kWh', deadline: new Date('2026-12-31') } });
    await prisma.goal.create({ data: { title: 'Zero Waste to Landfill', target: 100, current: 75, unit: '%', deadline: new Date('2025-12-31') } });

    console.log('Seeding Social & Governance...');
    await prisma.cSRActivity.create({ data: { name: 'Local Beach Cleanup', category: 'Environmental', date: new Date('2026-08-15'), xp: 100, pointsReward: 50, status: 'Active' } });
    await prisma.cSRActivity.create({ data: { name: 'Food Drive', category: 'Social', date: new Date('2026-09-01'), xp: 50, pointsReward: 25, status: 'Active' } });

    await prisma.challenge.create({ data: { title: 'Bike to Work Week', category: 'Environmental', description: 'Bike to work for 5 days', xp: 200, difficulty: 'Medium', evidenceRequired: true } });
    await prisma.challenge.create({ data: { title: 'Meatless Monday', category: 'Environmental', description: 'Eat vegetarian for a day', xp: 50, difficulty: 'Easy', evidenceRequired: false } });

    await prisma.policy.create({ data: { title: 'Anti-Bribery and Corruption Policy', content: 'We maintain a zero-tolerance approach to bribery...', status: 'Active' } });
    await prisma.policy.create({ data: { title: 'Data Privacy Policy', content: 'We are committed to protecting personal data...', status: 'Active' } });

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

importData();
