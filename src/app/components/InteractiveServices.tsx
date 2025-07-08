"use client";

import { useState, useEffect, useRef } from 'react';
import { FaRocket, FaPalette, FaCode, FaBuilding, FaBrain, FaMagic } from 'react-icons/fa';
import { Container } from './container';
import Title from './UI/Title';

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
    <section ref={containerRef} className="relative py-24 px-4 md:px-12 overflow-hidden" id="interactive-services">
      {/* Фоновые элементы как в других компонентах */}
      <div className="absolute inset-0 bg-[#0a0e1a]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
      <div className="absolute top-24 right-24 w-1 h-1 bg-yellow-500/30 rounded-full animate-pulse-glow"></div>
      <div className="absolute bottom-24 left-24 w-1 h-1 bg-yellow-500/30 rounded-full animate-pulse-glow delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-yellow-500/20 rounded-full animate-pulse-glow delay-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Title>Выберите свой проект</Title>
          <p className="text-neutral-300 max-w-3xl mx-auto font-ubuntu animate-fade-in delay-300 text-lg mt-4">
            Выберите услугу и погрузитесь в мир инновационных решений
          </p>
        </div>

        {/* Сетка карточек */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group p-6 rounded-xl border border-yellow-500/10 bg-white/5 backdrop-blur-sm transition-all duration-500 ease-out delay-${index * 100} hover:border-yellow-500/30 hover:bg-white/10 hover-lift cursor-pointer ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
              } ${selectedService === service.id ? 'border-yellow-500/50 shadow-2xl shadow-yellow-500/25' : ''}`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="text-center">
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
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} p-4 flex items-center justify-center text-white mx-auto`}>
                    {service.icon}
                  </div>
                </div>

                {/* Контент */}
                <h3 className="font-semibold text-white mb-1 font-ubuntu group-hover:text-yellow-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed font-ubuntu">
                  {service.description}
                </p>

                {/* Цена и длительность */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-yellow-400 font-semibold font-ubuntu">{service.price}</span>
                  <span className="text-gray-500 text-sm font-ubuntu">{service.duration}</span>
                </div>

                {/* Особенности */}
                <div className="space-y-2">
                  {service.features.slice(0, 2).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-400 font-ubuntu">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Детальная информация */}
        {selectedServiceData && (
          <div className={`mt-16 transition-all duration-1000 delay-500 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 shadow-2xl shadow-yellow-500/25">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Левая колонка */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedServiceData.gradient} p-4 flex items-center justify-center text-white`}>
                      {selectedServiceData.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white font-ubuntu">{selectedServiceData.title}</h3>
                      <p className="text-gray-400 font-ubuntu">{selectedServiceData.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white font-ubuntu">Что включено:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedServiceData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-300 font-ubuntu">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Правая колонка */}
                <div className="flex flex-col justify-center">
                  <div className="text-center mb-8">
                    <div className="text-6xl font-bold text-yellow-400 mb-2 font-ubuntu">
                      {selectedServiceData.price}
                    </div>
                    <div className="text-gray-400 mb-4 font-ubuntu">
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
                    <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 font-ubuntu">
                      Заказать проект
                    </button>
                    <button className="w-full bg-gray-800/50 text-gray-300 py-3 rounded-xl font-semibold border border-gray-600 hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 font-ubuntu">
                      Получить консультацию
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Дополнительная информация */}
        {!selectedServiceData && (
          <div className={`mt-16 text-center transition-all duration-1000 delay-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-gray-400 text-lg mb-6 font-ubuntu">
              Выберите услугу выше, чтобы узнать подробности и стоимость
            </p>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-ubuntu">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Простой проект
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-ubuntu">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Средний проект
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-ubuntu">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Сложный проект
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
