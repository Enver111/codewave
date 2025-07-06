"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import Image from "next/image";
import { useLoading } from "../context/LoadingContext";
import { useMessageContext } from "../context/MessageContext";
import MessagesDropdown from "./MessagesDropdown";
import { useEffect, useState } from "react";

export default function Header() {
  const { session } = useLoading();
  const { setUnreadCount } = useMessageContext();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUnreadCountChange = (count: number) => {
    setUnreadCount(count);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 px-6 transition-all duration-500 ease-out ${
      isScrolled
        ? 'bg-[#0a0e1a] backdrop-blur-xl shadow-lg shadow-black/20 border-b border-b-yellow-500/10'
        : 'bg-[#0a0e1a] backdrop-blur-md border-b-yellow-500/10'
    }`}>
      <Container>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/icons/codewave_logo.svg"
              alt="CodeWave Logo"
              width={58}
              height={58}
              className="group-hover:scale-110 transition-all duration-500 ease-out group-hover:rotate-3"
            />
            <span className="text-2xl font-semibold text-yellow-500/25 bg-gradient-to-r from-yellow-500 to-orange-500
              via-yellow-100 to-yellow-200 bg-clip-text text-transparent font-ubuntu group-hover:scale-105 transition-transform duration-300">
              CodeWave
            </span>
          </Link>
          <nav className="hidden md:flex items-center">
            <Link
              href="/#services"
              className="hover:text-yellow-300 transition-all duration-300 px-4 py-2 relative group font-ubuntu"
            >
              <span className="relative z-10">Услуги</span>
              <span className="absolute inset-0 bg-yellow-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link
              href="/portfolio"
              className="hover:text-yellow-300 transition-all duration-300 px-4 py-2 relative group font-ubuntu"
            >
              <span className="relative z-10">Портфолио</span>
              <span className="absolute inset-0 bg-yellow-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link
              href="/reviews"
              className="hover:text-yellow-300 transition-all duration-300 px-4 py-2 relative group font-ubuntu"
            >
              <span className="relative z-10">Отзывы</span>
              <span className="absolute inset-0 bg-yellow-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link
              href="/contacts"
              className="hover:text-yellow-300 transition-all duration-300 px-4 py-2 relative group font-ubuntu"
            >
              <span className="relative z-10">Контакты</span>
              <span className="absolute inset-0 bg-yellow-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-yellow-400 hidden sm:block font-ubuntu animate-fade-in">
                  Привет, {session.user?.name?.split(' ')[0] || 'Пользователь'}
                </span>

                <Link
                  href="/profile"
                  className="hover:text-yellow-300 transition-all duration-300 px-4 py-2 relative group font-ubuntu"
                >
                  <span className="relative z-10 ">Профиль</span>
                  <span className="absolute inset-0 bg-yellow-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                </Link>
                {session.user?.role === 'ADMIN' && (
                  <div
                    className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 px-4 py-2 relative group font-ubuntu"
                  >
                    <span className="relative z-10">Админ</span>
                  </div>
                )}
                <MessagesDropdown onUnreadCountChange={handleUnreadCountChange} />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 relative group font-ubuntu"
                >
                  <span className="relative z-10">Войти</span>
                  <span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25 font-ubuntu"
                >
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
