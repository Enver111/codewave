import { Container } from "./container";
import Image from "next/image";


export default function Subheader() {
  return (
    <Container>
     <section className="flex flex-col md:flex-row justify-between items-center px-12 mt-16 gap-12">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-yellow-500/25 bg-gradient-to-r from-yellow-500 to-orange-500 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">CodeWave —</span> <br />мощь веб-решений
          </h1>
          <p className="text-lg text-neutral-300 mb-8">
            Создаем современные и эффективные веб-сайты и приложения, которые двигают бизнес вперед.
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25">
            Создать сайт мечты
          </button>
        </div>
        <div className="flex-shrink-0">
          <Image src="/images/monitor.png" alt="Wave Monitor" width={440} height={360} />
        </div>
      </section>
    </Container>
  );
}
