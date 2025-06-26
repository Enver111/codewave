import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Container } from "../components/container";
import AdminConversationsList from "./AdminConversationsList";
import Header from "../components/header";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Проверяем, что пользователь является администратором
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/profile");
  }

  // Получаем все обращения с информацией о пользователях
  const conversations = await prisma.conversation.findMany({
    include: {
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

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />
      <main className="pt-24">
        <Container>
          <div className="bg-[#101629] p-8 rounded-xl shadow-lg max-w-6xl mx-auto">
            <header className="flex items-center justify-between pb-6 border-b border-gray-700">
              <div>
                <h1 className="text-4xl font-bold">Панель администратора</h1>
                <p className="text-lg text-gray-400 mt-2">
                  Управление обращениями пользователей
                </p>
              </div>
              <a
                href="/profile"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
              >
                Вернуться к профилю
              </a>
            </header>

            <main className="mt-8">
              <AdminConversationsList initialConversations={conversations.map((conv: any) => ({
                ...conv,
                createdAt: conv.createdAt.toISOString(),
                updatedAt: conv.updatedAt.toISOString(),
                messages: conv.messages.map((m: any) => ({
                  ...m,
                  createdAt: m.createdAt.toISOString()
                }))
              }))} />
            </main>
          </div>
        </Container>
      </main>
    </div>
  );
}
