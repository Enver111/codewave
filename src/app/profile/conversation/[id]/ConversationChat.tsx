"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ConversationView from "../../../components/ConversationView";
import { Conversation } from "../../../types/conversation";
import { useSocket } from "../../../../hooks/useSocket";

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

interface ConversationChatProps {
  conversationId: string;
  initialMessages: Message[];
  isClosed: boolean;
}

export default function ConversationChat({
  conversationId,
  initialMessages,
  isClosed
}: ConversationChatProps) {
  const { data: session } = useSession();
  const [conversation, setConversation] = useState<Conversation | null>(null);

  // Обработчик удаления сообщения через WebSocket
  const handleMessageDeleted = (data: { messageId: string; conversationId: string; deletedBy: string }) => {
    console.log("ConversationChat - WebSocket message deleted:", data);

    if (conversation && data.conversationId === conversationId) {
      // Проверяем, что сообщение еще существует в списке
      const messageExists = conversation.messages.some(msg => msg.id === data.messageId);
      if (!messageExists) {
        console.log("Message already removed from conversation state, skipping");
        return;
      }

      const updatedMessages = conversation.messages.filter(msg => msg.id !== data.messageId);

      setConversation(prev => prev ? {
        ...prev,
        messages: updatedMessages,
        updatedAt: new Date().toISOString()
      } : null);

      console.log(`Message ${data.messageId} removed from conversation state`);
    }
  };

  // Инициализация WebSocket
  const { deleteMessage } = useSocket({
    conversationId,
    onMessageDeleted: handleMessageDeleted,
    onError: (error) => {
      console.error("WebSocket error in ConversationChat:", error);
      // Если ошибка связана с удалением сообщения, можно показать уведомление
      if (error.includes("Message not found")) {
        console.log("Message was already deleted or not found");
      }
    }
  });

  useEffect(() => {
    // Преобразуем данные в формат Conversation
    const conv: Conversation = {
      id: conversationId,
      createdAt: initialMessages[0]?.createdAt || new Date().toISOString(),
      updatedAt: initialMessages[0]?.createdAt || new Date().toISOString(),
      user: {
        id: session?.user?.id || '',
        name: session?.user?.name || null,
        email: session?.user?.email || null,
      },
      messages: initialMessages.map(msg => ({
        id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt,
        author: {
          id: msg.author.id,
          name: msg.author.name,
          image: msg.author.image
        }
      })),
      isClosed
    };
    setConversation(conv);
  }, [conversationId, initialMessages, isClosed, session]);

  const handleConversationUpdate = (updatedConversation: Conversation) => {
    console.log("=== CONVERSATION UPDATE ===");
    console.log("ConversationChat - handleConversationUpdate called");
    console.log("Previous messages count:", conversation?.messages.length);
    console.log("Updated messages count:", updatedConversation.messages.length);
    console.log("Previous last message:", conversation?.messages[conversation.messages.length - 1]?.content.substring(0, 30));
    console.log("Updated last message:", updatedConversation.messages[updatedConversation.messages.length - 1]?.content.substring(0, 30));

    // Просто обновляем беседу полностью
    setConversation(updatedConversation);

    console.log("Conversation state updated");
    console.log("=== END CONVERSATION UPDATE ===");
  };

  if (!conversation) {
    return <div className="text-center py-4">Загрузка беседы...</div>;
  }

  return (
    <ConversationView
      conversation={conversation}
      mode="page"
      onConversationUpdate={handleConversationUpdate}
      onDeleteMessage={deleteMessage}
    />
  );
}
