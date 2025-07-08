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
                code.wave@yandex.com
              </li>
              <li className="flex items-center text-neutral-400 font-ubuntu">
                <svg className="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +7 (978) 020-08-52
              </li>
              <li className="flex items-center text-neutral-400 font-ubuntu">
                <svg className="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Симферополь, Крым, Россия
              </li>
            </ul>
          </div>

          {/* Соцсети */}
          <div className={`transition-all duration-1000 delay-800 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="text-lg font-semibold text-yellow-100 mb-2 font-ubuntu">Мы в соцсетях</div>
            <div className="flex gap-4 mt-2">
              <a href="https://t.me/codewave_eo" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#181f2e] hover:bg-blue-500/20 transition group shadow-lg hover:shadow-blue-400/30">
                <FaTelegramPlane className="text-2xl text-blue-400 group-hover:scale-125 transition-transform duration-300" />
              </a>
              <a href="https://instagram.com/codewave.eo" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#181f2e] hover:bg-pink-500/20 transition group shadow-lg hover:shadow-pink-400/30">
                <FaInstagram className="text-2xl text-pink-400 group-hover:scale-125 transition-transform duration-300" />
              </a>
              <a href="https://wa.me/79780200852" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#181f2e] hover:bg-green-500/20 transition group shadow-lg hover:shadow-green-400/30">
                <FaWhatsapp className="text-2xl text-green-400 group-hover:scale-125 transition-transform duration-300" />
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
