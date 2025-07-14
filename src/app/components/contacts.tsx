"use client";
import { Container } from "./container";
import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTelegramPlane,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import Modal from "./UI/Modal";

export default function Contacts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contacts");
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
      <section
        id="contacts"
        className="relative py-24 px-4 md:px-12 overflow-hidden"
      >
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
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 font-ubuntu animate-fade-in">
              Свяжитесь с нами
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto font-ubuntu animate-fade-in delay-300">
              Готовы воплотить ваши идеи в жизнь? Давайте обсудим ваш проект!
            </p>
          </div>

          <div
            className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            {/* Contact Info */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-200 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover-lift">
                <h3 className="text-2xl font-semibold mb-6 text-white font-ubuntu">
                  Контактная информация
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-glow">
                      <FaEnvelope className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm font-ubuntu">
                        Email
                      </p>
                      <a
                        href="mailto:info@codewave.com"
                        className="text-white text-lg font-medium hover:text-yellow-400 transition-colors font-ubuntu"
                      >
                        code.wave@yandex.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-glow delay-500">
                      <FaPhone className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm font-ubuntu">
                        Телефон
                      </p>
                      <a
                        href="tel:+79991234567"
                        className="text-white text-lg font-medium hover:text-yellow-400 transition-colors font-ubuntu"
                      >
                        +7 (978) 020-08-52
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-glow delay-1000">
                      <FaMapMarkerAlt className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm font-ubuntu">
                        Адрес
                      </p>
                      <p className="text-white text-lg font-medium font-ubuntu">
                        Симферополь, Крым, Россия
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Additional Info */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-400 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover-lift">
                <h3 className="text-2xl font-semibold mb-6 text-white font-ubuntu">
                  Социальные сети
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://t.me/codewave_eo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white/5 border border-yellow-500/20 rounded-xl hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all duration-300 group hover-lift"
                  >
                    <FaTelegramPlane className="text-yellow-400 text-xl group-hover:scale-110 transition-transform" />
                    <span className="text-white font-medium font-ubuntu">
                      Telegram
                    </span>
                  </a>

                  <a
                    href="https://www.instagram.com/codewave.eo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white/5 border border-yellow-500/20 rounded-xl hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all duration-300 group hover-lift"
                  >
                    <FaInstagram className="text-yellow-400 text-xl group-hover:scale-110 transition-transform" />
                    <span className="text-white font-medium font-ubuntu">
                      Instagram
                    </span>
                  </a>

                  <a
                    href="https://wa.me/79780200852"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white/5 border border-yellow-500/20 rounded-xl hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all duration-300 group hover-lift"
                  >
                    <FaWhatsapp className="text-yellow-400 text-xl group-hover:scale-110 transition-transform" />
                    <span className="text-white font-medium font-ubuntu">
                      WhatsApp
                    </span>
                  </a>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover-lift">
                <h3 className="text-2xl font-semibold mb-6 text-white font-ubuntu">
                  Рабочее время
                </h3>
                <div className="space-y-3 text-neutral-300 font-ubuntu">
                  <div className="flex justify-between">
                    <span>Понедельник - Пятница</span>
                    <span className="text-yellow-400 font-medium">
                      10:00 - 19:00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Суббота</span>
                    <span className="text-yellow-400 font-medium">
                      10:00 - 16:00
                    </span>
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
          <div
            className={`mt-16 text-center transition-all duration-1000 delay-600 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover-lift">
              <h3 className="text-2xl font-bold mb-4 text-white font-ubuntu">
                Готовы начать проект?
              </h3>
              <p className="text-neutral-300 mb-6 max-w-2xl mx-auto font-ubuntu">
                Оставьте заявку, и мы свяжемся с вами в течение 24 часов для
                обсуждения деталей вашего проекта.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 font-ubuntu hover-lift"
              >
                Оставить заявку
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M4.16666 10H15.8333"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 4.16669L15.8333 10L10 15.8334"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно формы */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl font-bold"
          aria-label="Закрыть"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
          Оставить заявку
        </h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            try {
              const res = await fetch("/api/send-order-telegram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contact,
                  comment: contact.comment,
                }),
              });
              if (!res.ok) {
                setErrorModalOpen(true);
                setTimeout(() => setErrorModalOpen(false), 3000);
              } else {
                setSuccessModalOpen(true);
                setIsModalOpen(false);
                setContact({ name: "", email: "", phone: "", comment: "" });
              }
            } catch (e) {
              setErrorModalOpen(true);
              setTimeout(() => setErrorModalOpen(false), 3000);
            } finally {
              setIsLoading(false);
            }
          }}
          className="space-y-4 mt-4"
        >
          <input
            type="text"
            placeholder="Имя"
            className="w-full px-5 py-3 rounded-full bg-[#181f2e] border-2 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-5 py-3 rounded-full bg-[#181f2e] border-2 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Телефон"
            className="w-full px-5 py-3 rounded-full bg-[#181f2e] border-2 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            required
          />
          <textarea
            placeholder="Комментарий (необязательно)"
            className="w-full px-5 py-3 rounded-2xl bg-[#181f2e] border-2 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300 min-h-[80px] resize-y"
            value={contact.comment}
            onChange={(e) =>
              setContact({ ...contact, comment: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center min-w-[160px] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-6 w-6 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            {isLoading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </Modal>
      {/* Модальное окно успеха */}
      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
          Заявка отправлена!
        </h2>
        <p className="text-lg text-gray-200 mb-2">Спасибо за ваш запрос.</p>
        <p className="text-sm text-gray-400">
          С вами скоро свяжутся для уточнения деталей.
        </p>
      </Modal>
      {/* Модальное окно ошибки */}
      <Modal open={errorModalOpen} onClose={() => setErrorModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
          Ой! Неполадки с отправкой
        </h2>
        <p className="text-lg text-gray-200 mb-2">
          Что-то пошло не так. Пожалуйста, попробуйте ещё раз через минуту.
        </p>
      </Modal>
    </Container>
  );
}
