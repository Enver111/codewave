"use client";

import { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaArrowLeft, FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AnimatedMessage from "./AnimatedMessage";
import TypingIndicator from "./TypingIndicator";
import MessageSkeleton from "./MessageSkeleton";
import { useSocket } from "../../hooks/useSocket";
import { Message, Conversation } from "../types/conversation";
import { AnimatePresence } from "framer-motion";

interface SocketMessage extends Message {
  conversationId: string;
}

interface ConversationViewProps {
  conversation: Conversation | null;
  onBack?: () => void;
  onClose?: () => void;
  mode: 'modal' | 'page';
  onMessageSent?: (message: Message) => void;
  onConversationUpdate?: (conversation: Conversation) => void;
  onDeleteMessage?: (messageId: string) => void;
}

export default function ConversationView({
  conversation,
  onBack,
  onClose,
  mode,
  onMessageSent,
  onConversationUpdate,
  onDeleteMessage
}: ConversationViewProps) {
  const { data: session } = useSession();
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Array<{ userId: string; userName: string }>>([]);
  const [messageStatuses, setMessageStatuses] = useState<Record<string, 'sending' | 'sent' | 'delivered' | 'read'>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    sendMessage,
    startTyping,
    stopTyping,
    markMessageAsReceived,
    markMessageAsRead,
    isConnected,
    joinConversation,
    leaveConversation
  } = useSocket({
    conversationId: conversation?.id,
    onNewMessage: (message) => {
      console.log("=== NEW MESSAGE RECEIVED ===");
      console.log("Message received:", message);
      console.log("Current conversation messages count:", conversation?.messages.length);
      console.log("Message author ID:", message.author.id);
      console.log("Session user ID:", session?.user?.id);
      console.log("Is our message:", message.author.id === session?.user?.id);

      if (conversation && message.conversationId === conversation.id) {
        // Очищаем индикатор печати при получении сообщения
        setTypingUsers(prev => prev.filter(u => u.userId !== message.author.id));

        const newMessage: Message = {
          id: message.id,
          content: message.content,
          createdAt: message.createdAt,
          author: {
            id: message.author.id,
            name: message.author.name,
            image: message.author.image || null
          }
        };

        // Проверяем, нет ли уже такого сообщения
        const messageExists = conversation.messages.some(msg => msg.id === newMessage.id);
        if (messageExists) {
          console.log("Message already exists, skipping");
          return;
        }

        // Если это наше сообщение, ищем временное сообщение для замены
        if (message.author.id === session?.user?.id) {
          console.log("This is our message, looking for temp message to replace");

          // Ищем временное сообщение с таким же содержимым
          const tempMessageIndex = conversation.messages.findIndex(msg =>
            msg.id.startsWith('temp-') &&
            msg.content === newMessage.content &&
            msg.author.id === session?.user?.id
          );

          if (tempMessageIndex !== -1) {
            console.log("Found temp message to replace at index:", tempMessageIndex);

            // Создаем новый массив сообщений, заменяя временное сообщение
            const updatedMessages = [...conversation.messages];
            updatedMessages[tempMessageIndex] = newMessage;

            const updatedConversation = {
              ...conversation,
              messages: updatedMessages
            };

            console.log("Replaced temp message, new count:", updatedConversation.messages.length);

            if (onConversationUpdate) {
              onConversationUpdate(updatedConversation);
            }

            // Обновляем статус сообщения
            setMessageStatuses(prev => ({
              ...prev,
              [newMessage.id]: 'sent'
            }));

            return;
          }
        }

        // Если это не наше сообщение или нет временного сообщения для замены,
        // просто добавляем новое сообщение в конец
        console.log("Adding new message to conversation");
        const updatedConversation = {
          ...conversation,
          messages: [...conversation.messages, newMessage]
        };

        console.log("Added new message, new count:", updatedConversation.messages.length);

        if (onConversationUpdate) {
          onConversationUpdate(updatedConversation);
        }

        // Отмечаем сообщение как прочитанное, если это не наше
        if (message.author.id !== session?.user?.id) {
          markMessageAsRead(message.id);
        }
      }
      console.log("=== END NEW MESSAGE PROCESSING ===");
    },
    onUserTyping: (data) => {
      console.log("User typing:", data);
      if (data.userId !== session?.user?.id) {
        setTypingUsers(prev => {
          const existing = prev.find(u => u.userId === data.userId);
          if (existing) return prev;
          return [...prev, data];
        });
      }
    },
    onUserStoppedTyping: (data) => {
      console.log("User stopped typing:", data);
      if (data.userId !== session?.user?.id) {
        setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
      }
    },
    onMessageDelivered: (data) => {
      console.log("Message delivered:", data);
      setMessageStatuses(prev => ({
        ...prev,
        [data.messageId]: 'delivered'
      }));
    },
    onMessageRead: (data) => {
      console.log("Message read:", data);
      setMessageStatuses(prev => ({
        ...prev,
        [data.messageId]: 'read'
      }));
    },
    onError: (error) => {
      console.error("WebSocket error:", error);
    }
  });

  // Присоединяемся к беседе при загрузке
  useEffect(() => {
    // Очищаем индикатор печати при изменении беседы
    setTypingUsers([]);

    if (conversation && isConnected) {
      joinConversation(conversation.id);

      // Отмечаем все сообщения как прочитанные
      conversation.messages.forEach(msg => {
        if (msg.author.id !== session?.user?.id) {
          markMessageAsRead(msg.id);
        }
      });
    }

    return () => {
      if (conversation) {
        leaveConversation(conversation.id);
        // Очищаем индикатор печати при размонтировании
        setTypingUsers([]);
      }
    };
  }, [conversation?.id, isConnected]);

  // Автоматическая прокрутка к последнему сообщению
  useEffect(() => {
    if (conversation?.messages.length) {
      console.log("Messages updated:", {
        count: conversation.messages.length,
        lastMessage: conversation.messages[conversation.messages.length - 1]
      });

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [conversation?.messages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("Input change:", value);
    setNewMessage(value);

    // Индикатор печати - только если есть активная беседа и соединение
    if (conversation && session?.user?.id && !conversation.isClosed && isConnected) {
      if (value.length > 0) {
        startTyping(conversation.id);
      } else {
        stopTyping(conversation.id);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    console.log("Key press:", e.key);
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    console.log("=== SEND MESSAGE ===");
    console.log("Send message called");
    if (!newMessage.trim() || !conversation || !session?.user?.id || conversation.isClosed) {
      console.log("Send message blocked:", {
        hasMessage: !!newMessage.trim(),
        hasConversation: !!conversation,
        hasSession: !!session?.user?.id,
        isClosed: conversation?.isClosed
      });
      return;
    }

    // Останавливаем индикатор печати при отправке
    stopTyping(conversation.id);

    const messageContent = newMessage.trim();
    const tempId = `temp-${Date.now()}`;
    const tempMessage: Message = {
      id: tempId,
      content: messageContent,
      createdAt: new Date().toISOString(),
      author: {
        id: session.user.id,
        name: session.user.name || null,
        image: session.user.image || null
      }
    };

    console.log("Created temp message:", {
      id: tempMessage.id,
      content: tempMessage.content,
      author: tempMessage.author.id
    });

    // Очищаем поле ввода сразу
    setNewMessage("");
    setIsSending(true);

    // Добавляем временное сообщение в состояние (оптимистичное обновление)
    console.log("Adding temp message to conversation");
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, tempMessage]
    };

    console.log("Updated conversation with temp message:", {
      messagesCount: updatedConversation.messages.length,
      messages: updatedConversation.messages.map(m => ({ id: m.id, content: m.content.substring(0, 30), author: m.author.id }))
    });

    if (onConversationUpdate) {
      onConversationUpdate(updatedConversation);
    }

    setMessageStatuses(prev => ({
      ...prev,
      [tempId]: 'sending'
    }));

    try {
      // Отправляем через WebSocket
      console.log("Sending message via WebSocket");
      sendMessage(conversation.id, messageContent);

      // Обновляем статус
      setMessageStatuses(prev => ({
        ...prev,
        [tempId]: 'sent'
      }));

      if (onMessageSent) {
        onMessageSent(tempMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessageStatuses(prev => ({
        ...prev,
        [tempId]: 'sent'
      }));
    } finally {
      setIsSending(false);
    }
    console.log("=== END SEND MESSAGE ===");
  };

  const handleMessageDeleted = (messageId: string) => {
    console.log("handleMessageDeleted called with messageId:", messageId);
    console.log("Current conversation messages:", conversation?.messages.length);

    if (!conversation) {
      console.log("No conversation to update");
      return;
    }

    // Проверяем, что сообщение еще существует в списке
    const messageExists = conversation.messages.some(msg => msg.id === messageId);
    if (!messageExists) {
      console.log("Message already removed from conversation, skipping deletion");
      return;
    }

    // Если передана функция onDeleteMessage, используем её (для WebSocket)
    if (onDeleteMessage) {
      console.log("Using onDeleteMessage function for WebSocket deletion");
      // Сначала обновляем локальное состояние
      const updatedConversation = {
        ...conversation,
        messages: conversation.messages.filter(msg => msg.id !== messageId)
      };

      if (onConversationUpdate) {
        onConversationUpdate(updatedConversation);
      }

      // Затем отправляем запрос через WebSocket
      onDeleteMessage(messageId);
      return;
    }

    // Иначе используем локальное обновление (для API)
    console.log("Using local update for API deletion");
    const updatedConversation = {
      ...conversation,
      messages: conversation.messages.filter(msg => msg.id !== messageId)
    };

    console.log("Updated conversation messages:", updatedConversation.messages.length);
    console.log("Calling onConversationUpdate:", !!onConversationUpdate);

    if (onConversationUpdate) {
      onConversationUpdate(updatedConversation);
    }
  };

  const isOwnMessage = (message: Message) => {
    const result = message.author.id === session?.user?.id;
    console.log("isOwnMessage check:", {
      messageAuthorId: message.author.id,
      sessionUserId: session?.user?.id,
      result
    });
    return result;
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <p>Выберите беседу для начала общения</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${mode === 'modal' ? 'h-96' : 'h-[calc(100vh-200px)]'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
              >
                <FaArrowLeft size={16} />
              </button>
            )}
            <div>
              <h3 className="text-lg font-semibold text-white">
                {conversation.recipient?.name || "Новое обращение"}
              </h3>
              <p className="text-sm text-gray-400">
                {conversation.messages.length} сообщений
                {!isConnected && " (переподключение...)"}
                {conversation.isClosed && " (закрыто)"}
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
            >
              <FaTimes size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <FaPaperPlane size={32} className="mx-auto mb-3 opacity-50" />
            <p>Начните разговор</p>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {conversation.messages.map((message, index) => (
                <AnimatedMessage
                  key={message.id}
                  message={message}
                  isOwnMessage={isOwnMessage(message)}
                  isNew={index === conversation.messages.length - 1}
                  status={messageStatuses[message.id] || 'sent'}
                  onMessageDeleted={() => handleMessageDeleted(message.id)}
                />
              ))}
            </AnimatePresence>

            {/* Индикатор печати */}
            <TypingIndicator
              users={typingUsers.filter(u => u.userId !== session?.user?.id)}
              isVisible={typingUsers.filter(u => u.userId !== session?.user?.id).length > 0}
            />

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      {!conversation.isClosed ? (
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onClick={() => console.log("Input clicked")}
              onFocus={() => console.log("Input focused")}
              placeholder="Введите сообщение..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
              disabled={isSending}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isSending}
              className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-white p-3 rounded-xl transition-colors disabled:cursor-not-allowed"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
          {/* Отладочная информация */}
          <div className="text-xs text-gray-500 mt-2">
            Статус: {isConnected ? 'Подключено' : 'Отключено'} |
            Отправка: {isSending ? 'Да' : 'Нет'} |
            Сообщение: {newMessage.length} символов
          </div>
        </div>
      ) : (
        <div className="p-4 border-t border-gray-700 text-center text-gray-400">
          Это обращение закрыто. Новые сообщения отправлять нельзя.
        </div>
      )}
    </div>
  );
}
