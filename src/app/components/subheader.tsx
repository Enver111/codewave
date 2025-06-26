import { Container } from "./container";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Subheader() {
  const router = useRouter();

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
    <Container>
        <section className="flex flex-col md:flex-row justify-between items-center px-12 pt-16 gap-12 relative">
          <div className="max-w-xl z-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-yellow-500/25 bg-gradient-to-r from-yellow-500 to-orange-500 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">CodeWave —</span> <br />мощь веб-решений
          </h1>
          <p className="text-lg text-neutral-300 mb-8">
            Создаем современные и эффективные веб-сайты и приложения, которые двигают бизнес вперед.
          </p>
            <button
              className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
              onClick={() => router.push('/order')}
            >
            Создать сайт мечты
          </button>
        </div>
          <div className="flex-shrink-0 z-10">
          <Image src="/images/monitor.png" alt="Wave Monitor" width={440} height={360} />
        </div>
      </section>
    </Container>
    </div>
  );
}
