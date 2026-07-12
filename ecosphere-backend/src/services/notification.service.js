import { prisma } from '../config/db.js';

class NotificationService {
  async trigger(title, desc, type = 'info', recipientId = null) {
    try {
      const notif = await prisma.notification.create({
        data: {
          title,
          desc,
          type,
          recipientId
        }
      });
      return notif;
    } catch (error) {
      console.error('Notification Service Error:', error);
    }
  }

  async markAsRead(notificationId) {
    return await prisma.notification.update({
      where: { id: notificationId },
      data: { unread: false }
    });
  }

  async markAllAsRead(userId) {
    return await prisma.notification.updateMany({
      where: { 
        recipientId: { in: [userId, null] }, 
        unread: true 
      },
      data: { unread: false }
    });
  }
}

export default new NotificationService();
