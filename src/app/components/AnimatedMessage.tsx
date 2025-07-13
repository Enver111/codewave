"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaCheckDouble, FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface AnimatedMessageProps {
  message: any;
  isOwnMessage: boolean;
  isNew?: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  onMessageDeleted?: (messageId: string) => void;
}

export default function AnimatedMessage({
  message,
  isOwnMessage,
  isNew = false,
  status = 'sent',
  onMessageDeleted
}: AnimatedMessageProps) {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  // Создаем локальную переменную с правильным типом
  const handleMessageDeleted = onMessageDeleted || (() => {});

  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />;
      case 'sent':
        return <FaCheck className="text-gray-400 text-xs" />;
      case 'delivered':
        return <FaCheckDouble className="text-gray-400 text-xs" />;
      case 'read':
        return <FaCheckDouble className="text-blue-400 text-xs" />;
      default:
        return null;
    }
  };

  const canDeleteMessage = () => {
    if (!session?.user?.id) return false;

    return (
      // Автор сообщения может удалить свое сообщение
      message.author.id === session.user.id ||
      // Админ может удалить любое сообщение
      session.user.role === 'ADMIN'
    );
  };

  const handleDelete = async () => {
    if (!canDeleteMessage() || isDeleting) return;

    // Дополнительная проверка ID сообщения
    if (!message.id || message.id.length < 10) {
      console.error('Invalid message ID:', message.id);
      return;
    }

    // Проверяем, что это не временное сообщение
    if (message.id.startsWith('temp-')) {
      console.log('Cannot delete temporary message:', message.id);
      return;
    }

    console.log("Attempting to delete message:", {
      messageId: message.id,
      messageAuthorId: message.author.id,
      sessionUserId: session?.user?.id,
      sessionRole: session?.user?.role
    });

    setIsDeleting(true);
    try {
      // Если передана функция onMessageDeleted, используем её (для WebSocket)
      if (onMessageDeleted) {
        console.log("Using onMessageDeleted function for WebSocket deletion");
        onMessageDeleted(message.id);
        return;
      }

      // Иначе используем API (fallback)
      console.log("Using API deletion as fallback");
      const response = await fetch(`/api/messages/${message.id}`, { method: 'DELETE' });
      const result = await response.json();
      console.log("Delete result:", result);

      if (result.success) {
        console.log("Message deleted successfully via API");
      } else {
        console.error('Failed to delete message:', result.message);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={isNew ? { opacity: 0, y: 20, scale: 0.8 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
          type: "spring",
          stiffness: 200
        }}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
        onMouseEnter={() => setShowDeleteButton(true)}
        onMouseLeave={() => setShowDeleteButton(false)}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`max-w-[70%] p-3 rounded-2xl relative group ${
            isOwnMessage
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-700 text-white'
          }`}
        >
          <p className="text-sm leading-relaxed pr-8">{message.content}</p>

          <div className="flex items-center justify-end gap-1 mt-2">
            <span className="text-xs opacity-70">
              {new Date(message.createdAt).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            {isOwnMessage && (
              <div className="ml-1">
                {getStatusIcon()}
              </div>
            )}
          </div>

          {/* Кнопка удаления */}
          {canDeleteMessage() && showDeleteButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleDelete}
              disabled={isDeleting}
              className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                isOwnMessage
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-500 text-white'
              } ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
              title="Удалить сообщение"
            >
              {isDeleting ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaTrash size={12} />
              )}
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
