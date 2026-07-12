import { prisma } from '../config/db.js';

/**
 * Creates an audit log entry in the database.
 */
export const logAudit = async (data) => {
  try {
    await prisma.auditLog.create({
      data: {
        action: data.action,
        entity: data.entity,
        entityId: data.entityId || null,
        userId: data.userId || null,
        details: data.details || {},
        ipAddress: data.ipAddress || null
      }
    });
  } catch (error) {
    console.error('[AUDIT_LOG_ERROR]', error.message);
  }
};
