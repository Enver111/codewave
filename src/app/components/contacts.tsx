"use client";
import { Container } from "./container";
import { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTelegramPlane, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import RequestModal from "./RequestModal";

export default function Contacts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    const element = document.getElementById('contacts');
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
      <section id="contacts" className="relative py-24 px-4 md:px-12 overflow-hidden">
        {/* Минималистичный фон в стиле дизайна */}
        <div className="absolute inset-0 bg-[#0a0e1a]"></div>

        {/* Тонкие линии для структуры */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>

        {/* Минималистичные акценты */}
        <div className="absolute top-20 right-20 w-1 h-1 bg-yellow-500/30 rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-yellow-500/30 rounded-full animate-pulse-glow delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-0.5 h-0.5 bg-yellow-500/20 rounded-full animate-pulse-glow delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-yellow-500/20 rounded-full animate-pulse-glow delay-1500"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold mb-4 font-ubuntu animate-fade-in">Свяжитесь с нами</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto font-ubuntu animate-fade-in delay-300">
              Готовы воплотить ваши идеи в жизнь? Давайте обсудим ваш проект!
            </p>
          </div>

          <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            {/* Contact Info */}
            <div className={`space-y-8 transition-all duration-1000 delay-200 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover-lift">
                <h3 className="text-2xl font-semibold mb-6 text-white font-ubuntu">Контактная информация</h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-glow">
                      <FaEnvelope className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm font-ubuntu">Email</p>
                      <a href="mailto:info@codewave.com" className="text-white text-lg font-medium hover:text-yellow-400 transition-colors font-ubuntu">
                        info@codewave.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-glow delay-500">
                      <FaPhone className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm font-ubuntu">Телефон</p>
                      <a href="tel:+79991234567" className="text-white text-lg font-medium hover:text-yellow-400 transition-colors font-ubuntu">
                        +7 (999) 123-45-67
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-glow delay-1000">
                      <FaMapMarkerAlt className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm font-ubuntu">Адрес</p>
                      <p className="text-white text-lg font-medium font-ubuntu">
                        Москва, Россия
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Additional Info */}
            <div className={`space-y-8 transition-all duration-1000 delay-400 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover-lift">
                <h3 className="text-2xl font-semibold mb-6 text-white font-ubuntu">Социальные сети</h3>

                <div className="grid grid-cols-2 gap-4">
                  <a href="https://t.me/codewave" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 p-4 bg-white/5 border border-yellow-500/20 rounded-xl hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all duration-300 group hover-lift">
                    <FaTelegramPlane className="text-yellow-400 text-xl group-hover:scale-110 transition-transform" />
                    <span className="text-white font-medium font-ubuntu">Telegram</span>
                  </a>

                  <a href="https://instagram.com/codewave" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 p-4 bg-white/5 border border-yellow-500/20 rounded-xl hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all duration-300 group hover-lift">
                    <FaInstagram className="text-yellow-400 text-xl group-hover:scale-110 transition-transform" />
                    <span className="text-white font-medium font-ubuntu">Instagram</span>
                  </a>

                  <a href="https://wa.me/79991234567" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 p-4 bg-white/5 border border-yellow-500/20 rounded-xl hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all duration-300 group hover-lift">
                    <FaWhatsapp className="text-yellow-400 text-xl group-hover:scale-110 transition-transform" />
                    <span className="text-white font-medium font-ubuntu">WhatsApp</span>
                  </a>

                  <a href="https://linkedin.com/company/codewave" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 p-4 bg-white/5 border border-yellow-500/20 rounded-xl hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all duration-300 group hover-lift">
                    <FaLinkedin className="text-yellow-400 text-xl group-hover:scale-110 transition-transform" />
                    <span className="text-white font-medium font-ubuntu">LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover-lift">
                <h3 className="text-2xl font-semibold mb-6 text-white font-ubuntu">Рабочее время</h3>
                <div className="space-y-3 text-neutral-300 font-ubuntu">
                  <div className="flex justify-between">
                    <span>Понедельник - Пятница</span>
                    <span className="text-yellow-400 font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Суббота</span>
                    <span className="text-yellow-400 font-medium">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Воскресенье</span>
                    <span className="text-red-400 font-medium">Выходной</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={`mt-16 text-center transition-all duration-1000 delay-600 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover-lift">
              <h3 className="text-2xl font-bold mb-4 text-white font-ubuntu">Готовы начать проект?</h3>
              <p className="text-neutral-300 mb-6 max-w-2xl mx-auto font-ubuntu">
                Оставьте заявку, и мы свяжемся с вами в течение 24 часов для обсуждения деталей вашего проекта.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 font-ubuntu hover-lift"
              >
                Оставить заявку
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4.16669L15.8333 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <RequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectType={""}
          totalPrice={0}
          selectedFeatures={[]}
        />
      </section>
    </Container>
  );
}
