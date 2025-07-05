import { useEffect, useState } from "react";

export default function Technologies() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('technologies');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const technologies = [
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Next.js", icon: "▲", category: "Frontend" },
    { name: "TypeScript", icon: "📘", category: "Language" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "PostgreSQL", icon: "🐘", category: "Database" },
    { name: "MongoDB", icon: "🍃", category: "Database" },
    { name: "Docker", icon: "🐳", category: "DevOps" },
    { name: "AWS", icon: "☁️", category: "Cloud" },
    { name: "Tailwind CSS", icon: "🎨", category: "Styling" },
    { name: "GraphQL", icon: "🔷", category: "API" },
    { name: "Redis", icon: "🔴", category: "Cache" },
    { name: "Git", icon: "📝", category: "Version Control" }
  ];

  return (
    <section className="relative py-24 px-4 md:px-12 overflow-hidden" id="technologies">
      {/* Минималистичный фон в стиле дизайна */}
      <div className="absolute inset-0 bg-[#0a0e1a]"></div>

      {/* Тонкие линии для структуры */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>

      {/* Минималистичные акценты */}
      <div className="absolute top-24 right-24 w-1 h-1 bg-yellow-500/30 rounded-full animate-pulse-glow"></div>
      <div className="absolute bottom-24 left-24 w-1 h-1 bg-yellow-500/30 rounded-full animate-pulse-glow delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-yellow-500/20 rounded-full animate-pulse-glow delay-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold mb-4 font-ubuntu animate-fade-in">Технологии</h2>
          <p className="text-neutral-300 max-w-2xl mx-auto font-ubuntu animate-fade-in delay-300">
            Используем современный стек технологий для создания качественных и масштабируемых решений
          </p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`group p-6 rounded-xl border border-yellow-500/10 bg-white/5 backdrop-blur-sm transition-all duration-500 ease-out delay-${index * 100} hover:border-yellow-500/30 hover:bg-white/10 hover-lift ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="font-semibold text-white mb-1 font-ubuntu group-hover:text-yellow-400 transition-colors duration-300">
                  {tech.name}
                </h3>
                <p className="text-sm text-neutral-400 font-ubuntu">
                  {tech.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-neutral-400 font-ubuntu">
            И это далеко не полный список. Мы постоянно изучаем новые технологии и инструменты
          </p>
        </div>
      </div>
    </section>
  );
}
