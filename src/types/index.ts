export interface AppError {
  message: string;
  code?: string;
  status?: number;
  statusCode?: number;
  stack?: string;
  name?: string;
  isOperational?: boolean;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/* export type {
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
  ApiResponse,
} from "./api"; */
