"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaPalette, FaCode, FaBuilding, FaBrain, FaMagic } from 'react-icons/fa';
import { Container } from './container';
import Title from './UI/Title';

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
      <section id="elegant-services" className="py-24 px-6">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Title>Наши услуги</Title>
          <p className="text-neutral-300 max-w-2xl mx-auto mt-4 text-lg">
            Создаем современные цифровые решения для вашего бизнеса
          </p>
        </motion.div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => setSelectedService(service.id)}
            >
              <div className={`
                relative bg-gradient-to-br from-gray-800/50 to-gray-900/50
                backdrop-blur-sm border border-gray-700/50 rounded-xl p-6
                transition-all duration-300 group-hover:border-gray-600/50
                ${selectedService === service.id ? 'border-gray-500/50 shadow-lg' : ''}
              `}>
                {/* Иконка */}
                <motion.div
                  className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white"
                  style={{ backgroundColor: service.color }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>

                {/* Контент */}
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
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
                    <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                      Заказать проект
                    </button>
                    <button className="w-full bg-gray-800/50 text-gray-300 py-3 rounded-lg font-semibold border border-gray-600 hover:bg-gray-700/50 transition-colors duration-300">
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
    </Container>
  );
}
