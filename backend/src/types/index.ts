import { Request } from 'express';

// User related types
export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: 'USER' | 'ADMIN';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreateInput {
  email: string;
  name: string;
  password: string;
}

export interface UserUpdateInput {
  name?: string;
  email?: string;
  image?: string;
}

// Auth related types
export interface AuthRequest extends Request {
  user?: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends UserCreateInput {
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Conversation related types
export interface Conversation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isClosed: boolean;
  userId: string;
  user: User;
  recipientId?: string;
  recipient?: User;
  messages: Message[];
}

export interface ConversationCreateInput {
  recipientId: string;
}

export interface ConversationUpdateInput {
  isClosed?: boolean;
}

// Message related types
export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  conversationId: string;
  conversation: Conversation;
  authorId: string;
  author: User;
}

export interface MessageCreateInput {
  content: string;
  conversationId: string;
}

export interface MessageUpdateInput {
  content: string;
}

// Review related types
export interface Review {
  id: string;
  rating: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
}

export interface ReviewCreateInput {
  rating: number;
  text: string;
}

export interface ReviewUpdateInput {
  rating?: number;
  text?: string;
}

// Socket related types
export interface SocketData {
  userId: string;
  name: string;
}

export interface SocketMessage {
  conversationId: string;
  content: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}

// Environment variables
export interface EnvironmentVariables {
  NODE_ENV: string;
  PORT: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  FRONTEND_URL: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
}

// Database types (Prisma generated types will be used here)
export type PrismaUser = any; // Will be replaced with actual Prisma types
export type PrismaConversation = any;
export type PrismaMessage = any;
export type PrismaReview = any;
