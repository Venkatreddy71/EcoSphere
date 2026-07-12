import { prisma } from '../config/db.js';

// ---- Policies ----
export const getPolicies = async (req, res, next) => {
  try {
    const policies = await prisma.policy.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: policies });
  } catch (error) { next(error); }
};

export const createPolicy = async (req, res, next) => {
  try {
    const policy = await prisma.policy.create({ data: req.body });
    res.status(201).json({ status: 'success', data: policy });
  } catch (error) { next(error); }
};

export const acknowledgePolicy = async (req, res, next) => {
  try {
    const { policyId } = req.body;
    const existing = await prisma.policyAcknowledgement.findFirst({ 
      where: { policyId, employeeId: req.user.id } 
    });
    if (existing) return res.status(400).json({ status: 'error', message: 'Policy already acknowledged' });

    const ack = await prisma.policyAcknowledgement.create({
      data: {
        policyId,
        employeeId: req.user.id,
        dateAcknowledged: new Date()
      }
    });
    res.status(201).json({ status: 'success', data: ack });
  } catch (error) { next(error); }
};

// ---- Audits ----
export const getAudits = async (req, res, next) => {
  try {
    const audits = await prisma.audit.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: audits });
  } catch (error) { next(error); }
};

export const createAudit = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.date) data.date = new Date(data.date);
    
    const audit = await prisma.audit.create({ data });
    res.status(201).json({ status: 'success', data: audit });
  } catch (error) { next(error); }
};

// ---- Compliance Issues ----
export const getComplianceIssues = async (req, res, next) => {
  try {
    const issues = await prisma.complianceIssue.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: issues });
  } catch (error) { next(error); }
};

export const createComplianceIssue = async (req, res, next) => {
  try {
    const data = { ...req.body };
    // Prisma model uses 'ownerName' and optional 'ownerId'. The frontend sends 'owner'.
    if (data.owner) {
      data.ownerName = data.owner;
      delete data.owner;
    }
    if (data.dueDate) data.dueDate = new Date(data.dueDate);
    
    const issue = await prisma.complianceIssue.create({ data });
    res.status(201).json({ status: 'success', data: issue });
  } catch (error) { next(error); }
};

export const resolveComplianceIssue = async (req, res, next) => {
  try {
    const issue = await prisma.complianceIssue.update({
      where: { id: req.params.id }, 
      data: { status: 'Resolved' }
    });
    res.json({ status: 'success', data: issue });
  } catch (error) { next(error); }
};
