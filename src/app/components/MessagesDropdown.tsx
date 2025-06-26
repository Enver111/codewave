"use client";

import { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Link from "next/link";
import MessageSkeleton from "./MessageSkeleton";
import ConversationView from "./ConversationView";
import { useSocket } from "../../hooks/useSocket";
import { Conversation } from "../types/conversation";

interface MessagesDropdownProps {
  onUnreadCountChange?: (count: number) => void;
}

export default function MessagesDropdown({ onUnreadCountChange }: MessagesDropdownProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'conversation'>('list');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isConnected } = useSocket({
    onNewMessage: (message) => {
      console.log("Message received in dropdown:", message);
      // Обновляем список бесед при получении нового сообщения
      // Но только если мы не в режиме просмотра беседы
      if (viewMode === 'list') {
        fetchConversations();
      }
    },
    onUserTyping: (data) => {
      console.log("User typing in dropdown:", data);
    },
    onUserStoppedTyping: (data) => {
      console.log("User stopped typing in dropdown:", data);
    },
    onMessageDelivered: (data) => {
      console.log("Message delivered in dropdown:", data);
    },
    onMessageRead: (data) => {
      console.log("Message read in dropdown:", data);
    },
    onMessageDeleted: (data) => {
      console.log("Message deleted in dropdown:", data);
      // Обновляем список бесед при удалении сообщения
      // Но только если мы не в режиме просмотра беседы
      if (viewMode === 'list') {
        fetchConversations();
      }
    },
    onError: (error) => {
      console.error("WebSocket error in dropdown:", error);
      // Если ошибка связана с удалением сообщения, можно показать уведомление
      if (error.includes("Message not found")) {
        console.log("Message was already deleted or not found in dropdown");
      }
    }
  });

  useEffect(() => {
    if (isOpen && session) {
      fetchConversations();
    }
  }, [isOpen, session]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setViewMode('list');
        setSelectedConversation(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchConversations = async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/conversations?userId=${session.user.id}`);

      if (response.ok) {
        const data = await response.json();

        // Конвертируем Date объекты в строки (если это не строки)
        const formattedData = data.map((conv: any) => ({
          ...conv,
          createdAt: conv.createdAt,
          updatedAt: conv.updatedAt,
          messages: conv.messages.map((m: any) => ({
            ...m,
            createdAt: m.createdAt
          }))
        }));

        setConversations(formattedData);

        const count = formattedData.reduce((total: number, conv: Conversation) => {
          const lastMessage = conv.messages[conv.messages.length - 1];
          if (lastMessage && lastMessage.author.id !== session.user.id) {
            return total + 1;
          }
          return total;
        }, 0);

        if (onUnreadCountChange) {
          onUnreadCountChange(count);
        }
      } else {
        console.error("Failed to fetch conversations:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewConversation = async () => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        const newConversation = await response.json();

        // Конвертируем Date объекты в строки
        const formattedConversation = {
          ...newConversation,
          createdAt: newConversation.createdAt,
          updatedAt: newConversation.updatedAt,
          messages: newConversation.messages.map((m: any) => ({
            ...m,
            createdAt: m.createdAt
          }))
        };

        setSelectedConversation(formattedConversation);
        setViewMode('conversation');
        fetchConversations();
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setViewMode('conversation');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedConversation(null);
  };

  const handleConversationUpdate = (updatedConversation: Conversation) => {
    console.log("=== MESSAGES DROPDOWN UPDATE ===");
    console.log("MessagesDropdown - handleConversationUpdate called");
    console.log("Updated conversation ID:", updatedConversation.id);
    console.log("Updated messages count:", updatedConversation.messages.length);
    console.log("Updated last message:", updatedConversation.messages[updatedConversation.messages.length - 1]?.content.substring(0, 30));

    // Обновляем выбранную беседу
    if (selectedConversation && selectedConversation.id === updatedConversation.id) {
      console.log("Updating selected conversation");
      setSelectedConversation(updatedConversation);
    }

    // Обновляем список бесед
    console.log("Updating conversations list");
    setConversations(prev => {
      const updated = prev.map(conv => {
        if (conv.id === updatedConversation.id) {
          return updatedConversation;
        }
        return conv;
      });
      console.log("Conversations list updated");
      return updated;
    });
    console.log("=== END MESSAGES DROPDOWN UPDATE ===");
  };

  // Функция удаления сообщения через WebSocket
  const handleDeleteMessage = (messageId: string) => {
    console.log("MessagesDropdown - handleDeleteMessage called:", messageId);

    if (selectedConversation) {
      // Проверяем, что сообщение еще существует в списке
      const messageExists = selectedConversation.messages.some(msg => msg.id === messageId);
      if (!messageExists) {
        console.log("Message already removed from selected conversation, skipping");
        return;
      }

      // Обновляем выбранную беседу локально
      const updatedMessages = selectedConversation.messages.filter(msg => msg.id !== messageId);
      const updatedConversation = {
        ...selectedConversation,
        messages: updatedMessages,
        updatedAt: new Date().toISOString()
      };

      setSelectedConversation(updatedConversation);

      // Обновляем список бесед
      setConversations(prev => {
        const updated = prev.map(conv => {
          if (conv.id === selectedConversation.id) {
            return updatedConversation;
          }
          return conv;
        });
        return updated;
      });
    }
  };

  const unreadCount = conversations.reduce((count, conv) => {
    const lastMessage = conv.messages[conv.messages.length - 1];
    if (lastMessage && lastMessage.author.id !== session?.user?.id) {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110"
      >
        <FaEnvelope size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
        {!isConnected && (
          <span className="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </span>
        )}
      </button>

      {/* iOS-подобная анимация выпадающего списка */}
      <div
        className={`absolute right-0 mt-2 w-96 bg-[#101629] border border-gray-700 rounded-2xl shadow-2xl z-50 transform transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
        style={{
          transformOrigin: 'top right'
        }}
      >
        {viewMode === 'list' ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Сообщения</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4">
                  <MessageSkeleton />
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  <FaEnvelope size={32} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm mb-3">Нет сообщений</p>
                  <button
                    onClick={createNewConversation}
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                  >
                    Создать новое сообщение
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  {conversations.map((conversation) => {
                    const lastMessage = conversation.messages[conversation.messages.length - 1];
                    return (
                      <div
                        key={conversation.id}
                        className="p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-800/50 active:scale-95"
                        onClick={() => handleConversationClick(conversation)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">
                              {conversation.recipient?.name || "Новое обращение"}
                            </p>
                            {lastMessage && (
                              <p className="text-gray-400 text-sm truncate mt-1">
                                {lastMessage.content}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end ml-3">
                            <span className="text-xs text-gray-500">
                              {new Date(conversation.createdAt).toLocaleDateString()}
                            </span>
                            {lastMessage && (
                              <span className="text-xs text-gray-500 mt-1">
                                {new Date(lastMessage.createdAt).toLocaleTimeString('ru-RU', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            )}
                            {lastMessage?.author?.image && (
                              <div className="relative w-6 h-6 rounded-full overflow-hidden mt-2">
                                <img
                                  src={lastMessage.author.image || "/default-avatar.png"}
                                  alt="Avatar"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer только для списка */}
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={createNewConversation}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-white py-2 rounded-xl font-medium transition-colors"
              >
                Новое сообщение
              </button>
            </div>
          </>
        ) : (
          // Используем универсальный компонент для отображения беседы
          <ConversationView
            conversation={selectedConversation}
            onBack={handleBackToList}
            onClose={() => setIsOpen(false)}
            mode="modal"
            onConversationUpdate={handleConversationUpdate}
            onDeleteMessage={handleDeleteMessage}
          />
        )}
      </div>
    </div>
  );
}
