"use client";

import { Container } from "./container";
import Link from "next/link";
import Image from "next/image";
import { FaTelegramPlane, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('footer');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
	<Container>
    <footer className="relative py-16 px-4 md:px-12 overflow-hidden" id="footer">
      {/* Минималистичный фон в стиле дизайна */}
      <div className="absolute inset-0 bg-[#0a0e1a]"></div>

      {/* Тонкие линии для структуры */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>

      {/* Минималистичные акценты */}
      <div className="absolute top-12 right-12 w-1 h-1 bg-yellow-500/30 rounded-full animate-pulse-glow"></div>
      <div className="absolute bottom-12 left-12 w-1 h-1 bg-yellow-500/30 rounded-full animate-pulse-glow delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 bg-yellow-500/20 rounded-full animate-pulse-glow delay-500"></div>

      <div className="relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          {/* Логотип и описание */}
          <div className={`md:col-span-2 transition-all duration-1000 delay-200 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="flex items-center gap-3 mb-4">
            <Image
              src="/icons/codewave_logo.svg"
              alt="CodeWave Logo"
              width={58}
              height={58}
            />
            <span className="text-2xl font-semibold text-yellow-500/25 bg-gradient-to-r from-yellow-500 to-orange-500
              via-yellow-100 to-yellow-200 bg-clip-text text-transparent font-ubuntu group-hover:scale-105 transition-transform duration-300">
              CodeWave
            </span>
            </div>
            <p className="text-neutral-400 mb-6 font-ubuntu leading-relaxed">
              Создаем современные веб-решения, которые помогают бизнесу расти и развиваться в цифровом мире.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-neutral-400 hover:text-yellow-500 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>
              <Link href="#" className="text-neutral-400 hover:text-yellow-500 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </Link>
              <Link href="#" className="text-neutral-400 hover:text-yellow-500 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Услуги */}
          <div className={`transition-all duration-1000 delay-400 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h3 className="text-lg font-semibold text-white mb-4 font-ubuntu">Услуги</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#services" className="text-neutral-400 hover:text-yellow-500 transition-colors duration-300 font-ubuntu">
                  Разработка сайтов
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-neutral-400 hover:text-yellow-500 transition-colors duration-300 font-ubuntu">
                  Веб-приложения
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-neutral-400 hover:text-yellow-500 transition-colors duration-300 font-ubuntu">
                  UI/UX Дизайн
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-neutral-400 hover:text-yellow-500 transition-colors duration-300 font-ubuntu">
                  Техподдержка
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div className={`transition-all duration-1000 delay-600 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h3 className="text-lg font-semibold text-white mb-4 font-ubuntu">Контакты</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-neutral-400 font-ubuntu">
                <svg className="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                info@codewave.ru
              </li>
              <li className="flex items-center text-neutral-400 font-ubuntu">
                <svg className="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +7 (999) 123-45-67
              </li>
              <li className="flex items-center text-neutral-400 font-ubuntu">
                <svg className="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Москва, Россия
              </li>
            </ul>
          </div>

          {/* Соцсети */}
          <div className={`transition-all duration-1000 delay-800 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="text-lg font-semibold text-yellow-100 mb-2 font-ubuntu">Мы в соцсетях</div>
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
        <div className={`mt-12 pt-8 border-t border-yellow-500/10 transition-all duration-1000 delay-800 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm font-ubuntu">
              © 2025 CodeWave. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-neutral-400 hover:text-yellow-500 transition-colors duration-300 text-sm font-ubuntu">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-neutral-400 hover:text-yellow-500 transition-colors duration-300 text-sm font-ubuntu">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
		</footer>
      </Container>

  );
}
