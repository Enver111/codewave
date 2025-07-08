import Image from "next/image";
import Link from "next/link";

interface PortfolioCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

export const PortfolioCard = ({ title, description, image, category, link }: PortfolioCardProps) => (
  <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden md:hover:border-yellow-500/30 transition-all duration-300 md:hover:shadow-2xl md:hover:shadow-yellow-500/10 md:hover:-translate-y-1">
    <div className="relative h-64 overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 md:group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] to-transparent opacity-60" />
    </div>
    <div className="p-6">
      <div className="text-sm text-yellow-100 mb-2 bg-yellow-500/10 px-3 py-1 rounded-full inline-block">{category}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-neutral-300 mb-4">{description}</p>
      <Link
        href={link}
        className="inline-flex items-center gap-2 text-blue-400 md:hover:text-yellow-200 transition-colors group/link"
      >
        Подробнее
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform md:group-hover/link:translate-x-1">
          <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 3.33331L12.6667 7.99998L8 12.6666" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  </div>
);
