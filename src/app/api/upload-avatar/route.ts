import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Проверяем авторизацию
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Получаем файл из запроса
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Проверяем тип файла
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 });
    }

    // Создаем уникальное имя файла
    const fileName = `avatars/${session.user.id}-${Date.now()}-${file.name}`;

    // Загружаем файл в Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
    });

    // Обновляем аватар пользователя в базе данных
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: blob.url },
    });

    return NextResponse.json({
      success: true,
      url: blob.url
    });

  } catch (error) {
    console.error("Error uploading avatar:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
