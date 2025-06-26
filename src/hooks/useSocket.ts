"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { socketConfig } from '@/lib/api';
import { SocketMessage, NewMessageEvent, TypingEvent } from '@/types/api';

interface UseSocketOptions {
  conversationId?: string;
  onNewMessage?: (message: SocketMessage) => void;
  onTyping?: (data: TypingEvent) => void;
  onUserTyping?: (data: any) => void;
  onUserJoined?: (userId: string) => void;
  onUserLeft?: (userId: string) => void;
  onUserStoppedTyping?: (data: any) => void;
  onMessageDelivered?: (data: any) => void;
  onMessageRead?: (data: any) => void;
  onMessageDeleted?: (data: any) => void;
  onError?: (error: any) => void;
}

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  joinConversation: (conversationId: string) => void;
  leaveConversation: (conversationId: string) => void;
  sendMessage: (conversationId: string, content: string) => void;
  sendTyping: (conversationId: string, isTyping: boolean) => void;
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
  markMessageAsReceived: (messageId: string) => void;
  markMessageAsRead: (messageId: string) => void;
  deleteMessage: (messageId: string) => void;
  onNewMessage: (callback: (message: SocketMessage) => void) => void;
  onTyping: (callback: (data: TypingEvent) => void) => void;
  onUserJoined: (callback: (userId: string) => void) => void;
  onUserLeft: (callback: (userId: string) => void) => void;
}

export const useSocket = (options: UseSocketOptions = {}): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      console.warn('No auth token found, socket connection skipped');
      return;
    }

    const newSocket = io(socketConfig.url, {
      ...socketConfig.options,
      auth: {
        token
      }
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    // Connection events
    newSocket.on('connect', () => {
      console.log('🔌 Socket connected:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 Socket disconnected');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('🔌 Socket connection error:', error);
      setIsConnected(false);
      options.onError?.(error);
    });

    // Set up event listeners if provided
    if (options.onNewMessage) {
      newSocket.on('new-message', (data: NewMessageEvent) => {
        console.log('📨 New message received:', data);
        options.onNewMessage!(data.message);
      });
    }

    if (options.onTyping) {
      newSocket.on('typing', (data: TypingEvent) => {
        console.log('⌨️ Typing event:', data);
        options.onTyping!(data);
      });
    }

    if (options.onUserTyping) {
      newSocket.on('user-typing', options.onUserTyping);
    }

    if (options.onUserJoined) {
      newSocket.on('user-joined', (userId: string) => {
        console.log('👤 User joined:', userId);
        options.onUserJoined!(userId);
      });
    }

    if (options.onUserLeft) {
      newSocket.on('user-left', (userId: string) => {
        console.log('👤 User left:', userId);
        options.onUserLeft!(userId);
      });
    }

    if (options.onUserStoppedTyping) {
      newSocket.on('user-stopped-typing', options.onUserStoppedTyping);
    }

    if (options.onMessageDelivered) {
      newSocket.on('message-delivered', options.onMessageDelivered);
    }

    if (options.onMessageRead) {
      newSocket.on('message-read', options.onMessageRead);
    }

    if (options.onMessageDeleted) {
      newSocket.on('message-deleted', options.onMessageDeleted);
    }

    // Join conversation if provided
    if (options.conversationId) {
      newSocket.emit('join-conversation', { conversationId: options.conversationId });
    }

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [options.conversationId]);

  // Join conversation
  const joinConversation = useCallback((conversationId: string) => {
    if (socket && isConnected) {
      socket.emit('join-conversation', { conversationId });
      console.log(`🔌 Joined conversation: ${conversationId}`);
    }
  }, [socket, isConnected]);

  // Leave conversation
  const leaveConversation = useCallback((conversationId: string) => {
    if (socket && isConnected) {
      socket.emit('leave-conversation', { conversationId });
      console.log(`🔌 Left conversation: ${conversationId}`);
    }
  }, [socket, isConnected]);

  // Send message
  const sendMessage = useCallback((conversationId: string, content: string) => {
    if (socket && isConnected) {
      socket.emit('send-message', { conversationId, content });
      console.log(`📤 Sent message to conversation: ${conversationId}`);
    }
  }, [socket, isConnected]);

  // Send typing indicator
  const sendTyping = useCallback((conversationId: string, isTyping: boolean) => {
    if (socket && isConnected) {
      socket.emit('typing', { conversationId, isTyping });
    }
  }, [socket, isConnected]);

  // Start typing
  const startTyping = useCallback((conversationId: string) => {
    sendTyping(conversationId, true);
  }, [sendTyping]);

  // Stop typing
  const stopTyping = useCallback((conversationId: string) => {
    sendTyping(conversationId, false);
  }, [sendTyping]);

  // Mark message as received
  const markMessageAsReceived = useCallback((messageId: string) => {
    if (socket && isConnected) {
      socket.emit('message-received', { messageId });
    }
  }, [socket, isConnected]);

  // Mark message as read
  const markMessageAsRead = useCallback((messageId: string) => {
    if (socket && isConnected) {
      socket.emit('message-read', { messageId });
    }
  }, [socket, isConnected]);

  // Delete message
  const deleteMessage = useCallback((messageId: string) => {
    if (socket && isConnected) {
      socket.emit('delete-message', { messageId });
      console.log(`🗑️ Delete message: ${messageId}`);
    }
  }, [socket, isConnected]);

  // Listen for new messages
  const onNewMessage = useCallback((callback: (message: SocketMessage) => void) => {
    if (socket) {
      socket.on('new-message', (data: NewMessageEvent) => {
        console.log('📨 New message received:', data);
        callback(data.message);
      });
    }
  }, [socket]);

  // Listen for typing events
  const onTyping = useCallback((callback: (data: TypingEvent) => void) => {
    if (socket) {
      socket.on('typing', (data: TypingEvent) => {
        console.log('⌨️ Typing event:', data);
        callback(data);
      });
    }
  }, [socket]);

  // Listen for user joined
  const onUserJoined = useCallback((callback: (userId: string) => void) => {
    if (socket) {
      socket.on('user-joined', (userId: string) => {
        console.log('👤 User joined:', userId);
        callback(userId);
      });
    }
  }, [socket]);

  // Listen for user left
  const onUserLeft = useCallback((callback: (userId: string) => void) => {
    if (socket) {
      socket.on('user-left', (userId: string) => {
        console.log('👤 User left:', userId);
        callback(userId);
      });
    }
  }, [socket]);

  return {
    socket,
    isConnected,
    joinConversation,
    leaveConversation,
    sendMessage,
    sendTyping,
    startTyping,
    stopTyping,
    markMessageAsReceived,
    markMessageAsRead,
    deleteMessage,
    onNewMessage,
    onTyping,
    onUserJoined,
    onUserLeft,
  };
};

export default useSocket;
