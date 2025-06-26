import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { auth } from '../middleware/auth';
import { validate, validateUserRegistration, validateUserLogin } from '../utils/validation';
import { AuthRequest, User, AuthResponse, RegisterInput, LoginInput } from '../types';
import { ConflictError, AuthenticationError } from '../utils/errors';

const router = express.Router();

// Register
router.post('/register', validate(validateUserRegistration), async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { email, password, name }: RegisterInput = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new ConflictError('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true
      }
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env['JWT_SECRET']!,
      { expiresIn: '7d' }
    );

    const response: AuthResponse = {
      user: user as User,
      token
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', validate(validateUserLogin), async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const { email, password }: LoginInput = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password || '');
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env['JWT_SECRET']!,
      { expiresIn: '7d' }
    );

    const userResponse: User = {
      id: user.id,
      email: user.email ?? null,
      name: user.name ?? null,
      role: user.role,
      image: user.image ?? null,
      emailVerified: user.emailVerified ?? null,
      password: null // Никогда не возвращаем пароль
    };

    const response: AuthResponse = {
      user: userResponse,
      token
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', auth, async (_req: AuthRequest, res: express.Response) => {
  res.json({ user: _req.user });
});

// Logout (client-side token removal)
router.post('/logout', auth, (_req: AuthRequest, res: express.Response) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
