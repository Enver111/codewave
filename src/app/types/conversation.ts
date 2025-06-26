export interface Message {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export interface Conversation {
  id: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
  recipient?: {
    id: string;
    name: string | null;
    email: string | null;
  };
  isClosed?: boolean;
  _count?: {
    messages: number;
  };
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: 'USER' | 'ADMIN';
}
