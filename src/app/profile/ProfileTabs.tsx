"use client";

import { useState, useEffect } from "react";
import { FaCog, FaEnvelope } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useMessageContext } from "../context/MessageContext";
import ProfileForm from "./ProfileForm";
import AvatarUpload from "./AvatarUpload";
import LogoutButton from "./LogoutButton";
import ConversationsList from "./ConversationsList";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: 'USER' | 'ADMIN';
}

interface ProfileTabsProps {
  user: User;
}

interface Conversation {
  id: string;
  messages: Array<{
    id: string;
    author: {
      id: string;
    };
  }>;
}

export default function ProfileTabs({ user }: ProfileTabsProps) {
  const { data: session } = useSession();
  const { unreadCount, setUnreadCount } = useMessageContext();
  const [activeTab, setActiveTab] = useState<'messages' | 'settings'>('messages');

  useEffect(() => {
    if (session?.user?.id) {
      fetchUnreadCount();
    }
  }, [session]);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch(`/api/conversations?userId=${session?.user?.id}`);
      if (response.ok) {
        const conversations: Conversation[] = await response.json();
        const count = conversations.reduce((total, conv) => {
          const lastMessage = conv.messages[conv.messages.length - 1];
          if (lastMessage && lastMessage.author.id !== session?.user?.id) {
            return total + 1;
          }
          return total;
        }, 0);
        setUnreadCount(count);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Табы с анимированным индикатором */}
      <div className="relative">
        <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 relative z-10 ${
              activeTab === 'messages'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaEnvelope size={16} />
            <span className="font-medium">Сообщения</span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 relative z-10 ${
              activeTab === 'settings'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaCog size={16} />
            <span className="font-medium">Настройки</span>
          </button>
        </div>

        {/* Анимированный индикатор */}
        <div
          className={`absolute top-1 bottom-1 bg-yellow-500 rounded-md transition-all duration-300 ease-out ${
            activeTab === 'messages'
              ? 'left-1 w-[calc(50%-0.125rem)]'
              : 'left-[calc(50%+0.125rem)] w-[calc(50%-0.125rem)]'
          }`}
        />
      </div>

      {/* Контент табов с анимацией */}
      <div className="min-h-[400px] relative">
        <div
          className={`transition-all duration-500 ease-in-out ${
            activeTab === 'messages'
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-4 absolute inset-0 pointer-events-none'
          }`}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">Мои сообщения</h3>
            </div>
            <ConversationsList />
          </div>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out ${
            activeTab === 'settings'
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-4 absolute inset-0 pointer-events-none'
          }`}
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4 text-white">Настройки профиля</h3>
              <ProfileForm user={user} />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 text-white">Аватар</h3>
              <AvatarUpload currentAvatar={user.image} />
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
