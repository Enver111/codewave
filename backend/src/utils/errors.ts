import { AppError } from '@/types';

export class CustomError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends CustomError {
  constructor(message: string = 'Access denied') {
    super(message, 403);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends CustomError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409);
  }
}

export class RateLimitError extends CustomError {
  constructor(message: string = 'Too many requests') {
    super(message, 429);
  }
}

export const handleError = (error: Error | AppError): AppError => {
  if (error instanceof CustomError) {
    return error;
  }

  // Handle Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    return new CustomError('Database operation failed', 400);
  }

  if (error.name === 'PrismaClientValidationError') {
    return new ValidationError('Invalid data provided');
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return new AuthenticationError('Invalid token');
  }

  if (error.name === 'TokenExpiredError') {
    return new AuthenticationError('Token expired');
  }

  // Handle bcrypt errors
  if (error.name === 'BCryptError') {
    return new CustomError('Password processing error', 500);
  }

  // Default error
  return new CustomError(error.message || 'Internal server error', 500);
};
