"use client";

import React, { useState, useRef, useEffect } from "react";
import { templates } from "../../../data/orderPage";
import Link from "next/link";

export default function DesignPage() {
  const [search, setSearch] = useState("");
  const filteredTemplates = templates.filter(
    (t) => t.image && t.name.toLowerCase().includes(search.toLowerCase())
  );
  const [visibleCount, setVisibleCount] = useState(6);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < filteredTemplates.length
        ) {
          setVisibleCount((c) => c + 6);
        }
      },
      { rootMargin: "0px", threshold: 1.0 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [visibleCount, filteredTemplates.length]);

  const shownTemplates = filteredTemplates
    .slice()
    .reverse()
    .slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-[#0a0022] bg-gradient-to-br from-[#0a0022] via-[#1a003a] to-[#0a0022] flex flex-col items-center py-6 md:py-12 px-4 md:px-2">
      <div className="flex items-center gap-3 md:gap-6 mb-6 md:mb-10 w-full max-w-7xl justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <img
            src="/icons/codewave_logo.svg"
            alt="CodeWave Logo"
            className="w-10 h-10 md:w-14 md:h-14 neon-logo"
          />
          <span className="text-xl md:text-3xl font-extrabold neon-text tracking-widest select-none">
            CodeWave
          </span>
        </div>
        <Link href="/" legacyBehavior>
          <a className="px-4 py-2 md:px-6 md:py-2 rounded-2xl bg-[#6f00ff] text-white font-bold text-sm md:text-lg neon-text shadow-neon transition-colors duration-300 touch-button border-2 border-[#fff2] min-h-[44px] flex items-center">
            Домой
          </a>
        </Link>
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6 md:mb-8 tracking-widest neon-text px-4">
        Галерея макетов
      </h1>
      <div className="w-full max-w-3xl mb-4 md:mb-6 flex justify-center px-4">
        <div className="px-4 py-2 md:px-6 md:py-3 rounded-2xl text-white neon-text text-sm md:text-lg font-bold shadow-neon animate-pulse text-center">
          ⚡️ Каждый день — новый макет! Следи за обновлениями и вдохновляйся
          свежими идеями.
        </div>
      </div>
      <div className="w-full max-w-3xl mb-8 md:mb-10 flex justify-center px-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по названию..."
          className="w-full md:w-2/3 px-4 py-3 md:px-6 md:py-3 rounded-2xl bg-[#1a003a] border-2 border-[#6f00ff] text-white text-base md:text-lg neon-text placeholder:text-[#bfaaff] focus:outline-none focus:ring-2 focus:ring-[#6f00ff] transition min-h-[44px]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full max-w-7xl px-4 md:px-0">
        {shownTemplates.map((template) => (
          <a
            key={template.id}
            href={template.figmaUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-3xl overflow-hidden shadow-2xl neon-card transition-all duration-300 active:scale-95 template-card"
            style={{
              background: "rgba(20,20,40,0.95)",
              border: "2px solid #6f00ff",
            }}
          >
            <div className="relative w-full h-48 md:h-64 overflow-hidden">
              <img
                src={template.image}
                alt={template.name}
                className="object-cover w-full h-full template-image transition-transform duration-500"
                style={{
                  filter:
                    "brightness(1.1) saturate(1.2) drop-shadow(0 0 24px #6f00ff)",
                }}
              />
              <div className="absolute top-2 right-2 bg-[#6f00ff]/80 text-white text-xs px-2 py-1 md:px-3 md:py-1 rounded-full shadow-neon font-mono tracking-widest animate-pulse">
                Figma
              </div>
            </div>
            <div className="p-4 md:p-6 flex flex-col gap-2">
              <h2 className="text-lg md:text-2xl font-bold text-white neon-text mb-1">
                {template.name}
              </h2>
              <p className="text-white/80 text-sm md:text-base mb-2">
                {template.description}
              </p>
              <span className="inline-block mt-auto text-xs text-[#00BFFF] neon-text font-mono tracking-widest opacity-80">
                {template.type === "custom"
                  ? "Индивидуальный"
                  : "Готовый макет"}
              </span>
            </div>
          </a>
        ))}
      </div>
      <div ref={observerRef} className="h-8" />
      <style jsx global>{`
        .neon-text {
          text-shadow: 0 0 8px #6f00ff, 0 0 16px #6f00ff, 0 0 32px #fff2;
        }
        .neon-logo {
          filter: drop-shadow(0 0 12px #6f00ff) drop-shadow(0 0 24px #fff2);
        }
        .neon-card {
          box-shadow: 0 0 24px 0 #6f00ff55, 0 0 64px 0 #6f00ff22;
        }

        /* Touch-friendly кнопка */
        .touch-button {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* Hover эффекты только для десктопа */
        @media (hover: hover) and (pointer: fine) {
          .touch-button:hover {
            background-color: #8f2fff;
            transform: scale(1.05);
          }

          .template-card:hover {
            transform: scale(1.05);
            box-shadow: 0 0 32px 8px #6f00ffcc, 0 0 64px 0 #fff2;
          }

          .template-image:hover {
            transform: scale(1.1);
          }
        }

        /* Активные состояния для мобильных устройств */
        @media (hover: none) and (pointer: coarse) {
          .touch-button:active {
            background-color: #8f2fff;
            transform: scale(0.95);
          }

          .template-card:active {
            transform: scale(0.95);
          }
        }

        /* Улучшенная адаптивность для очень маленьких экранов */
        @media (max-width: 480px) {
          .neon-text {
            text-shadow: 0 0 6px #6f00ff, 0 0 12px #6f00ff, 0 0 24px #fff2;
          }
        }
      `}</style>
    </main>
  );
}
