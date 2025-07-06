import { Container } from "./container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./UI/Button";


export default function Subheader() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden min-h-[400px] mt-16 pt-16 pb-16"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Верхний fade для плавного перехода к header */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0a0e1a] to-transparent z-20 pointer-events-none" />
      {/* Нижний fade для плавного перехода к следующему блоку */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0e1a] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[#0a0e1a]/70 pointer-events-none -z-10" />

      {/* Анимированные частицы */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-yellow-500/60 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-0.5 h-0.5 bg-yellow-500/40 rounded-full animate-ping delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-0.5 h-0.5 bg-yellow-500/30 rounded-full animate-ping delay-500"></div>

      {/* Плавающие элементы */}
      <div className="absolute top-32 right-32 w-2 h-2 bg-yellow-500/20 rounded-full animate-bounce delay-700"></div>
      <div className="absolute bottom-32 left-32 w-1 h-1 bg-yellow-500/30 rounded-full animate-bounce delay-300"></div>

    <Container>
        <section className="flex flex-col md:flex-row justify-between items-center px-12 pt-16 gap-12 relative">
          <div className={`max-w-xl z-10 transition-all duration-1000 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'
          }`}>
          <h1 className={`text-5xl md:text-6xl font-bold leading-tight mb-6 font-ubuntu transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <span className="text-yellow-500/25 bg-gradient-to-r from-yellow-500 to-orange-500 via-yellow-100 to-yellow-200 bg-clip-text text-transparent animate-pulse">CodeWave —</span> <br />
            <span className="font-playfair-display">мощь веб-решений</span>
          </h1>
          <p className={`text-lg text-neutral-300 mb-8 font-ubuntu leading-relaxed transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Создаем современные и эффективные веб-сайты и приложения, которые двигают бизнес вперед.
          </p>
            <Button onClick={() => router.push('/order')}>
            Создать сайт мечты
            </Button>
        </div>
          <div className={`flex-shrink-0 z-10 transition-all duration-1000 delay-500 ease-out ${
            isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-[50px] opacity-0 scale-95'
          }`}>
          <Image
            src="/images/monitor.png"
            alt="Wave Monitor"
            width={440}
            height={360}
            className="animate-float"
          />
        </div>
      </section>
    </Container>
    </div>
  );
}
