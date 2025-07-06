import { ServiceCard } from "./servicecard";
import { services } from "../../../data/portfolio";

export default function Services() {
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
