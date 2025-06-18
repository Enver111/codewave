import { Container } from "./container";
import Link from "next/link";
import Image from "next/image";
import { FaTelegramPlane, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
	<Container>
    <footer className="relative mt-24 text-white font-sans px-12 py-6 overflow-hidden">
      {/* Градиентная подложка */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-yellow-500/10 via-[#10182a] to-blue-500/10 blur-0" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-gray-800">
          {/* Брендинг и слоган */}
          <div className="flex flex-col gap-4 md:col-span-1">
		  <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/icons/codewave_logo.png"
              alt="CodeWave Logo"
              width={48}
              height={48}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-2xl font-semibold text-yellow-500/25 bg-gradient-to-r from-yellow-500 to-orange-500 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
              CodeWave
            </span>
          </Link>

          </div>

          {/* Меню */}
          <div className="flex flex-col gap-2 md:col-span-1">
            <div className="text-lg font-semibold text-yellow-100 mb-2">Меню</div>
            <nav className="flex flex-col gap-2 text-base font-light">
              <Link href="/services" className="hover:text-yellow-200 transition">Услуги</Link>
              <Link href="/portfolio" className="hover:text-yellow-200 transition">Портфолио</Link>
              <Link href="/contacts" className="hover:text-yellow-200 transition">Контакты</Link>
            </nav>
          </div>

          {/* Контакты */}
          <div className="flex flex-col gap-2 md:col-span-1">
            <div className="text-lg font-semibold text-yellow-100 mb-2">Контакты</div>
            <div className="text-neutral-300 text-sm">info@codewave.com</div>
            <div className="text-neutral-300 text-sm mb-2">+7 (999) 123-45-67</div>
            <div className="text-neutral-400 text-xs">Москва, ул. Примерная, 1</div>
            <div className="text-neutral-400 text-xs">Пн–Пт: 9:00–18:00</div>
          </div>

          {/* Соцсети */}
          <div className="flex flex-col gap-2 md:col-span-1">
            <div className="text-lg font-semibold text-yellow-100 mb-2">Мы в соцсетях</div>
            <div className="flex gap-4 mt-2">
              <a href="https://t.me/codewave" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#181f2e] hover:bg-blue-500/20 transition group shadow-lg hover:shadow-blue-400/30">
                <FaTelegramPlane className="text-2xl text-blue-400 group-hover:scale-125 transition-transform duration-300" />
              </a>
              <a href="https://instagram.com/codewave" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#181f2e] hover:bg-pink-500/20 transition group shadow-lg hover:shadow-pink-400/30">
                <FaInstagram className="text-2xl text-pink-400 group-hover:scale-125 transition-transform duration-300" />
              </a>
              <a href="https://wa.me/79991234567" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#181f2e] hover:bg-green-500/20 transition group shadow-lg hover:shadow-green-400/30">
                <FaWhatsapp className="text-2xl text-green-400 group-hover:scale-125 transition-transform duration-300" />
              </a>
              <a href="https://linkedin.com/company/codewave" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#181f2e] hover:bg-blue-600/20 transition group shadow-lg hover:shadow-blue-500/30">
                <FaLinkedin className="text-2xl text-blue-500 group-hover:scale-125 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
        {/* Нижний уровень футера */}
        <div className="text-center text-neutral-500 text-xs mt-10">
          © {new Date().getFullYear()} CodeWave. Все права защищены.
        </div>
		</footer>
      </Container>

  );
}
