import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Container } from "../../../components/container";
import ConversationChat from "./AdminConversationChat";
import Header from "../../../components/header";

interface AdminConversationPageProps {
  params: {
    id: string;
  };
}

export default async function AdminConversationPage({ params }: AdminConversationPageProps) {
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

  // Получаем обращение с сообщениями
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: params.id,
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

  if (!conversation) {
    redirect("/admin");
  }

  // Определяем участников разговора
  const participants = [];
  if (conversation.user.name || conversation.user.email) {
    participants.push(conversation.user.name || conversation.user.email);
  }
  if (conversation.recipient && (conversation.recipient.name || conversation.recipient.email)) {
    participants.push(conversation.recipient.name || conversation.recipient.email);
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />
      <main className="pt-24">
        <Container>
          <div className="bg-[#101629] p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
            <header className="flex items-center justify-between pb-4 border-b border-gray-700">
              <div>
                <h1 className="text-2xl font-bold">
                  Обращение #{conversation.id.slice(-8)}
                </h1>
                <p className="text-gray-400">
                  Участники: {participants.join(' ↔ ')}
                </p>
                <p className="text-gray-400 text-sm">
                  Создано {new Date(conversation.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <a
                href="/admin"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
              >
                Назад к админ-панели
              </a>
            </header>

            <ConversationChat
              conversationId={conversation.id}
              initialMessages={conversation.messages.map((m: any) => ({ ...m, createdAt: m.createdAt.toISOString() }))}
              isClosed={conversation.isClosed}
            />
          </div>
        </Container>
      </main>
    </div>
  );
}
