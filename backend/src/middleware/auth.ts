import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { AuthRequest } from '../types';
import { AuthenticationError, AuthorizationError } from '../utils/errors';

interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export const auth = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new AuthenticationError('Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, process.env['JWT_SECRET']!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        password: true
      }
    });

    if (!user) {
      throw new AuthenticationError('Invalid token.');
    }

    req.user = {
      id: user.id,
      name: user.name ?? null,
      email: user.email ?? null,
      emailVerified: user.emailVerified ?? null,
      image: user.image ?? null,
      password: null, // Никогда не возвращаем пароль
      role: user.role
    };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AuthenticationError('Invalid token.'));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AuthenticationError('Token expired.'));
    } else {
      next(error);
    }
  }
};

export const adminAuth = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    await auth(req, _res, () => {
      if (req.user?.role !== 'ADMIN') {
        throw new AuthorizationError('Access denied. Admin role required.');
      }
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env['JWT_SECRET']!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        password: true
      }
    });

    if (user) {
      req.user = {
        id: user.id,
        name: user.name ?? null,
        email: user.email ?? null,
        emailVerified: user.emailVerified ?? null,
        image: user.image ?? null,
        password: null,
        role: user.role
      };
    }

    next();
  } catch (error) {
    // For optional auth, we don't throw errors, just continue without user
    next();
  }
};
