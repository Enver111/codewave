import express from 'express';
import { prisma } from '../config/database';
import { auth } from '../middleware/auth';
import { validate, validateReviewCreate, validateReviewUpdate } from '../utils/validation';
import { AuthRequest, Review, ReviewCreateInput, ReviewUpdateInput, ApiResponse } from '../types';
import { NotFoundError, AuthorizationError, ConflictError } from '../utils/errors';

const router = express.Router();

// Get all reviews
router.get('/', auth, async (_req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const response: ApiResponse<Review[]> = {
      success: true,
      data: reviews as Review[]
    };

    res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Get review by ID
router.get('/:id', auth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new NotFoundError('Review ID is required');
    }

    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    });

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    const response: ApiResponse<Review> = {
      success: true,
      data: review as Review
    };

    res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Create new review
router.post('/', auth, validate(validateReviewCreate), async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    const { rating, text }: ReviewCreateInput = req.body;

    // Check if user already has a review
    const existingReview = await prisma.review.findFirst({
      where: { userId }
    });

    if (existingReview) {
      throw new ConflictError('You have already submitted a review');
    }

    const review = await prisma.review.create({
      data: {
        rating,
        text,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    });

    const response: ApiResponse<Review> = {
      success: true,
      data: review as Review,
      message: 'Review submitted successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
});

// Update review
router.put('/:id', auth, validate(validateReviewUpdate), async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const updateData: ReviewUpdateInput = req.body;

    if (!id) {
      throw new NotFoundError('Review ID is required');
    }

    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    // Check if review exists and user is the author
    const review = await prisma.review.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!review) {
      throw new NotFoundError('Review not found or you are not the author');
    }

    const updatedReview = await prisma.review.update({
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
        }
      }
    });

    const response: ApiResponse<Review> = {
      success: true,
      data: updatedReview as Review,
      message: 'Review updated successfully'
    };

    res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Delete review
router.delete('/:id', auth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!id) {
      throw new NotFoundError('Review ID is required');
    }

    if (!userId) {
      throw new AuthorizationError('User not authenticated');
    }

    // Check if review exists and user is the author
    const review = await prisma.review.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!review) {
      throw new NotFoundError('Review not found or you are not the author');
    }

    await prisma.review.delete({
      where: { id }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Review deleted successfully'
    };

    res.json(response);
  } catch (error) {
    return next(error);
  }
});

export default router;
