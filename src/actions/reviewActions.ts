"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Удаление отзыва (только для администраторов)
export async function deleteReview(reviewId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, message: "Не авторизован." };
    }

    // Проверяем, что пользователь является администратором
    if (session.user.role !== 'ADMIN') {
      return { success: false, message: "Недостаточно прав. Требуются права администратора." };
    }

    // Проверяем, что отзыв существует
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!review) {
      return { success: false, message: "Отзыв не найден." };
    }

    // Удаляем отзыв
    await prisma.review.delete({
      where: { id: reviewId },
    });

    // Обновляем кэш страниц
    revalidatePath("/");
    revalidatePath("/reviews");

    return {
      success: true,
      message: `Отзыв от ${review.user.name || 'пользователя'} успешно удален.`
    };
  } catch (error) {
    console.error("Ошибка удаления отзыва:", error);
    return { success: false, message: "Произошла ошибка при удалении отзыва." };
  }
}

// Создание отзыва (существующая функция, если нужно)
export async function createReview(data: { rating: number; text: string }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, message: "Не авторизован." };
    }

    const review = await prisma.review.create({
      data: {
        rating: data.rating,
        text: data.text,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/reviews");

    return { success: true, review };
  } catch (error) {
    console.error("Ошибка создания отзыва:", error);
    return { success: false, message: "Произошла ошибка при создании отзыва." };
  }
}
