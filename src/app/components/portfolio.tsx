import Link from "next/link";
import { PortfolioCard } from "./portfoliocard";
import { allWorks } from '../../../data/portfolio'

export default function Portfolio() {
  // Берем только первые 4 работы для главной страницы
  const featuredWorks = allWorks.slice(0, 4);

  return (
    <section className=" px-4 md:px-12" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Наши работы</h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Реализованные проекты, которые помогли нашим клиентам достичь их бизнес-целей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredWorks.map((work, index) => (
            <PortfolioCard key={index} {...work} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
          >
            Показать все работы
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 4.16669L15.8333 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
