"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логируем ошибку только в development
    if (process.env.NODE_ENV === "development") {
      console.error("Global error:", error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-[#0a0022] bg-gradient-to-br from-[#0a0022] via-[#1a003a] to-[#0a0022] flex items-center justify-center px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] mb-4">
                500
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
                Что-то пошло не так
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Произошла внутренняя ошибка сервера. Наша команда уже работает
                над её устранением.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-8 py-3 rounded-2xl bg-[#6f00ff] text-white font-bold text-lg hover:bg-[#8f2fff] hover:scale-105 transition-all duration-300 border-2 border-[#fff2] shadow-lg"
              >
                Попробовать снова
              </button>
              <Link
                href="/"
                className="px-8 py-3 rounded-2xl bg-transparent text-white font-bold text-lg hover:bg-[#6f00ff]/20 transition-all duration-300 border-2 border-[#6f00ff]"
              >
                Вернуться на главную
              </Link>
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/60 text-sm">
                Если проблема повторяется, пожалуйста, свяжитесь с нами.
              </p>
            </div>
          </div>

          {/* Декоративные элементы */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-20 w-32 h-32 bg-[#ff6b6b]/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#ff8e8e]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#ff6b6b]/30 rounded-full blur-lg animate-bounce"></div>
          </div>
        </div>
      </body>
    </html>
  );
}
