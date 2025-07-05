"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaPalette, FaCode, FaBuilding, FaBrain, FaMagic, FaSatellite, FaSpaceShuttle } from 'react-icons/fa';
import { Container } from './container';

interface CosmicService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  planetColor: string;
  atmosphereColor: string;
  orbitRadius: number;
  orbitSpeed: number;
  features: string[];
  complexity: number;
  duration: string;
  price: string;
  coordinates: { x: number; y: number };
}

const cosmicServices: CosmicService[] = [
  {
    id: 'landing',
    name: 'Лендинг-Пейдж',
    description: 'Одностраничный сайт-визитка с высокой конверсией',
    icon: <FaRocket className="text-3xl" />,
    planetColor: '#FF6B6B',
    atmosphereColor: '#FF8E8E',
    orbitRadius: 120,
    orbitSpeed: 20,
    features: ['Адаптивный дизайн', 'SEO-оптимизация', 'Аналитика', 'Формы захвата'],
    complexity: 2,
    duration: '5-7 дней',
    price: 'от 50 000 ₽',
    coordinates: { x: 20, y: 30 }
  },
  {
    id: 'corporate',
    name: 'Корпоративный сайт',
    description: 'Многостраничный сайт для представления компании',
    icon: <FaBuilding className="text-3xl" />,
    planetColor: '#4ECDC4',
    atmosphereColor: '#6EDDD6',
    orbitRadius: 150,
    orbitSpeed: 15,
    features: ['CMS система', 'Блог', 'Каталог', 'Многоязычность'],
    complexity: 4,
    duration: '2-3 недели',
    price: 'от 150 000 ₽',
    coordinates: { x: 60, y: 20 }
  },
  {
    id: 'ecommerce',
    name: 'Интернет-магазин',
    description: 'Полнофункциональный онлайн-магазин',
    icon: <FaMagic className="text-3xl" />,
    planetColor: '#45B7D1',
    atmosphereColor: '#67C7E1',
    orbitRadius: 180,
    orbitSpeed: 12,
    features: ['Каталог товаров', 'Корзина', 'Оплата', 'Личный кабинет'],
    complexity: 5,
    duration: '3-4 недели',
    price: 'от 250 000 ₽',
    coordinates: { x: 80, y: 60 }
  },
  {
    id: 'webapp',
    name: 'Веб-приложение',
    description: 'Сложное веб-приложение с уникальным функционалом',
    icon: <FaCode className="text-3xl" />,
    planetColor: '#96CEB4',
    atmosphereColor: '#B8E0C6',
    orbitRadius: 200,
    orbitSpeed: 10,
    features: ['API интеграции', 'База данных', 'Уведомления', 'Мобильная версия'],
    complexity: 6,
    duration: '1-2 месяца',
    price: 'от 400 000 ₽',
    coordinates: { x: 40, y: 80 }
  },
  {
    id: 'design',
    name: 'UI/UX Дизайн',
    description: 'Создание уникального дизайна интерфейсов',
    icon: <FaPalette className="text-3xl" />,
    planetColor: '#FFEAA7',
    atmosphereColor: '#FFF2C7',
    orbitRadius: 140,
    orbitSpeed: 18,
    features: ['Прототипирование', 'Визуальный дизайн', 'Анимации', 'Тестирование'],
    complexity: 3,
    duration: '1-2 недели',
    price: 'от 80 000 ₽',
    coordinates: { x: 70, y: 70 }
  },
  {
    id: 'ai',
    name: 'AI Интеграции',
    description: 'Внедрение искусственного интеллекта в ваш проект',
    icon: <FaBrain className="text-3xl" />,
    planetColor: '#DDA0DD',
    atmosphereColor: '#E8B8E8',
    orbitRadius: 220,
    orbitSpeed: 8,
    features: ['Чат-боты', 'Аналитика', 'Персонализация', 'Автоматизация'],
    complexity: 7,
    duration: '2-3 месяца',
    price: 'от 600 000 ₽',
    coordinates: { x: 90, y: 40 }
  }
];

export default function CosmicServicesPortal() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Анимация времени для орбит
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.02);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Обработка движения мыши
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Рисование звёзд на canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Устанавливаем размер canvas
    const resizeCanvas = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Анимация звёзд
    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Рисуем звёзды
      for (let i = 0; i < 100; i++) {
        const x = (Math.sin(time * 0.5 + i) * canvas.width / 2) + canvas.width / 2;
        const y = (Math.cos(time * 0.3 + i * 0.1) * canvas.height / 2) + canvas.height / 2;
        const size = Math.max(0.5, Math.abs(Math.sin(time + i) * 2) + 1);
        const opacity = Math.max(0.1, Math.sin(time * 0.5 + i) * 0.5 + 0.5);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }

      // Рисуем туманности
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.3, 0,
        canvas.width * 0.2, canvas.height * 0.3, 200
      );
      gradient1.addColorStop(0, 'rgba(255, 107, 107, 0.1)');
      gradient1.addColorStop(1, 'rgba(255, 107, 107, 0)');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.7, 0,
        canvas.width * 0.8, canvas.height * 0.7, 250
      );
      gradient2.addColorStop(0, 'rgba(78, 205, 196, 0.1)');
      gradient2.addColorStop(1, 'rgba(78, 205, 196, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animateStars);
    };

    animateStars();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [time]);

  const selectedServiceData = cosmicServices.find(s => s.id === selectedService);

  return (
    <Container>
      <section ref={containerRef} className="py-24 px-6 relative overflow-hidden min-h-screen">
        {/* Canvas для звёзд */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Космические частицы вокруг курсора */}
        <div
          className="absolute w-4 h-4 pointer-events-none z-10"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transform: 'translateZ(0)'
          }}
        >
          <div className="w-full h-full bg-yellow-400 rounded-full opacity-50 animate-ping"></div>
          <div className="absolute inset-0 w-full h-full bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
        </div>

        <div className="relative z-20">
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Космический Портал
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Исследуйте галактику технологических решений
            </p>
          </motion.div>

          {/* Космическая карта */}
          <div className="relative w-full h-[600px] mb-16">
            {/* Центральная звезда */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 20px rgba(255, 255, 255, 0.3)',
                  '0 0 40px rgba(255, 255, 255, 0.6)',
                  '0 0 20px rgba(255, 255, 255, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full z-10"
            />

            {/* Планеты */}
            {cosmicServices.map((service, index) => {
              const angle = time * service.orbitSpeed + (index * Math.PI * 2) / cosmicServices.length;
              const x = Math.cos(angle) * service.orbitRadius + 50;
              const y = Math.sin(angle) * service.orbitRadius + 50;
              const isHovered = hoveredService === service.id;
              const isSelected = selectedService === service.id;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{
                    scale: 1.2,
                    z: 50
                  }}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => setSelectedService(service.id)}
                >
                  {/* Орбита */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-gray-600/30"
                    style={{
                      width: `${service.orbitRadius * 2}px`,
                      height: `${service.orbitRadius * 2}px`,
                      left: `-${service.orbitRadius}px`,
                      top: `-${service.orbitRadius}px`
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Планета */}
                  <motion.div
                    className={`
                      relative w-16 h-16 rounded-full flex items-center justify-center text-white
                      ${isSelected ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}
                    `}
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${service.atmosphereColor}, ${service.planetColor})`,
                      boxShadow: isHovered
                        ? `0 0 30px ${service.planetColor}, inset 0 0 20px rgba(255,255,255,0.3)`
                        : `0 0 20px ${service.planetColor}`
                    }}
                    animate={{
                      rotate: isHovered ? 360 : 0,
                      scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Спутники (функции) */}
                  <AnimatePresence>
                    {isHovered && (
                      <>
                        {service.features.map((feature, featureIndex) => {
                          const satelliteAngle = (featureIndex * Math.PI * 2) / service.features.length;
                          const satelliteX = Math.cos(satelliteAngle) * 40;
                          const satelliteY = Math.sin(satelliteAngle) * 40;

                          return (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              transition={{ delay: featureIndex * 0.1 }}
                              style={{
                                position: 'absolute',
                                left: satelliteX,
                                top: satelliteY,
                                transform: 'translate(-50%, -50%)'
                              }}
                              className="w-3 h-3 bg-yellow-400 rounded-full"
                            />
                          );
                        })}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Название планеты */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 whitespace-nowrap"
                  >
                    <div className="bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg px-3 py-1 text-sm text-white">
                      {service.name}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Голографическая информация */}
          <AnimatePresence>
            {selectedServiceData && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-2xl shadow-cyan-500/25"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%),
                    radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)
                  `
                }}
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Левая колонка */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex items-center justify-center text-white"
                      >
                        {selectedServiceData.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-cyan-400">{selectedServiceData.name}</h3>
                        <p className="text-gray-300">{selectedServiceData.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-cyan-300">Технологические спутники:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedServiceData.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20"
                          >
                            <FaSatellite className="text-cyan-400 text-sm" />
                            <span className="text-gray-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Правая колонка */}
                  <div className="flex flex-col justify-center">
                    <div className="text-center mb-8">
                      <div className="text-6xl font-bold text-cyan-400 mb-2">
                        {selectedServiceData.price}
                      </div>
                      <div className="text-gray-400 mb-4">
                        Время полёта: <span className="text-cyan-300">{selectedServiceData.duration}</span>
                      </div>
                      <div className="flex justify-center gap-2 mb-6">
                        {[...Array(7)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: i < selectedServiceData.complexity ? [1, 1.2, 1] : 1,
                              opacity: i < selectedServiceData.complexity ? 1 : 0.3
                            }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                            className={`w-3 h-3 rounded-full ${
                              i < selectedServiceData.complexity
                                ? 'bg-cyan-400'
                                : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                      >
                        <FaSpaceShuttle className="inline mr-2" />
                        Запустить проект
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gray-800/50 text-gray-300 py-3 rounded-xl font-semibold border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
                      >
                        Получить консультацию
                      </motion.button>
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
              transition={{ delay: 1 }}
              className="text-center mt-16"
            >
              <p className="text-gray-400 text-lg mb-6">
                Наведите курсор на планету для исследования, кликните для детальной информации
              </p>
              <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  Простая миссия
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  Средняя миссия
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  Сложная миссия
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Container>
  );
}
