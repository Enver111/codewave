interface ServiceCardProps {
	title: string;
	description: string;
	icon: string;
	features: string[];
  }

  export const ServiceCard = ({ title, description, icon, features }: ServiceCardProps) => (
	<div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 transition-all duration-300 group
	  md:hover:border-yellow-500/30 md:hover:shadow-2xl md:hover:shadow-yellow-500/10 md:hover:-translate-y-1">
	  <div className="flex items-center gap-4 mb-6">
		<div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center transition-transform duration-300 md:group-hover:scale-110">
		  <img src={icon} alt={title} className="w-6 h-6" />
		</div>
		<h3 className="text-xl font-semibold text-yellow-100">{title}</h3>
	  </div>
	  <p className="text-neutral-300 mb-6">{description}</p>
	  <ul className="space-y-3">
		{features.map((feature, index) => (
		  <li key={index} className="flex items-center gap-3 text-neutral-300">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
			  <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
			{feature}
		  </li>
		))}
	  </ul>
	</div>
  );
