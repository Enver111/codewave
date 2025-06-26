import express from 'express';
import { prisma } from '../config/database';
import { auth } from '../middleware/auth';
import { validate, validateMessageCreate, validateMessageUpdate } from '../utils/validation';
import { AuthRequest, Message, MessageCreateInput, MessageUpdateInput, ApiResponse } from '../types';
import { NotFoundError, AuthorizationError } from '../utils/errors';

const router = express.Router();

// Get messages for a conversation
router.get('/conversation/:conversationId', auth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user?.id;

    if (!conversationId) {
      throw new NotFoundError('Conversation ID is required');
    }

    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    // Check if user is part of the conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          { userId },
          { recipientId: userId }
        ]
      }
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const response: ApiResponse<Message[]> = {
      success: true,
      data: messages as Message[]
    };

    res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Create new message
router.post('/', auth, validate(validateMessageCreate), async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    const { content, conversationId }: MessageCreateInput = req.body;

    // Check if user is part of the conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          { userId },
          { recipientId: userId }
        ]
      }
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const message = await prisma.message.create({
      data: {
        content,
        conversationId,
        authorId: userId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    });

    // Update conversation's updatedAt timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() }
    });

    const response: ApiResponse<Message> = {
      success: true,
      data: message as Message,
      message: 'Message sent successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
});

// Update message
router.put('/:id', auth, validate(validateMessageUpdate), async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { content }: MessageUpdateInput = req.body;

    if (!id) {
      throw new NotFoundError('Message ID is required');
    }

    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    // Check if message exists and user is the author
    const message = await prisma.message.findFirst({
      where: {
        id,
        authorId: userId
      }
    });

    if (!message) {
      throw new NotFoundError('Message not found or you are not the author');
    }

    const updatedMessage = await prisma.message.update({
      where: { id },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    });

    const response: ApiResponse<Message> = {
      success: true,
      data: updatedMessage as Message,
      message: 'Message updated successfully'
    };

    res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Delete message
router.delete('/:id', auth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!id) {
      throw new NotFoundError('Message ID is required');
    }

    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    // Check if message exists and user is the author
    const message = await prisma.message.findFirst({
      where: {
        id,
        authorId: userId
      }
    });

    if (!message) {
      throw new NotFoundError('Message not found or you are not the author');
    }

    await prisma.message.delete({
      where: { id }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Message deleted successfully'
    };

    res.json(response);
  } catch (error) {
    return next(error);
  }
});

export default router;
