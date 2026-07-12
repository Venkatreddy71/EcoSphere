import { prisma } from '../config/db.js';
import notificationService from '../services/notification.service.js';

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          { recipientId: req.user.id },
          { recipientId: null }
        ],
        isDeleted: false
      },
      orderBy: { time: 'desc' },
      take: 50
    });
    
    res.json({ status: 'success', data: notifications });
  } catch (error) { next(error); }
};

export const markAsRead = async (req, res, next) => {
  try {
    const notif = await notificationService.markAsRead(req.params.id);
    res.json({ status: 'success', data: notif });
  } catch (error) { next(error); }
};

export const markAllAsRead = async (req, res, next) => {
  try {
    await notificationService.markAllAsRead(req.user.id);
    res.json({ status: 'success', message: 'All notifications marked as read' });
  } catch (error) { next(error); }
};

export const deleteNotification = async (req, res, next) => {
  try {
    await prisma.notification.update({
      where: { id: req.params.id },
      data: { isDeleted: true }
    });
    res.json({ status: 'success', message: 'Notification deleted' });
  } catch (error) { next(error); }
};
