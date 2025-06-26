// Export all types from the types directory
export * from './api';

// Common types that might be used across the application
export interface AppError {
  message: string;
  code?: string;
  status?: number;
  statusCode?: number;
  stack?: string;
  name?: string;
  isOperational?: boolean;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Re-export types for convenience
export type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Conversation,
  Message,
  Review,
  ReviewStats,
  CreateConversationRequest,
  SendMessageRequest,
  CreateReviewRequest,
  UpdateProfileRequest,
  UpdateMessageRequest,
  UpdateReviewRequest,
  ApiError,
  HealthCheck,
  SocketMessage,
  JoinConversationEvent,
  LeaveConversationEvent,
  SendMessageEvent,
  NewMessageEvent,
  TypingEvent,
  PaginatedResponse,
  ApiResponse
} from './api';
