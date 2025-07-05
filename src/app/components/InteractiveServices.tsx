"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaPalette, FaCode, FaBuilding, FaBrain, FaMagic } from 'react-icons/fa';
import { Container } from './container';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  features: string[];
  complexity: number;
  duration: string;
  price: string;
}

const services: Service[] = [
  {
    id: 'landing',
    title: 'Лендинг-Пейдж',
    description: 'Одностраничный сайт-визитка с высокой конверсией',
    icon: <FaRocket className="text-4xl" />,
    color: '#FF6B6B',
    gradient: 'from-red-500 to-pink-500',
    features: ['Адаптивный дизайн', 'SEO-оптимизация', 'Аналитика', 'Формы захвата'],
    complexity: 2,
    duration: '5-7 дней',
    price: 'от 50 000 ₽'
  },
  {
    id: 'corporate',
    title: 'Корпоративный сайт',
    description: 'Многостраничный сайт для представления компании',
    icon: <FaBuilding className="text-4xl" />,
    color: '#4ECDC4',
    gradient: 'from-cyan-500 to-blue-500',
    features: ['CMS система', 'Блог', 'Каталог', 'Многоязычность'],
    complexity: 4,
    duration: '2-3 недели',
    price: 'от 150 000 ₽'
  },
  {
    id: 'ecommerce',
    title: 'Интернет-магазин',
    description: 'Полнофункциональный онлайн-магазин',
    icon: <FaMagic className="text-4xl" />,
    color: '#45B7D1',
    gradient: 'from-blue-500 to-purple-500',
    features: ['Каталог товаров', 'Корзина', 'Оплата', 'Личный кабинет'],
    complexity: 5,
    duration: '3-4 недели',
    price: 'от 250 000 ₽'
  },
  {
    id: 'webapp',
    title: 'Веб-приложение',
    description: 'Сложное веб-приложение с уникальным функционалом',
    icon: <FaCode className="text-4xl" />,
    color: '#96CEB4',
    gradient: 'from-green-500 to-emerald-500',
    features: ['API интеграции', 'База данных', 'Уведомления', 'Мобильная версия'],
    complexity: 6,
    duration: '1-2 месяца',
    price: 'от 400 000 ₽'
  },
  {
    id: 'design',
    title: 'UI/UX Дизайн',
    description: 'Создание уникального дизайна интерфейсов',
    icon: <FaPalette className="text-4xl" />,
    color: '#FFEAA7',
    gradient: 'from-yellow-500 to-orange-500',
    features: ['Прототипирование', 'Визуальный дизайн', 'Анимации', 'Тестирование'],
    complexity: 3,
    duration: '1-2 недели',
    price: 'от 80 000 ₽'
  },
  {
    id: 'ai',
    title: 'AI Интеграции',
    description: 'Внедрение искусственного интеллекта в ваш проект',
    icon: <FaBrain className="text-4xl" />,
    color: '#DDA0DD',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Чат-боты', 'Аналитика', 'Персонализация', 'Автоматизация'],
    complexity: 7,
    duration: '2-3 месяца',
    price: 'от 600 000 ₽'
  }
];

export default function InteractiveServices() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <Container>
      <section ref={containerRef} className="py-24 px-6 relative overflow-hidden">
        {/* Анимированный фон */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10">
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
              Наши Услуги
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Выберите услугу и погрузитесь в мир инновационных решений
            </p>
          </motion.div>

          {/* Интерактивная сетка услуг */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => setSelectedService(service.id)}
              >
                {/* Карточка услуги */}
                <div className={`
                  relative bg-gradient-to-br from-gray-800/50 to-gray-900/50
                  backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8
                  transform transition-all duration-500 group-hover:border-yellow-500/50
                  ${selectedService === service.id ? 'border-yellow-500/50 shadow-2xl shadow-yellow-500/25' : ''}
                  ${hoveredService === service.id ? 'shadow-2xl shadow-yellow-500/25' : ''}
                `}>
                  {/* Сложность */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i < service.complexity
                            ? 'bg-yellow-500'
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Иконка */}
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} p-4 mb-6 flex items-center justify-center text-white`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Контент */}
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>

                  {/* Цена и длительность */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-yellow-400 font-semibold">{service.price}</span>
                    <span className="text-gray-500 text-sm">{service.duration}</span>
                  </div>

                  {/* Особенности */}
                  <div className="space-y-2">
                    {service.features.slice(0, 2).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Эффект свечения */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/0 to-orange-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Детальная информация о выбранной услуге */}
          <AnimatePresence>
            {selectedServiceData && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 shadow-2xl shadow-yellow-500/25"
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Левая колонка */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedServiceData.gradient} p-4 flex items-center justify-center text-white`}>
                        {selectedServiceData.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">{selectedServiceData.title}</h3>
                        <p className="text-gray-400">{selectedServiceData.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-white">Что включено:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedServiceData.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Правая колонка */}
                  <div className="flex flex-col justify-center">
                    <div className="text-center mb-8">
                      <div className="text-6xl font-bold text-yellow-400 mb-2">
                        {selectedServiceData.price}
                      </div>
                      <div className="text-gray-400 mb-4">
                        Срок выполнения: <span className="text-white">{selectedServiceData.duration}</span>
                      </div>
                      <div className="flex justify-center gap-2 mb-6">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              i < selectedServiceData.complexity
                                ? 'bg-yellow-500'
                                : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25">
                        Заказать проект
                      </button>
                      <button className="w-full bg-gray-800/50 text-gray-300 py-3 rounded-xl font-semibold border border-gray-600 hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300">
                        Получить консультацию
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Дополнительная информация */}
          {!selectedServiceData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <p className="text-gray-400 text-lg mb-6">
                Выберите услугу выше, чтобы узнать подробности и стоимость
              </p>
              <div className="flex justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Простой проект
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Средний проект
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Сложный проект
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Container>
  );
}
