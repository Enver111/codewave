import { ServiceCard } from "./servicecard";


export default function Services() {
	const services = [
	  {
		title: "Разработка сайтов",
		description: "Создаем современные, быстрые и адаптивные веб-сайты, которые эффективно представляют ваш бизнес в интернете.",
		icon: (
		  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
			<path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round"/>
		  </svg>
		),
		features: [
		  "Корпоративные сайты",
		  "Лендинги",
		  "Интернет-магазины",
		  "Многостраничные сайты",
		  "Техническая поддержка"
		]
	  },
	  {
		title: "Веб-приложения",
		description: "Разрабатываем сложные веб-приложения с использованием современных технологий и фреймворков.",
		icon: (
		  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
			<rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M8 21H16" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M12 17V21" strokeLinecap="round" strokeLinejoin="round"/>
		  </svg>
		),
		features: [
		  "SPA приложения",
		  "CRM системы",
		  "Панели управления",
		  "API интеграции",
		  "Облачные решения"
		]
	  },
	  {
		title: "UI/UX Дизайн",
		description: "Создаем интуитивно понятные и привлекательные интерфейсы, которые повышают конверсию и удовлетворенность пользователей.",
		icon: (
		  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
			<path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round"/>
		  </svg>
		),
		features: [
		  "Прототипирование",
		  "Визуальный дизайн",
		  "Адаптивный дизайн",
		  "Анимации и переходы",
		  "Тестирование юзабилити"
		]
	  },
	  {
		title: "Техническая поддержка",
		description: "Обеспечиваем надежную работу ваших веб-проектов с помощью регулярного обслуживания и оперативной поддержки.",
		icon: (
		  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
			<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M12 16V12" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M12 8H12.01" strokeLinecap="round" strokeLinejoin="round"/>
		  </svg>
		),
		features: [
		  "Мониторинг работы",
		  "Регулярные обновления",
		  "Исправление ошибок",
		  "Консультации",
		  "Резервное копирование"
		]
	  }
	];

	return (
	  <section className="py-24 px-4 md:px-12" id="services">
		<div className="max-w-7xl mx-auto">
		  <div className="text-center mb-16">
			<h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
			<p className="text-neutral-300 max-w-2xl mx-auto">
			  Предлагаем полный спектр услуг по разработке и поддержке веб-проектов любой сложности
			</p>
		  </div>
		  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			{services.map((service, index) => (
			  <ServiceCard key={index} {...service} />
			))}
		  </div>
		</div>
	  </section>
	);
  }
