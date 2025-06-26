import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { Container } from "../components/container";
import ProfileTabs from "./ProfileTabs";
import Header from "../components/header";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Получаем самые свежие данные пользователя из БД
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />
      <main className="pt-24">
        <Container>
          <div className="bg-[#101629] p-8 rounded-xl shadow-lg max-w-6xl mx-auto">
            <header className="flex items-center gap-6 pb-6 border-b border-gray-700">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "User Avatar"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{user.name}</h1>
                <p className="text-lg text-gray-400">{user.email}</p>
                <p className="text-sm text-yellow-400 mt-1">
                  {user.role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
                </p>
              </div>
            </header>

            <div className="mt-8">
              <ProfileTabs user={user} />
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
