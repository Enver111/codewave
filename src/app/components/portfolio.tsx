import Link from "next/link";
import { PortfolioCard } from "./portfoliocard";
import { allWorks } from '../../../data/portfolio'
import { useEffect, useState } from "react";
import Button from "./UI/Button";

export default function Portfolio() {
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

    const element = document.getElementById('portfolio');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Берем только первые 4 работы для главной страницы
  const featuredWorks = allWorks.slice(0, 4);

  return (
    <section className="relative py-24 px-4 md:px-12 overflow-hidden" id="portfolio">
      {/* Минималистичный фон в стиле дизайна */}
      <div className="absolute inset-0 bg-[#0a0e1a]"></div>

      {/* Тонкие линии для структуры */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>

      {/* Минималистичные акценты */}
      <div className="absolute top-16 right-16 w-1 h-1 bg-yellow-500/30 rounded-full animate-pulse-glow"></div>
      <div className="absolute bottom-16 left-16 w-1 h-1 bg-yellow-500/30 rounded-full animate-pulse-glow delay-1000"></div>
      <div className="absolute top-1/3 left-1/3 w-0.5 h-0.5 bg-yellow-500/20 rounded-full animate-pulse-glow delay-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold mb-4 font-ubuntu animate-fade-in">Наши работы</h2>
          <p className="text-neutral-300 max-w-2xl mx-auto font-ubuntu animate-fade-in delay-300">
            Реализованные проекты, которые помогли нашим клиентам достичь их бизнес-целей
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          {featuredWorks.map((work, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out delay-${index * 200} ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
              }`}
            >
              <PortfolioCard {...work} />
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-1000 delay-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Link
            href="/portfolio"
          >
            <Button>
              Показать все работы
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
