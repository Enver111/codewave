import React from "react";
import Image from "next/image";
import Header from "../components/header";
import { PortfolioCard } from "../components/portfoliocard";
import { allWorks } from "../../../data/portfolio";

export default function PortfolioPage() {

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />
      <main className="pt-24 pb-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Портфолио</h1>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Все наши реализованные проекты, демонстрирующие наш опыт и экспертизу
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allWorks.map((work, index) => (
              <PortfolioCard key={index} {...work} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
