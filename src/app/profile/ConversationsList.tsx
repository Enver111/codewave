"use client";

import { useState, useTransition, useEffect } from "react";
import { getUserConversations, createConversation, getAllUsers } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ConversationSkeleton from "@/app/components/ConversationSkeleton";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: 'USER' | 'ADMIN';
}

interface Conversation {
  id: string;
  createdAt: string;
  updatedAt: string;
  isClosed: boolean;
  messages: Message[];
  _count: {
    messages: number;
  };
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
  recipient: {
    id: string;
    name: string | null;
    email: string | null;
  } | null;
}

export default function ConversationsList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [showNewConversationModal, setShowNewConversationModal] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();
  const session = useSession();


  // Загружаем обращения и данные пользователя при монтировании компонента
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [conversationsResult, usersResult] = await Promise.all([
        getUserConversations(),
        getAllUsers()
      ]);

      if (conversationsResult.success && conversationsResult.conversations) {
        setConversations(conversationsResult.conversations.map((conv: any) => ({
          ...conv,
          createdAt: conv.createdAt.toISOString(),
          updatedAt: conv.updatedAt.toISOString(),
          messages: conv.messages.map((m: any) => ({
            ...m,
            createdAt: m.createdAt.toISOString()
          }))
        })));
      } else {
        setMessage({ type: 'error', text: conversationsResult.message || 'Ошибка загрузки обращений' });
      }

      if (usersResult.success && usersResult.users) {
        setUsers(usersResult.users);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Произошла ошибка при загрузке данных' });
    }
    setIsLoading(false);
  };

  const handleCreateConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    startTransition(async () => {
      try {
        const result = await createConversation(newMessage, selectedRecipient || undefined);
        if (result.success) {
          setShowNewConversationModal(false);
          setNewMessage("");
          setSelectedRecipient("");
          setMessage({ type: 'success', text: "Обращение создано!" });
          loadData(); // Перезагружаем список
        } else {
          setMessage({ type: 'error', text: result.message || 'Ошибка создания обращения' });
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Произошла ошибка при создании обращения' });
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getConversationTitle = (conversation: Conversation) => {
    if (conversation.recipient) {
      return `С ${conversation.recipient.name || conversation.recipient.email}`;
    }
    return `Обращение #${conversation.id.slice(-8)}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Мои обращения</h3>
          <div className="w-32 h-9 bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <ConversationSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Мои обращения</h3>
        <button
          onClick={() => setShowNewConversationModal(true)}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
        >
          Новое обращение
        </button>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>У вас пока нет обращений в поддержку.</p>
          <p className="text-sm mt-2">Создайте новое обращение, если у вас есть вопросы.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => router.push(`/profile/conversation/${conversation.id}`)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-400">
                    {getConversationTitle(conversation)}
                  </p>
                  <p className="text-white mt-1 line-clamp-2">
                    {conversation.messages.length > 0
                      ? conversation.messages[conversation.messages.length - 1].content
                      : "Пустое обращение"
                    }
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>{conversation._count.messages} сообщений</span>
                    <span>{formatDate(conversation.updatedAt)}</span>
                    {conversation.isClosed && (
                      <span className="text-red-400">Закрыто</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {conversation.messages.length > 0 && conversation.messages[conversation.messages.length - 1].author.image && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={conversation.messages[conversation.messages.length - 1].author.image || "/default-avatar.png"}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Модальное окно для создания нового обращения */}
      {showNewConversationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Новое обращение</h3>
            <form onSubmit={handleCreateConversation}>
              {users.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Выберите получателя
                  </label>
                  <select
                    value={selectedRecipient}
                    onChange={(e) => setSelectedRecipient(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    <option value="">Выберите пользователя...</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name || user.email} ({user.role})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Опишите вашу проблему или вопрос..."
                className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 resize-none"
                required
              />
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  disabled={isPending || !newMessage.trim()}
                  className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  {isPending ? "Создание..." : "Создать"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewConversationModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
