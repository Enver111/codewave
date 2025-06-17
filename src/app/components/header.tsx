import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";

export default function Header() {
  return (
    <Container>
      <header className="flex justify-between items-center px-12 py-6 bg-[#0a0e1a] text-white font-sans ">
     <div className="flex items-center gap-3">
		<Link href="/" className="flex items-center gap-3">
			<Image
				src="/codewave_logo.png"
				alt="CodeWave Logo"
				width={58}
				height={58}
			/>
			<span className="text-2xl font-semibold text-yellow-100">CodeWave</span>
			</Link>
        </div>
        <nav className="flex gap-10 text-lg font-light">
          <Link href="/services" className="hover:text-yellow-200 transition">Услуги</Link>
          <Link href="/portfolio" className="hover:text-yellow-200 transition">Портфолио</Link>
          <Link href="#about" className="hover:text-yellow-200 transition">О нас</Link>
          <Link href="#contacts" className="hover:text-yellow-200 transition">Контакты</Link>
        </nav>
    </header>
    </Container>
  );
}
