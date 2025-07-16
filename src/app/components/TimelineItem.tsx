"use client";

import React, { useState } from "react";
import Header from "./header";
import Title from "./UI/Title";
import { motion } from "framer-motion";
import StarrySky from "./UI/StarrySky";

const principles = [
  {
    icon: "🧼",
    title: "Мы пишем чистый код, а не заворачиваем шаблоны",
    text: "В CodeWave ты не найдёшь Bitrix, Tilda и других конструкторов — мы создаём с нуля. Каждый сайт — это индивидуальный код, выстроенный под бизнес-логику, задачи и эстетику бренда.",
  },
  {
    icon: "🚫",
    title: "Без перегруженных CRM и тяжёлых шаблонов",
    text: "Мы не используем готовые системы, которые замедляют работу и ограничивают дизайн. Только актуальные фреймворки и архитектура, которую легко масштабировать и поддерживать.",
  },
  {
    icon: "⚛️",
    title: "Фронтенд, который работает корректно",
    text: "На базе Next.js и Tailwind мы создаём лёгкие, быстрые интерфейсы с продуманной анимацией и эффектами. Каждый элемент реагирует, вовлекает и визуально усиливает ваш бренд — без излишней тяжеловесности.",
  },

  {
    icon: "🌐",
    title: "Чистый и надежный бэкэнд",
    text: "Кастомные REST или GraphQL API, безопасная логика, управление доступами, интеграции с базами. Node.js, PostgreSQL, MongoDB — архитектура спроектирована под реальные задачи и рост.",
  },
  {
    icon: "🧠",
    title: "Умный код — это удобство, безопасность и простота поддержки",
    text: "Если завтра понадобится внести правки — любой разработчик легко разберётся. А если захотите расти — система готова к масштабированию.",
  },
];

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.5 } },
};

function TimelineItem({
  item,
  idx,
}: {
  item: { icon: string; title: string; text: string };
  idx: number;
}) {
  const [lineDone, setLineDone] = React.useState(false);
  return (
    <li className="relative flex w-full items-center min-h-[100px] sm:min-h-[110px] md:min-h-[120px] mt-0">
      {/* Горизонтальная линия только на md+ */}
      <motion.span
        className={`hidden md:block absolute top-1/2 h-1 w-12 -translate-y-1/2 z-10 ${
          idx % 2 === 0 ? "left-1/2" : "right-1/2"
        }`}
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.2, delay: idx * 0.2, ease: "linear" }}
        style={{ transformOrigin: idx % 2 === 0 ? "left" : "right" }}
        onAnimationComplete={() => setLineDone(true)}
      >
        <span className="block h-full w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-200 opacity-80 rounded-full" />
      </motion.span>
      {/* Карточка: md+ с анимацией, <md — просто fade-in через Tailwind */}
      <motion.div
        className={`hidden md:flex relative w-full md:w-1/2 z-20 ${
          idx % 2 === 0 ? "md:ml-[calc(50%+48px)]" : "md:mr-[calc(50%+48px)]"
        } justify-center`}
        initial={{ opacity: 0 }}
        animate={lineDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, type: "tween", delay: 0 }}
      >
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-yellow-500/20 w-full max-w-xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-0">
            <span className="text-3xl sm:text-4xl md:text-5xl select-none drop-shadow-lg">
              {item.icon}
            </span>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-yellow-400 font-ubuntu">
              {item.title}
            </h2>
          </div>
          <p className="text-neutral-200 text-sm sm:text-base md:text-lg">
            {item.text}
          </p>
        </div>
      </motion.div>
      <div
        className={`flex md:hidden relative w-full z-20 justify-center transition-opacity duration-700 opacity-100`}
      >
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-4 sm:p-6 shadow-xl border border-yellow-500/20 w-full max-w-xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-0">
            <span className="text-3xl sm:text-4xl select-none drop-shadow-lg">
              {item.icon}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-yellow-400 font-ubuntu">
              {item.title}
            </h2>
          </div>
          <p className="text-neutral-200 text-sm sm:text-base">{item.text}</p>
        </div>
      </div>
    </li>
  );
}

export default function PrinciplesTimeline() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white relative overflow-hidden">
      <Header />
      <div className="absolute inset-0 pointer-events-none z-0">
        <StarrySky />
      </div>
      <main className="pt-12 pb-16 px-4 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Title>Почему CodeWave?</Title>
            <p className="text-neutral-300 max-w-2xl mx-auto mt-2 text-lg">
              Наши принципы и подход к созданию современных цифровых продуктов
            </p>
          </div>
          <div className="relative py-0">
            {/* Вертикальная светящаяся линия */}
            <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-yellow-400 via-orange-400 to-yellow-200 rounded-full -translate-x-1/2 z-0 shadow-[0_0_32px_8px_rgba(253,224,71,0.15)]" />
            <ul className="relative z-10 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
              {principles.map((item, idx) => (
                <TimelineItem key={idx} item={item} idx={idx} />
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
