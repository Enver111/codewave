
interface ServiceCardProps {
	title: string;
	description: string;
	icon: React.ReactNode;
	features: string[];
  }

  export const ServiceCard = ({ title, description, icon, features }: ServiceCardProps) => (
	<div className="bg-[#10182a] rounded-xl p-8 hover:bg-[#1a2540] transition-colors duration-300">
	  <div className="flex items-center gap-4 mb-6">
		<div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center">
		  {icon}
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
