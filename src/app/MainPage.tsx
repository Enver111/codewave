"use client";

import Header from "./components/header";
import Subheader from "./components/subheader";
import Services from "./components/services";
import Portfolio from "./components/portfolio";
import Technologies from "./components/technologies";
import Price from "./components/price";
import Contacts from "./components/contacts";
import Footer from "./components/footer";

interface MainPageProps {
  reviews: React.ReactNode;
}

export default function MainPage({ reviews }: MainPageProps) {
  return (
    <div>
      <main className="min-h-screen bg-[#0a0e1a] text-white font-sans">
        <Header />
        <Subheader />
        <Services />
        <Portfolio />
        <Technologies />
        <Price />
        {reviews}
        <Footer />
      </main>
    </div>
  );
}
