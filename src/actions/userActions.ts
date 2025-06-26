"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface UpdateProfileData {
  name: string;
}

export async function updateProfile(data: UpdateProfileData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, message: "Не авторизован." };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
      },
    });

    // Делаем revalidate, чтобы Next.js обновил кэш для этой страницы
    revalidatePath("/profile");
    return { success: true, message: "Профиль успешно обновлен." };

  } catch (error) {
    console.error("Ошибка обновления профиля:", error);
    return { success: false, message: "Произошла ошибка при обновлении профиля." };
  }
}

// Создание нового обращения
export async function createConversation(initialMessage: string, recipientId?: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, message: "Не авторизован." };
  }

  try {
    // Если пользователь не админ, то он может писать только админам
    if (session.user.role !== 'ADMIN') {
      // Находим первого админа
      const admin = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
        select: { id: true }
      });

      if (!admin) {
        return { success: false, message: "Администратор не найден." };
      }

      recipientId = admin.id;
    }

    const conversation = await prisma.conversation.create({
      data: {
        userId: session.user.id,
        recipientId: recipientId,
        messages: {
          create: {
            content: initialMessage,
            authorId: session.user.id,
          },
        },
      },
      include: {
        messages: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    revalidatePath("/profile");
    return { success: true, conversation };
  } catch (error) {
    console.error("Ошибка создания обращения:", error);
    return { success: false, message: "Произошла ошибка при создании обращения." };
  }
}

// Получение обращений пользователя
export async function getUserConversations() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, message: "Не авторизован." };
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { userId: session.user.id },
          { recipientId: session.user.id }
        ],
      },
      include: {
        messages: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return { success: true, conversations };
  } catch (error) {
    console.error("Ошибка получения обращений:", error);
    return { success: false, message: "Произошла ошибка при получении обращений." };
  }
}

// Добавление сообщения в обращение
export async function addMessage(conversationId: string, content: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, message: "Не авторизован." };
  }

  try {
    // Проверяем, что пользователь имеет доступ к этому обращению
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          { userId: session.user.id },
          { recipientId: session.user.id }
        ],
      },
    });

    if (!conversation) {
      return { success: false, message: "Обращение не найдено." };
    }

    const message = await prisma.message.create({
      data: {
        content,
        conversationId,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Обновляем время последнего сообщения в обращении
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    revalidatePath("/profile");
    return { success: true, message };
  } catch (error) {
    console.error("Ошибка добавления сообщения:", error);
    return { success: false, message: "Произошла ошибка при отправке сообщения." };
  }
}

// Получение всех пользователей (для админов)
export async function getAllUsers() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return { success: false, message: "Недостаточно прав." };
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        id: { not: session.user.id }, // Исключаем самого админа
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return { success: true, users };
  } catch (error) {
    console.error("Ошибка получения пользователей:", error);
    return { success: false, message: "Произошла ошибка при получении пользователей." };
  }
}
