import { prisma } from '../config/db.js';
import aiService from '../services/ai.service.js';

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await prisma.aIConversation.findMany({ 
      where: { userId: req.user.id, isDeleted: false },
      include: { messages: { orderBy: { timestamp: 'asc' } } },
      orderBy: { updatedAt: 'desc' }
    });
    res.json({ status: 'success', data: conversations });
  } catch (error) { next(error); }
};

export const startOrContinueConversation = async (req, res, next) => {
  try {
    const { conversationId, message } = req.body;
    let conversation;

    if (conversationId) {
      conversation = await prisma.aIConversation.findFirst({ 
        where: { id: conversationId, userId: req.user.id },
        include: { messages: { orderBy: { timestamp: 'asc' } } }
      });
      if (!conversation) return res.status(404).json({ status: 'error', message: 'Conversation not found' });
    } else {
      conversation = await prisma.aIConversation.create({
        data: {
          userId: req.user.id,
          topic: message.substring(0, 30) + '...',
          messages: {
            create: []
          }
        },
        include: { messages: true }
      });
    }

    // Save user message to DB
    await prisma.aIMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content: message
      }
    });
    
    // Add to context for AI request
    const context = [...conversation.messages, { role: 'user', content: message }];
    
    // Get AI Response
    const aiResponse = await aiService.getAdvice(message, context.slice(0, -1));
    
    // Save AI response to DB
    await prisma.aIMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'ai',
        content: aiResponse
      }
    });
    
    // Update conversation timestamp
    await prisma.aIConversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() }
    });

    const updatedConversation = await prisma.aIConversation.findUnique({
      where: { id: conversation.id },
      include: { messages: { orderBy: { timestamp: 'asc' } } }
    });

    res.json({ status: 'success', data: updatedConversation });
  } catch (error) { next(error); }
};
