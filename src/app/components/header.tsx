"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import Image from "next/image";
import { useLoading } from "../context/LoadingContext";
import { useMessageContext } from "../context/MessageContext";
import MessagesDropdown from "./MessagesDropdown";

export default function Header() {
  const { session } = useLoading();
  const { setUnreadCount } = useMessageContext();

  const handleUnreadCountChange = (count: number) => {
    setUnreadCount(count);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0a0e1a] px-6  backdrop-blur-md">
      <Container>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/icons/codewave_logo.svg"
              alt="CodeWave Logo"
              width={58}
              height={58}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-2xl font-semibold text-yellow-500/25 bg-gradient-to-r from-yellow-500 to-orange-500
              via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
              CodeWave
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#services" className="text-gray-300 hover:text-white transition-colors">Услуги</Link>
            <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">Портфолио</Link>
            <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">Отзывы</Link>
            <Link href="/contacts" className="text-gray-300 hover:text-white transition-colors">Контакты</Link>
          </nav>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-white hidden sm:block">
                  Привет, {session.user?.name?.split(' ')[0] || 'Пользователь'}!
                </span>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors px-4 py-2">
                  Профиль
                </Link>
                {session.user?.role === 'ADMIN' && (
                  <Link href="/admin" className="text-yellow-400 hover:text-yellow-300 transition-colors px-4 py-2">
                    Админ
                  </Link>
                )}
                <MessagesDropdown onUnreadCountChange={handleUnreadCountChange} />
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors px-4 py-2">
                  Войти
                </Link>
                <Link href="/register" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300">
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
