import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0022] bg-gradient-to-br from-[#0a0022] via-[#1a003a] to-[#0a0022] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6f00ff] to-[#00BFFF] mb-4">
            404
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
            Страница не найдена
          </h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Кажется, вы попали на страницу, которой не существует. Возможно, она
            была перемещена или удалена.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 rounded-2xl bg-[#6f00ff] text-white font-bold text-lg hover:bg-[#8f2fff] hover:scale-105 transition-all duration-300 border-2 border-[#fff2] shadow-lg"
          >
            Вернуться на главную
          </Link>
          <Link
            href="/contacts"
            className="px-8 py-3 rounded-2xl bg-transparent text-white font-bold text-lg hover:bg-[#6f00ff]/20 transition-all duration-300 border-2 border-[#6f00ff]"
          >
            Связаться с нами
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            Нужна помощь? Мы всегда готовы помочь вам найти нужную информацию.
          </p>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#6f00ff]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#00BFFF]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#6f00ff]/30 rounded-full blur-lg animate-bounce"></div>
      </div>
    </div>
  );
}
