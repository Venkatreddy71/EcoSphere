import { logAudit } from '../services/audit.service.js';

export const auditLogger = (req, res, next) => {
  // Capture the original send method
  const originalSend = res.send;

  res.send = function (body) {
    res.send = originalSend;

    // Only log state-changing requests (POST, PUT, DELETE, PATCH)
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
      
      const userId = req.user ? req.user.id : null;
      let entity = req.baseUrl.split('/').pop();
      if (!entity || entity === 'api') {
        entity = req.path.split('/')[1] || 'System';
      }

      logAudit({
        action: `${req.method} ${req.originalUrl}`,
        entity: entity,
        userId: userId,
        ipAddress: req.ip || req.connection.remoteAddress,
        details: {
          statusCode: res.statusCode,
          body: typeof body === 'string' ? body.substring(0, 100) : 'binary/json'
        }
      });
    }

    return res.send(body);
  };

  next();
};
