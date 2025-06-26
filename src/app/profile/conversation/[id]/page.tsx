import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Container } from "../../../components/container";
import ConversationChat from "./ConversationChat";
import Header from "../../../components/header";

interface ConversationPageProps {
  params: Promise<{
    id: string | string[];
  }>;
}

export default async function ConversationPage({ params }: ConversationPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Дожидаемся параметров маршрута
  const resolvedParams = await params;

  // Убеждаемся, что id - это строка
  const conversationId = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;

  if (!conversationId) {
    redirect("/profile");
  }

  // Получаем обращение с сообщениями
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
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
    },
  });

  if (!conversation) {
    redirect("/profile");
  }

  // Определяем, кто является другим участником разговора
  const otherParticipant = conversation.user.id === session.user.id
    ? conversation.recipient
    : conversation.user;

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />
      <main className="pt-24">
        <Container>
          <div className="bg-[#101629] p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
            <header className="flex items-center justify-between pb-4 border-b border-gray-700">
              <div>
                <h1 className="text-2xl font-bold">
                  {otherParticipant
                    ? `Разговор с ${otherParticipant.name || otherParticipant.email}`
                    : `Обращение #${conversation.id.slice(-8)}`
                  }
                </h1>
                <p className="text-gray-400">
                  Создано {new Date(conversation.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <a
                href="/profile"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
              >
                Назад к профилю
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
