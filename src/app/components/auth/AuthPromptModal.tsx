"use client";

import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthPromptModal({ isOpen, onClose }: AuthPromptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md relative text-white text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
          Действие требует авторизации
        </h2>
        <p className="text-gray-300 mb-8">
          Чтобы оставить отзыв, пожалуйста, войдите в свой аккаунт или создайте новый.
        </p>
        <div className="flex justify-center items-center gap-4">
          <Link href="/login" className="inline-flex items-center justify-center gap-2 border border-gray-600 text-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-300 transform hover:scale-105">
            Войти
          </Link>
          <Link href="/register" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25">
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}
