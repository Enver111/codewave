"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

interface AdminConversationsListProps {
  initialConversations: Conversation[];
}

export default function AdminConversationsList({ initialConversations }: AdminConversationsListProps) {
  const [conversations] = useState<Conversation[]>(initialConversations);
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
  const router = useRouter();

  const filteredConversations = conversations.filter(conversation => {
    if (filter === 'open') return !conversation.isClosed;
    if (filter === 'closed') return conversation.isClosed;
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (isClosed: boolean) => {
    return isClosed ? 'text-red-400' : 'text-green-400';
  };

  const getStatusText = (isClosed: boolean) => {
    return isClosed ? 'Закрыто' : 'Открыто';
  };

  const getConversationParticipants = (conversation: Conversation) => {
    const participants = [];
    if (conversation.user.name || conversation.user.email) {
      participants.push(conversation.user.name || conversation.user.email);
    }
    if (conversation.recipient && (conversation.recipient.name || conversation.recipient.email)) {
      participants.push(conversation.recipient.name || conversation.recipient.email);
    }
    return participants.join(' ↔ ');
  };

  return (
    <div className="space-y-6">
      {/* Фильтры */}
      <div className="flex gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'all'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Все ({conversations.length})
        </button>
        <button
          onClick={() => setFilter('open')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'open'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Открытые ({conversations.filter(c => !c.isClosed).length})
        </button>
        <button
          onClick={() => setFilter('closed')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'closed'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Закрытые ({conversations.filter(c => c.isClosed).length})
        </button>
      </div>

      {/* Список обращений */}
      {filteredConversations.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>Нет обращений для отображения.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => router.push(`/admin/conversation/${conversation.id}`)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold">
                      Обращение #{conversation.id.slice(-8)}
                    </h3>
                    <span className={`text-sm font-medium ${getStatusColor(conversation.isClosed)}`}>
                      {getStatusText(conversation.isClosed)}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-gray-300">
                      <span className="font-medium">Участники:</span> {getConversationParticipants(conversation)}
                    </p>
                  </div>

                  <p className="text-white mb-3 line-clamp-2">
                    {conversation.messages[0]?.content || "Пустое обращение"}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <span>{conversation._count.messages} сообщений</span>
                    <span>Создано: {formatDate(conversation.createdAt)}</span>
                    <span>Обновлено: {formatDate(conversation.updatedAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {conversation.messages[0]?.author.image && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={conversation.messages[0].author.image}
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
    </div>
  );
}
