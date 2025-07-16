"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/header";
import Footer from "../components/footer";
import Title from "../components/UI/Title";
import PulsingLoader from "../components/PulsingLoader";

// Данные услуг
const servicesData = [
  {
    id: "web-development",
    title: "Разработка сайтов",
    description:
      "Создаем современные, быстрые и адаптивные веб-сайты, которые эффективно представляют ваш бизнес в интернете.",
    icon: "🌐",
    color: "from-blue-500 to-cyan-500",
    services: [
      {
        icon: "🏢",
        title: "Корпоративные сайты",
        description:
          "Для компаний, которым важно выглядеть солидно и надёжно. Такой сайт презентует вашу компанию, рассказывает о команде, услугах и ценностях. Удобная навигация, строгий стиль и полное соответствие бренду.",
      },
      {
        icon: "📈",
        title: "Лендинги",
        description:
          "Одностраничные сайты, заточенные под конкретную задачу — продать продукт, собрать заявки или презентовать событие. Ярко, фокусно, с точным посылом и высоким откликом.",
      },
      {
        icon: "🛒",
        title: "Интернет-магазины",
        description:
          "Сайты, которые продают. Каталог товаров, удобный фильтр, корзина и оплата — всё работает гладко и безопасно. Добавим аналитику, интеграции и сделаем процесс покупки максимально комфортным.",
      },
      {
        icon: "📚",
        title: "Многостраничные сайты",
        description:
          "Если у вас много информации: услуги, портфолио, блог, кейсы и т. д. Мы выстраиваем структуру так, чтобы пользователь не терялся, быстро находил нужное и получал удовольствие от навигации.",
      },
      {
        icon: "🛠️",
        title: "Техническая поддержка",
        description:
          "После запуска мы не исчезаем. Обновления, безопасность, консультации — всё под контролем. Вы можете спокойно заниматься бизнесом, пока мы следим за сайтом.",
      },
    ],
  },
  {
    id: "web-apps",
    title: "Веб-приложения",
    description:
      "Разрабатываем сложные веб-приложения с использованием современных технологий и фреймворков.",
    icon: "⚡",
    color: "from-purple-500 to-pink-500",
    services: [
      {
        icon: "⚛️",
        title: "SPA-приложения (одностраничные интерфейсы)",
        description:
          "Это быстрые и отзывчивые сайты, где всё происходит без перезагрузки страниц. Пользователи чувствуют себя комфортно — всё работает мгновенно, плавно и как в настоящем приложении.",
      },
      {
        icon: "🧠",
        title: "CRM-системы",
        description:
          "Автоматизация для вашего бизнеса: управление клиентами, продажами, задачами — всё в одном месте. Настраиваем индивидуально под ваши процессы, чтобы вы работали эффективнее.",
      },
      {
        icon: "🧮",
        title: "Панели управления",
        description:
          "Простые и понятные интерфейсы для администраторов, сотрудников, партнёров. Статистика, управление контентом, модерация — всё под рукой, в интуитивной и надёжной оболочке.",
      },
      {
        icon: "🔗",
        title: "API-интеграции",
        description:
          "Объединяем ваш сайт с другими сервисами: платёжные системы, CRM, ERP, маркетинг-платформы. Всё работает синхронно и без лишних движений — данные передаются быстро и безопасно.",
      },
      {
        icon: "☁️",
        title: "Облачные решения",
        description:
          "Ваши данные и приложения всегда доступны, надёжно хранятся и масштабируются. Разворачиваем инфраструктуру в облаке, чтобы вы могли расти без технических ограничений.",
      },
    ],
  },
  {
    id: "ui-ux",
    title: "UI/UX дизайн",
    description:
      "Создаем интуитивно понятные и привлекательные интерфейсы, которые повышают конверсию и удовлетворенность пользователей.",
    icon: "🎨",
    color: "from-yellow-500 to-orange-500",
    services: [
      {
        icon: "🧪",
        title: "Прототипирование",
        description:
          "Перед тем как писать код, мы создаём интерактивную модель будущего сайта или приложения. Это как черновик, только живой — позволяет заранее понять, как всё будет работать и что нужно улучшить.",
      },
      {
        icon: "🖌️",
        title: "Визуальный дизайн",
        description:
          "От шрифта до цвета кнопки — всё выстроено под вашу аудиторию и цели. Мы делаем дизайн не «для красоты», а чтобы пользователь хотел остаться и действовать.",
      },
      {
        icon: "📱",
        title: "Адаптивный дизайн",
        description:
          "Ваш сайт будет отлично смотреться и работать на любых устройствах — от смартфона до большого экрана. Важно, чтобы всё было удобно, независимо от формата.",
      },
      {
        icon: "🎬",
        title: "Анимации и переходы",
        description:
          "Мы используем динамику, чтобы интерфейс оживал. Плавные появления, отклики на действия, микроанимации — всё, что делает цифровой опыт более живым и увлекательным.",
      },
      {
        icon: "👁️‍🗨️",
        title: "Тестирование юзабилити",
        description:
          "Перед запуском мы проверяем, удобно ли пользователю: легко ли найти нужное, понятно ли, как пользоваться. Если что-то мешает — исправляем. Удобство стоит на первом месте.",
      },
    ],
  },
  {
    id: "support",
    title: "Поддержка и обслуживание",
    description:
      "Обеспечиваем надежную работу ваших веб-проектов с помощью регулярного обслуживания и оперативной поддержки.",
    icon: "🔧",
    color: "from-green-500 to-emerald-500",
    services: [
      {
        icon: "👁️",
        title: "Мониторинг работы",
        description:
          "Мы отслеживаем, как работает сайт: скорость, безопасность, стабильность. Если что-то идёт не так — мы реагируем первыми.",
      },
      {
        icon: "🔄",
        title: "Регулярные обновления",
        description:
          "Технологии развиваются — мы обновляем систему, чтобы всё оставалось актуальным и защищённым. От внешнего вида до внутренних модулей.",
      },
      {
        icon: "🛠️",
        title: "Исправление ошибок",
        description:
          "Если вдруг появляется сбой — мы исправляем всё оперативно. Не нужно искать специалиста: мы уже на связи.",
      },
      {
        icon: "📞",
        title: "Консультации",
        description:
          "Возникают вопросы? Хотите добавить новый раздел? Мы готовы подсказать, объяснить и помочь. Простыми словами, без технического жаргона.",
      },
      {
        icon: "☁️",
        title: "Резервное копирование",
        description:
          "Ваши данные всегда в безопасности. Мы настраиваем автоматическое сохранение — если что-то случится, всё можно восстановить.",
      },
    ],
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState(servicesData[0].id);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const activeService = servicesData.find(
    (service) => service.id === activeCategory
  );

  return (
    <>
      <PulsingLoader loading={loading} />
      <main className="min-h-screen bg-[#0a0e1a] text-white font-sans">
        <Header />
        <div className="pt-20">
          {/* Hero Section */}
          <section className="py-20 px-4 md:px-12 text-center">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Title>Наши услуги</Title>
                <p className="text-neutral-300 max-w-2xl mx-auto mt-6 text-xl leading-relaxed">
                  Предлагаем полный спектр услуг по разработке и поддержке
                  веб-проектов любой сложности
                </p>
              </motion.div>
            </div>
          </section>

          {/* Categories Navigation */}
          <section className="px-4 md:px-12 mb-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {servicesData.map((service, index) => (
                  <motion.button
                    key={service.id}
                    onClick={() => setActiveCategory(service.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === service.id
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">{service.icon}</span>
                    {service.title}
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* Active Service Details */}
          {activeService && (
            <section className="px-4 md:px-12 pb-20">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${activeService.color} flex items-center justify-center text-3xl shadow-2xl`}
                  >
                    {activeService.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {activeService.title}
                  </h2>
                  <p className="text-neutral-300 max-w-3xl mx-auto text-lg leading-relaxed">
                    {activeService.description}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activeService.services.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 transition-all duration-300 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-1 group"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-100 mb-3 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-neutral-300 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-center mt-16"
                >
                  <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Готовы обсудить ваш проект?
                    </h3>
                    <p className="text-neutral-300 mb-6">
                      Расскажите нам о своих идеях, и мы поможем воплотить их в
                      жизнь
                    </p>
                    <motion.a
                      href="/order"
                      className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Заказать проект
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </section>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}
