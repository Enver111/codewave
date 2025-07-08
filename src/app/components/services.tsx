import { ServiceCard } from "./servicecard";
import { services } from "../../../data/portfolio";
import Title from "./UI/Title";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useState } from "react";
import './services-swiper.css';

export default function Services() {
	const firstCardRef = useRef<HTMLDivElement>(null);
	const [swiperRef, setSwiperRef] = useState<any>(null);

	useEffect(() => {
		if (window.innerWidth < 900 && firstCardRef.current) {
			firstCardRef.current.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
		}
	}, []);

	return (
	  <section className="py-24 px-4 md:px-12" id="services">
		<div className="max-w-7xl mx-auto">
		  <div className="text-center mb-16">
			<Title>Наши услуги</Title>
			<p className="text-neutral-300 max-w-2xl mx-auto mt-4 text-lg">
			  Предлагаем полный спектр услуг по разработке и поддержке веб-проектов любой сложности
			</p>
		  </div>
		  {/* Мобильный свайпер на SwiperJS */}
		  <div className="md:hidden pb-2">
			<Swiper
			  modules={[Pagination]}
			  spaceBetween={16}
			  slidesPerView={1}
			  centeredSlides={true}
			  pagination={{ clickable: true, el: '.custom-swiper-pagination' }}
			  style={{ width: '100%', maxWidth: 400 }}
			  className="w-full flex flex-col items-center mb-2"
			  onSwiper={setSwiperRef}
			>
			  {services.map((service, index) => (
				<SwiperSlide key={index}>
				  <div className="flex justify-center items-stretch">
					<div className="w-full max-w-xs h-[445px] flex items-stretch mx-auto">
					  <ServiceCard {...service} />
					</div>
				  </div>
				</SwiperSlide>
			  ))}
			</Swiper>
			<div className="custom-swiper-pagination flex justify-center mt-1" />
		  </div>
		  {/* Десктопная сетка */}
		  <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
			{services.map((service, index) => (
			  <ServiceCard key={index} {...service} />
			))}
		  </div>
		</div>
	  </section>
	);
  }
