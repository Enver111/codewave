import { ServiceCard } from "./servicecard";
import { services } from "../../../data/portfolio";
import Title from "./UI/Title";

export default function Services() {
	return (
	  <section className="py-24 px-4 md:px-12" id="services">
		<div className="max-w-7xl mx-auto">
		  <div className="text-center mb-16">
			<Title>Наши услуги</Title>
			<p className="text-neutral-300 max-w-2xl mx-auto mt-4 text-lg">
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
