import Header from "./components/header";
import Image from "next/image";
import Subheader from "./components/subheader";

import Services from "./components/services";
import Portfolio from "./components/portfolio";
import Technologies from "./components/technologies";
import Price from "./components/price";

export default function Home() {
  return (
    <div>
      <main className="min-h-screen bg-[#0a0e1a] text-white font-sans">
        <Header />
        <Subheader />
        <Services />
        <Portfolio />
        <Technologies />
        <Price />
      </main>
    </div>
  );
}
