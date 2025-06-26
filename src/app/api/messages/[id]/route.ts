import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Находим сообщение
    const message = await prisma.message.findUnique({
      where: { id: params.id },
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

    if (!message) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
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

    if (!canDelete) {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own messages or be admin/conversation owner" },
        { status: 403 }
      );
    }

    // Удаляем сообщение
    await prisma.message.delete({
      where: { id: params.id }
    });

    // Обновляем время последнего обновления беседы
    await prisma.conversation.update({
      where: { id: message.conversationId },
      data: { updatedAt: new Date() }
    });

    return NextResponse.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
