import express from 'express';
import { prisma } from '../config/database';
import { auth, adminAuth } from '../middleware/auth';
import { validate, validateUserUpdate } from '../utils/validation';
import { AuthRequest, User, UserUpdateInput, ApiResponse } from '../types';
import { NotFoundError, AuthorizationError } from '../utils/errors';

const router = express.Router();

// Get all users (admin only)
router.get('/', auth, async (_req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true
      }
    });

    const response: ApiResponse<User[]> = {
      success: true,
      data: users as User[]
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get('/:id', auth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new NotFoundError('User ID is required');
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true
      }
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const response: ApiResponse<User> = {
      success: true,
      data: user as User
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put('/profile', auth, validate(validateUserUpdate), async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    const updateData: UserUpdateInput = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true
      }
    });

    const response: ApiResponse<User> = {
      success: true,
      data: updatedUser as User,
      message: 'Profile updated successfully'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Delete user (admin only)
router.delete('/:id', adminAuth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new NotFoundError('User ID is required');
    }

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await prisma.user.delete({
      where: { id }
    });

    const response: ApiResponse = {
      success: true,
      message: 'User deleted successfully'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
