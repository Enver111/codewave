"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { addMessage } from "@/actions/userActions";
import { deleteMessage } from "@/actions/messageActions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

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

interface AdminConversationChatProps {
  conversationId: string;
  initialMessages: Message[];
  isClosed: boolean;
}

export default function AdminConversationChat({
  conversationId,
  initialMessages,
  isClosed
}: AdminConversationChatProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Автоматическая прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const canDeleteMessage = (messageAuthorId: string) => {
    if (!session?.user?.id) return false;

    return (
      // Админ может удалить любое сообщение
      session.user.role === 'ADMIN' ||
      // Автор сообщения может удалить свое сообщение
      messageAuthorId === session.user.id
    );
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!canDeleteMessage(messages.find(m => m.id === messageId)?.author.id || '')) return;

    setDeletingMessageId(messageId);
    try {
      const result = await deleteMessage(messageId);
      if (result.success) {
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        setMessage({ type: 'success', text: "Сообщение удалено!" });
        setTimeout(() => setMessage(null), 2000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Ошибка удаления сообщения' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Произошла ошибка при удалении сообщения' });
    } finally {
      setDeletingMessageId(null);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isClosed) return;

    startTransition(async () => {
      const result = await addMessage(conversationId, newMessage);
      if (result.success && typeof result.message !== 'string') {
        // Конвертируем результат в правильный формат
        const formattedMessage: Message = {
          id: result.message.id,
          content: result.message.content,
          createdAt: result.message.createdAt.toISOString(),
          author: {
            id: result.message.authorId,
            name: result.message.author.name,
            image: result.message.author.image,
          },
        };
        setMessages(prev => [...prev, formattedMessage]);
        setNewMessage("");
        setMessage({ type: 'success', text: "Сообщение отправлено!" });
        // Очищаем сообщение об успехе через 2 секунды
        setTimeout(() => setMessage(null), 2000);
      } else {
        setMessage({ type: 'error', text: typeof result.message === 'string' ? result.message : 'Ошибка отправки сообщения' });
      }
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-96">
      {/* Область сообщений */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3 group">
            <div className="flex-shrink-0">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={msg.author.image || "/default-avatar.png"}
                  alt={msg.author.name || "User"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">
                  {msg.author.name || "Пользователь"}
                </span>
                <span className="text-xs text-gray-400">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg relative">
                <p className="text-white">{msg.content}</p>

                {/* Кнопка удаления */}
                {canDeleteMessage(msg.author.id) && (
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    disabled={deletingMessageId === msg.id}
                    className={`absolute top-2 right-2 p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100 ${
                      deletingMessageId === msg.id
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white hover:scale-110'
                    }`}
                    title="Удалить сообщение"
                  >
                    {deletingMessageId === msg.id ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaTrash size={12} />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Форма отправки сообщения */}
      {!isClosed ? (
        <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              disabled={isPending}
            />
            <button
              type="submit"
              disabled={isPending || !newMessage.trim()}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors disabled:opacity-50"
            >
              {isPending ? "Отправка..." : "Отправить"}
            </button>
          </div>
        </form>
      ) : (
        <div className="border-t border-gray-700 p-4 text-center text-gray-400">
          Это обращение закрыто. Новые сообщения отправлять нельзя.
        </div>
      )}

      {message && (
        <div className={`text-center p-2 text-sm ${
          message.type === 'success' ? 'text-green-400' : 'text-red-400'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
