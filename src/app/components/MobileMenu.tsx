"use client";
import Link from "next/link";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Session } from "next-auth";
import { HomeIcon, BriefcaseIcon, ChatBubbleLeftRightIcon, PhoneIcon, UserCircleIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, UserPlusIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  session: Session | null;
  signOut: () => void;
  handleUnreadCountChange: (count: number) => void;
}

export default function MobileMenu({ open, onClose, session, signOut }: MobileMenuProps) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (open) setIsVisible(true);
  }, [open]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 350); // Длительность анимации
  };

  if (!open && !isVisible) return null;
  return (
    <>
      <div
        className={`fixed inset-0 ${isVisible ? 'z-40 transition-opacity animate-fade-in' : 'z-40 transition-opacity animate-fade-out'}`}
        onClick={handleClose}
        style={{
          background: 'rgba(0,0,0,0.5)',
        }}
      />
      <div
        className={`fixed top-0 right-0 min-h-screen w-[75vw] max-w-[400px] z-50 shadow-2xl flex flex-col border-l-2 border-yellow-400 bg-gradient-to-br from-[#0a0e1a] to-[#181f2e] ${isVisible ? 'animate-slide-in-right' : 'animate-slide-out-right'}`}
        style={{
          background: 'linear-gradient(135deg, #0a0e1a 0%, #181f2e 100%)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3 min-w-0">
            {session && (
              <Image
                src={session.user?.image || "/default-avatar.png"}
                alt={session.user?.name || "User Avatar"}
                width={50}
                height={50}
                className="rounded-full border border-yellow-400 object-cover"
                priority
              />
            )}
            <span className="text-xl font-semibold text-yellow-400 font-ubuntu truncate max-w-[110px]">
              {session ? session.user?.name?.split(' ')[0] : ''}
            </span>
          </div>
          <button onClick={handleClose} aria-label="Закрыть меню" className="p-2 rounded-md hover:bg-yellow-500/10">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#FFD600" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="border-t border-yellow-400/40 mx-2 mb-2" />
        <nav className="flex flex-col gap-2 px-2 py-4">
          <MenuLink href="/#services" onClick={onClose} icon={<BriefcaseIcon className="w-6 h-6 text-yellow-400" />} label="Услуги" />
          <MenuLink href="/portfolio" onClick={onClose} icon={<HomeIcon className="w-6 h-6 text-yellow-400" />} label="Портфолио" />
          <MenuLink href="/reviews" onClick={onClose} icon={<ChatBubbleLeftRightIcon className="w-6 h-6 text-yellow-400" />} label="Отзывы" />
          <MenuLink href="/contacts" onClick={onClose} icon={<PhoneIcon className="w-6 h-6 text-yellow-400" />} label="Контакты" />
          {session ? (
            <>
              <MenuLink href="/profile" onClick={onClose} icon={<UserCircleIcon className="w-6 h-6 text-yellow-400" />} label="Профиль" />
              {session.user?.role === 'ADMIN' && (
                <MenuLink href="/admin" onClick={onClose} icon={<Cog6ToothIcon className="w-6 h-6 text-yellow-400" />} label="Админ" />
              )}
              <button onClick={() => { signOut(); onClose(); }} className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-ubuntu text-white hover:bg-yellow-500/10 transition">
                <ArrowLeftOnRectangleIcon className="w-6 h-6 text-yellow-400" /> Выйти
              </button>
            </>
          ) : (
            <>
              <MenuLink href="/login" onClick={onClose} icon={<ArrowRightOnRectangleIcon className="w-6 h-6 text-yellow-400" />} label="Войти" />
              <MenuLink href="/register" onClick={onClose} icon={<UserPlusIcon className="w-6 h-6 text-yellow-400" />} label="Регистрация" />
            </>
          )}
        </nav>
      </div>
    </>
  );
}

function MenuLink({ href, onClick, icon, label }: { href: string, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <a href={href} onClick={onClick} className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-ubuntu text-white hover:bg-yellow-500/10 transition">
      {icon}
      <span>{label}</span>
    </a>
  );
}
