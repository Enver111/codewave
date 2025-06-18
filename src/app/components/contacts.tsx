"use client";
import { Container } from "./container";
import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTelegramPlane, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import RequestModal from "./RequestModal";


export default function Contacts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <section id="contacts" className="py-20 px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
            Свяжитесь с нами
          </h2>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Готовы воплотить ваши идеи в жизнь? Давайте обсудим ваш проект!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10">
              <h3 className="text-2xl font-semibold mb-6 text-yellow-100">Контактная информация</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Email</p>
                    <a href="mailto:info@codewave.com" className="text-white text-lg font-medium hover:text-yellow-200 transition-colors">
                      info@codewave.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Телефон</p>
                    <a href="tel:+79991234567" className="text-white text-lg font-medium hover:text-yellow-200 transition-colors">
                      +7 (999) 123-45-67
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Адрес</p>
                    <p className="text-white text-lg font-medium">
                      Москва, ул. Примерная, 1
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Additional Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10">
              <h3 className="text-2xl font-semibold mb-6 text-yellow-100">Социальные сети</h3>

              <div className="grid grid-cols-2 gap-4">
                <a href="https://t.me/codewave" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl hover:border-blue-400/50 hover:bg-blue-500/30 transition-all duration-300 group">
                  <FaTelegramPlane className="text-blue-400 text-xl group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">Telegram</span>
                </a>

                <a href="https://instagram.com/codewave" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30 rounded-xl hover:border-pink-400/50 hover:bg-pink-500/30 transition-all duration-300 group">
                  <FaInstagram className="text-pink-400 text-xl group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">Instagram</span>
                </a>

                <a href="https://wa.me/79991234567" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl hover:border-green-400/50 hover:bg-green-500/30 transition-all duration-300 group">
                  <FaWhatsapp className="text-green-400 text-xl group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">WhatsApp</span>
                </a>

                <a href="https://linkedin.com/company/codewave" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-600/30 rounded-xl hover:border-blue-500/50 hover:bg-blue-600/30 transition-all duration-300 group">
                  <FaLinkedin className="text-blue-500 text-xl group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10">
              <h3 className="text-2xl font-semibold mb-6 text-yellow-100">Рабочее время</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Понедельник - Пятница</span>
                  <span className="text-yellow-200 font-medium">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Суббота</span>
                  <span className="text-yellow-200 font-medium">10:00 - 16:00</span>
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
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-yellow-100">Готовы начать проект?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Оставьте заявку, и мы свяжемся с вами в течение 24 часов для обсуждения деталей вашего проекта.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25">
              Оставить заявку
            </button>
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
