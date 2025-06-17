import { Container } from "./container";
import Image from "next/image";


export default function Subheader() {
  return (
    <Container>
     <section className="flex flex-col md:flex-row justify-between items-center px-12 mt-16 gap-12">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-yellow-100">CodeWave —</span> <br />мощь веб-решений
          </h1>
          <p className="text-lg text-neutral-300 mb-8">
            Создаем современные и эффективные веб-сайты и приложения, которые двигают бизнес вперед.
          </p>
          <button className="px-8 py-3 border border-yellow-200 rounded-lg text-lg font-medium text-yellow-100 hover:bg-yellow-100 hover:text-[#0a0e1a] transition cursor-pointer">
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
