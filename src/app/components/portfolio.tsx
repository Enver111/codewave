import Link from "next/link";
import { PortfolioCard } from "./portfoliocard";
import { allWorks } from '../../../data/portfolio'
import { useEffect, useState } from "react";
import Button from "./UI/Button";
import Title from "./UI/Title";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './services-swiper.css';

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [swiperRef, setSwiperRef] = useState<any>(null);

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
    <section className="relative py-16 px-4 md:px-12 overflow-hidden" id="portfolio">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Title>Наши работы</Title>
          <p className="text-neutral-300 max-w-2xl mx-auto font-ubuntu animate-fade-in delay-300 text-lg mt-4">
            Реализованные проекты, которые помогли нашим клиентам достичь их бизнес-целей
          </p>
        </div>
        {/* Мобильный свайпер */}
        <div className="md:hidden pb-2">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{ clickable: true, el: '.custom-swiper-pagination-portfolio' }}
            style={{ width: '100%', maxWidth: 400 }}
            className="w-full flex flex-col items-center mb-2"
            onSwiper={setSwiperRef}
          >
            {featuredWorks.map((work, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-stretch">
                  <div className="w-full max-w-xs h-[480px] flex items-stretch mx-auto">
                    <PortfolioCard {...work} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-swiper-pagination-portfolio flex justify-center mt-1" />
        </div>
        {/* Десктопная сетка */}
        <div className={`hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 transition-all duration-1000 ease-out ${
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
