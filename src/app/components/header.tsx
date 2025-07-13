"use client";
import Link from "next/link";
import { Container } from "./container";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 px-6 transition-all duration-500 ease-out ${
      isScrolled
        ? 'bg-[#0a0e1a] backdrop-blur-xl shadow-lg shadow-black/20 border-b border-b-yellow-500/10'
        : 'bg-[#0a0e1a] backdrop-blur-md border-b-yellow-500/10'
    }`}>
      <Container>
        <div className="container mx-auto px-0 py-4 flex justify-between items-center">
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
          {/* Desktop nav */}
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
          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button onClick={() => setLoginModalOpen(true)}>
              Войти
            </Button>
          </div>
          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              className="p-2 rounded-md hover:bg-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Открыть меню"
            >
              <Bars3Icon className="w-7 h-7 text-yellow-400" />
            </button>
            <Button onClick={() => setLoginModalOpen(true)}>
              Войти
            </Button>
          </div>
        </div>
        {/* Мобильное меню */}
      </Container>
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <Modal open={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <button
          onClick={() => setLoginModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl font-bold"
          aria-label="Закрыть"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
          Вход скоро появится!
        </h2>
        <p className="text-lg text-gray-200 mb-2">Мы уже работаем над системой авторизации 🚀</p>
        <p className="text-sm text-gray-400">Следите за обновлениями — совсем скоро вы сможете войти и получить больше возможностей!</p>
      </Modal>
    </header>
  );
}
