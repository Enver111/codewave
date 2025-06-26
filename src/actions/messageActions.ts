"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function deleteMessage(messageId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    console.log("Attempting to delete message:", messageId);
    console.log("User session:", {
      userId: session.user.id,
      role: session.user.role,
      email: session.user.email
    });

    // Находим сообщение
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        conversation: {
          include: {
            user: true,
            recipient: true
          }
        },
        author: true
      }
    });

    console.log("Found message:", message ? {
      id: message.id,
      authorId: message.authorId,
      conversationId: message.conversationId,
      conversationUserId: message.conversation.userId,
      conversationRecipientId: message.conversation.recipientId
    } : "null");

    if (!message) {
      return { success: false, message: "Message not found" };
    }

    // Проверяем права на удаление
    const canDelete =
      // Автор сообщения может удалить свое сообщение
      message.authorId === session.user.id ||
      // Админ может удалить любое сообщение
      session.user.role === 'ADMIN' ||
      // Создатель беседы может удалить любое сообщение в своей беседе
      message.conversation.userId === session.user.id ||
      // Получатель беседы может удалить любое сообщение в беседе с ним
      message.conversation.recipientId === session.user.id;

    console.log("Can delete check:", {
      isAuthor: message.authorId === session.user.id,
      isAdmin: session.user.role === 'ADMIN',
      isConversationOwner: message.conversation.userId === session.user.id,
      isRecipient: message.conversation.recipientId === session.user.id,
      canDelete
    });

    if (!canDelete) {
      return {
        success: false,
        message: "You can only delete your own messages or be admin/conversation owner"
      };
    }

    // Удаляем сообщение
    await prisma.message.delete({
      where: { id: messageId }
    });

    // Обновляем время последнего обновления беседы
    await prisma.conversation.update({
      where: { id: message.conversationId },
      data: { updatedAt: new Date() }
    });

    console.log("Message deleted successfully");

    return {
      success: true,
      message: "Message deleted successfully",
      conversationId: message.conversationId
    };
  } catch (error) {
    console.error("Error deleting message:", error);
    return { success: false, message: "Internal server error" };
  }
}
