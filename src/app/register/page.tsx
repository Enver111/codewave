"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!data.name || !data.email || !data.password) {
        setError("Все поля обязательны для заполнения");
        return;
    }

    try {
      await axios.post("/api/register", data);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data || "Что-то пошло не так. Попробуйте снова.");
      console.error(err);
    }
  };

  return (
     <main className="min-h-screen bg-[#0a0e1a] text-white font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-yellow-500/10">
          <h2 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
            Создать аккаунт
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Присоединяйтесь к нашему сообществу
          </p>

          <form onSubmit={registerUser} className="space-y-6">
            <div className="relative">
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
              <input
                type="text"
                placeholder="Ваше имя"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                required
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
              <input
                type="password"
                placeholder="Пароль"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                required
              />
            </div>
             {error && (
                <p className="text-red-500 text-sm text-center bg-red-500/10 border border-red-500/30 rounded-lg py-2">
                  {error}
                </p>
              )}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-400 mt-8">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="font-medium text-yellow-300 hover:text-yellow-200">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
