import Image from "next/image";

interface TechnologyCardProps {
	name: string;
	description: string;
	icon: string;
	category: string;
  }

export const TechnologyCard = ({ name, description, icon, category }: TechnologyCardProps) => (
	<div className="group relative bg-[#10182a] rounded-xl p-8 hover:bg-[#1a2540] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
	  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
	  <div className="relative">
		<div className="flex items-center gap-6 mb-6">
		  <div className="w-16 h-16 relative bg-[#1a2540] rounded-xl p-3 group-hover:bg-[#2a3550] transition-colors duration-300">
			<Image
			  src={icon}
			  alt={name}
			  fill
			  className="object-contain p-2"
			/>
		  </div>
		  <div>
			<h3 className="text-xl font-semibold text-yellow-100 mb-1">{name}</h3>
			<span className="text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">{category}</span>
		  </div>
		</div>
		<p className="text-neutral-300 text-sm leading-relaxed">{description}</p>
	  </div>
	</div>
  );
