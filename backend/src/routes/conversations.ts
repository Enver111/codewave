import express from 'express';
import { prisma } from '../config/database';
import { auth } from '../middleware/auth';
import { validate, validateConversationCreate, validateConversationUpdate } from '../utils/validation';
import { AuthRequest, Conversation, ConversationCreateInput, ConversationUpdateInput, ApiResponse } from '../types';
import { NotFoundError, AuthorizationError } from '../utils/errors';

const router = express.Router();

// Get user conversations
router.get('/', auth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { userId },
          { recipientId: userId }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    const response: ApiResponse<Conversation[]> = {
      success: true,
      data: conversations as Conversation[]
    };

    res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Get conversation by ID
router.get('/:id', auth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!id) {
      throw new NotFoundError('Conversation ID is required');
    }

    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    const conversation = await prisma.conversation.findFirst({
      where: {
        id,
        OR: [
          { userId },
          { recipientId: userId }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const response: ApiResponse<Conversation> = {
      success: true,
      data: conversation as Conversation
    };

    res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Create new conversation
router.post('/', auth, validate(validateConversationCreate), async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    const { recipientId }: ConversationCreateInput = req.body;

    // Check if conversation already exists
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            userId,
            recipientId
          },
          {
            userId: recipientId,
            recipientId: userId
          }
        ]
      }
    });

    if (existingConversation) {
      const response: ApiResponse<Conversation> = {
        success: true,
        data: existingConversation as Conversation,
        message: 'Conversation already exists'
      };
      return res.json(response);
    }

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        recipientId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    });

    const response: ApiResponse<Conversation> = {
      success: true,
      data: conversation as Conversation,
      message: 'Conversation created successfully'
    };

    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
});

// Update conversation
router.put('/:id', auth, validate(validateConversationUpdate), async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const updateData: ConversationUpdateInput = req.body;

    if (!id) {
      throw new NotFoundError('Conversation ID is required');
    }

    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    // Check if user is part of the conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id,
        OR: [
          { userId },
          { recipientId: userId }
        ]
      }
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const updatedConversation = await prisma.conversation.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    });

    const response: ApiResponse<Conversation> = {
      success: true,
      data: updatedConversation as Conversation,
      message: 'Conversation updated successfully'
    };

    res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Delete conversation
router.delete('/:id', auth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!id) {
      throw new NotFoundError('Conversation ID is required');
    }

    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    // Check if user is part of the conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id,
        OR: [
          { userId },
          { recipientId: userId }
        ]
      }
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    await prisma.conversation.delete({
      where: { id }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Conversation deleted successfully'
    };

    res.json(response);
  } catch (error) {
    return next(error);
  }
});

export default router;
