// API configuration for frontend to communicate with backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

// API client configuration
export const apiClient = {
  baseURL: API_BASE_URL,

  // Generic request method
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  },

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  },

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
};

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    apiClient.post('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login', data),

  getCurrentUser: () => apiClient.get('/auth/me'),

  logout: () => apiClient.post('/auth/logout'),
};

// Users API
export const usersAPI = {
  getAll: () => apiClient.get('/users'),

  getById: (id: string) => apiClient.get(`/users/${id}`),

  updateProfile: (data: { name?: string; email?: string }) =>
    apiClient.put('/users/profile', data),

  delete: (id: string) => apiClient.delete(`/users/${id}`),
};

// Conversations API
export const conversationsAPI = {
  getAll: () => apiClient.get('/conversations'),

  getById: (id: string) => apiClient.get(`/conversations/${id}`),

  create: (data: { recipientId: string }) =>
    apiClient.post('/conversations', data),

  close: (id: string) => apiClient.patch(`/conversations/${id}/close`),
};

// Messages API
export const messagesAPI = {
  getByConversation: (conversationId: string) =>
    apiClient.get(`/messages/conversation/${conversationId}`),

  send: (data: { content: string; conversationId: string }) =>
    apiClient.post('/messages', data),

  update: (id: string, data: { content: string }) =>
    apiClient.put(`/messages/${id}`, data),

  delete: (id: string) => apiClient.delete(`/messages/${id}`),
};

// Reviews API
export const reviewsAPI = {
  getAll: () => apiClient.get('/reviews'),

  getById: (id: string) => apiClient.get(`/reviews/${id}`),

  create: (data: { rating: number; text: string }) =>
    apiClient.post('/reviews', data),

  update: (id: string, data: { rating?: number; text?: string }) =>
    apiClient.put(`/reviews/${id}`, data),

  delete: (id: string) => apiClient.delete(`/reviews/${id}`),

  getStats: () => apiClient.get('/reviews/stats/overview'),
};

// Socket configuration
export const socketConfig = {
  url: SOCKET_URL,
  options: {
    transports: ['websocket', 'polling'],
    autoConnect: false,
  },
};

// Health check
export const healthAPI = {
  check: () => apiClient.get('/health'),
};

export default apiClient;
