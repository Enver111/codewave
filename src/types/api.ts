// API Types for CodeWave

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  image?: string;
  createdAt?: string;
  _count?: {
    reviews: number;
    conversations: number;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface Conversation {
  id: string;
  createdAt: string;
  updatedAt: string;
  isClosed: boolean;
  userId: string;
  recipientId?: string;
  user: User;
  recipient?: User;
  messages: Message[];
  _count?: {
    messages: number;
  };
}

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  conversationId: string;
  authorId: string;
  author: User;
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Array<{
    rating: number;
    _count: {
      rating: number;
    };
  }>;
  recentReviews: Review[];
}

export interface CreateConversationRequest {
  recipientId: string;
}

export interface SendMessageRequest {
  content: string;
  conversationId: string;
}

export interface CreateReviewRequest {
  rating: number;
  text: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface UpdateMessageRequest {
  content: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  text?: string;
}

export interface ApiError {
  error: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface HealthCheck {
  status: string;
  timestamp: string;
}

// Socket.io types
export interface SocketMessage {
  id: string;
  content: string;
  conversationId: string;
  authorId: string;
  author: User;
  createdAt: string;
}

export interface JoinConversationEvent {
  conversationId: string;
}

export interface LeaveConversationEvent {
  conversationId: string;
}

export interface SendMessageEvent {
  conversationId: string;
  content: string;
}

export interface NewMessageEvent {
  message: SocketMessage;
}

export interface TypingEvent {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

// Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
