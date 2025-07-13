"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaPalette, FaCode, FaBuilding, FaBrain, FaMagic } from 'react-icons/fa';
import { Container } from './container';
import Title from './UI/Title';
import Modal from "./UI/Modal";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  price: string;
  duration: string;
}

const services: Service[] = [
  {
    id: 'landing',
    title: 'Лендинг-Пейдж',
    description: 'Одностраничный сайт с высокой конверсией',
    icon: <FaRocket />,
    color: '#FF6B6B',
    features: ['Адаптивный дизайн', 'SEO-оптимизация', 'Аналитика', 'Формы захвата'],
    price: 'от 50 000 ₽',
    duration: '5-7 дней'
  },
  {
    id: 'corporate',
    title: 'Корпоративный сайт',
    description: 'Многостраничный сайт для компании',
    icon: <FaBuilding />,
    color: '#4ECDC4',
    features: ['CMS система', 'Блог', 'Каталог', 'Многоязычность'],
    price: 'от 150 000 ₽',
    duration: '2-3 недели'
  },
  {
    id: 'ecommerce',
    title: 'Интернет-магазин',
    description: 'Полнофункциональный онлайн-магазин',
    icon: <FaMagic />,
    color: '#45B7D1',
    features: ['Каталог товаров', 'Корзина', 'Оплата', 'Личный кабинет'],
    price: 'от 250 000 ₽',
    duration: '3-4 недели'
  },
  {
    id: 'webapp',
    title: 'Веб-приложение',
    description: 'Сложное веб-приложение',
    icon: <FaCode />,
    color: '#96CEB4',
    features: ['API интеграции', 'База данных', 'Уведомления', 'Мобильная версия'],
    price: 'от 400 000 ₽',
    duration: '1-2 месяца'
  },
  {
    id: 'design',
    title: 'UI/UX Дизайн',
    description: 'Создание уникального дизайна',
    icon: <FaPalette />,
    color: '#FFEAA7',
    features: ['Прототипирование', 'Визуальный дизайн', 'Анимации', 'Тестирование'],
    price: 'от 80 000 ₽',
    duration: '1-2 недели'
  },
  {
    id: 'ai',
    title: 'AI Интеграции',
    description: 'Внедрение искусственного интеллекта',
    icon: <FaBrain />,
    color: '#DDA0DD',
    features: ['Чат-боты', 'Аналитика', 'Персонализация', 'Автоматизация'],
    price: 'от 600 000 ₽',
    duration: '2-3 месяца'
  }
];

export default function ElegantServices() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState<null | 'order' | 'consult'>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', comment: '' });
  const [serviceType, setServiceType] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('elegant-services');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <Container>
      <section id="elegant-services" className="py-16 px-6">

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Title>Выберите свой проект</Title>
          <p className="text-neutral-300 max-w-2xl mx-auto mt-4 text-lg">
            Создаем современные цифровые решения для вашего бизнеса
          </p>
        </motion.div>

        {/* Мобильный дропдаун */}
        <div className="md:hidden mb-8 relative z-20">
          <div className="relative">
            <button
              className="w-full flex items-center justify-between bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm border border-yellow-500/30 rounded-xl px-5 py-4 text-white font-semibold text-lg shadow-lg focus:outline-none transition-all duration-300"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              {selectedService
                ? (
                  <span className="flex items-center gap-3">
                    {services.find(s => s.id === selectedService)?.icon}
                    {services.find(s => s.id === selectedService)?.title}
                  </span>
                )
                : 'Выберите услугу'}
              <svg className={`w-5 h-5 ml-2 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 mt-2 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-yellow-500/30 rounded-xl shadow-2xl overflow-hidden z-30"
                >
                  {services.map((service) => (
                    <li
                      key={service.id}
                      className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-all duration-200 hover:bg-yellow-500/10 ${selectedService === service.id ? 'bg-yellow-500/10 text-yellow-400' : 'text-white'}`}
                      onClick={() => {
                        setSelectedService(service.id);
                        setDropdownOpen(false);
                      }}
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ backgroundColor: service.color }}>{service.icon}</span>
                      <span className="font-medium">{service.title}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Десктопная сетка */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedService(service.id)}
            >
              <div
                className={`
                   bg-gradient-to-br from-gray-800/50 to-gray-900/50
                  backdrop-blur-sm border border-gray-700/50 rounded-xl p-6
                  transition-all duration-300
                  ${(selectedService === service.id ? 'border-yellow-500/30 bg-white/10 -translate-y-1 shadow-2xl shadow-yellow-500/10 scale-105' : '')}
                  ${selectedService !== service.id ? 'hover:border-yellow-500/30 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/10 hover:scale-105' : ''}
                `}
              >
                {/* Иконка */}
                <motion.div
                  className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white transition-transform duration-300 ${(selectedService === service.id ? 'scale-110' : '')} ${selectedService !== service.id ? 'group-hover:scale-110' : ''}`}
                  style={{ backgroundColor: service.color }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>
                {/* Контент */}
                <h3 className={`text-xl font-semibold text-white mb-2 transition-colors duration-300 ${(selectedService === service.id ? 'text-yellow-400' : '')} ${selectedService !== service.id ? 'group-hover:text-yellow-400' : ''}`}>{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>

                {/* Цена и длительность */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white font-medium">{service.price}</span>
                  <span className="text-gray-500">{service.duration}</span>
                </div>

                {/* Подсветка при выборе */}
                {selectedService === service.id && (
                  <motion.div
                    layoutId="selected-service"
                    className="absolute inset-0 border-2 border-gray-500/50 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Детальная информация */}
        <AnimatePresence>
          {selectedServiceData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Левая колонка */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: selectedServiceData.color }}
                    >
                      {selectedServiceData.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedServiceData.title}</h3>
                      <p className="text-gray-400">{selectedServiceData.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Что включено:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedServiceData.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg"
                        >
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedServiceData.color }}></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Правая колонка */}
                <div className="flex flex-col justify-center">
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-white mb-2">
                      {selectedServiceData.price}
                    </div>
                    <div className="text-gray-400 mb-6">
                      Срок выполнения: <span className="text-white">{selectedServiceData.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                      onClick={() => { setFormModalOpen('order'); setServiceType(selectedServiceData.title); }}>
                      Заказать проект
                    </button>
                    <button className="w-full bg-gray-800/50 text-gray-300 py-3 rounded-lg font-semibold border border-gray-600 hover:bg-gray-700/50 transition-colors duration-300"
                      onClick={() => { setFormModalOpen('consult'); setServiceType(selectedServiceData.title + ' (консультация)'); }}>
                      Получить консультацию
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Инструкция */}
        {!selectedServiceData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-gray-500 text-lg">
              Выберите услугу выше, чтобы узнать подробности
            </p>
          </motion.div>
        )}
      </section>
      <Modal open={!!formModalOpen} onClose={() => setFormModalOpen(null)}>
        <button
          onClick={() => setFormModalOpen(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl font-bold"
          aria-label="Закрыть"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
          {formModalOpen === 'order' ? 'Заказать проект' : 'Получить консультацию'}
        </h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            try {
              const res = await fetch('/api/send-order-telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  siteType: serviceType,
                  contact,
                  comment: contact.comment,
                })
              });
              if (!res.ok) {
                setErrorModalOpen(true);
                setTimeout(() => setErrorModalOpen(false), 3000);
              } else {
                setSuccessModalOpen(true);
                setFormModalOpen(null);
                setContact({ name: '', email: '', phone: '', comment: '' });
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
            className="w-full px-5 py-3 rounded-full bg-gray-900 border border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300"
            value={contact.name}
            onChange={e => setContact({ ...contact, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-5 py-3 rounded-full bg-gray-900 border border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300"
            value={contact.email}
            onChange={e => setContact({ ...contact, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Телефон"
            className="w-full px-5 py-3 rounded-full bg-gray-900 border border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300"
            value={contact.phone}
            onChange={e => setContact({ ...contact, phone: e.target.value })}
            required
          />
          <textarea
            placeholder="Комментарий"
            className="w-full px-5 py-3 rounded-2xl bg-gray-900 border border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300 min-h-[80px] resize-y"
            value={contact.comment}
            onChange={e => setContact({ ...contact, comment: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center min-w-[160px] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-6 w-6 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
      </Modal>
      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
          Заявка отправлена!
        </h2>
        <p className="text-lg text-gray-200 mb-2">Спасибо за ваш запрос.</p>
        <p className="text-sm text-gray-400">С вами скоро свяжутся для уточнения деталей.</p>
      </Modal>
      <Modal open={errorModalOpen} onClose={() => setErrorModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
          Ой! Неполадки с отправкой
        </h2>
        <p className="text-lg text-gray-200 mb-2">Что-то пошло не так. Пожалуйста, попробуйте ещё раз через минуту.</p>
      </Modal>
    </Container>
  );
}
