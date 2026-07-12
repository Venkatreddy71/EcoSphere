import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_here');
      
      const user = await prisma.user.findUnique({ 
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          departmentId: true,
          xp: true,
          points: true,
          badges: true,
          avatar: true,
          status: true
        }
      });

      if (!user) {
        return res.status(401).json({ status: 'error', message: 'Not authorized, user not found' });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ status: 'error', message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ status: 'error', message: 'Not authorized, no token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ status: 'error', message: `User role ${req.user?.role} is not authorized` });
    }
    next();
  };
};
