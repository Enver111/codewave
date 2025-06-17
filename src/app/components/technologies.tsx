import Image from "next/image";
import { technologies } from "../../../data/portfolio";
import { TechnologyCard } from "./technologiescard";




export default function Technologies() {
  return (
    <section className="py-24 px-4 md:px-12 relative" id="technologies">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0a0e1a]/80 to-[#0a0e1a] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-100 to-blue-400 bg-clip-text text-transparent">
            Технологии
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto text-lg">
            Используем современный стек технологий для создания надежных и масштабируемых решений
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <TechnologyCard key={index} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
