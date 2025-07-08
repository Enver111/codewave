"use client";

import Header from "./components/header";
import Subheader from "./components/subheader";
import Services from "./components/services";
import Portfolio from "./components/portfolio";
import Technologies from "./components/technologies";
import ElegantServices from "./components/ElegantServices";
import Contacts from "./components/contacts";
import Footer from "./components/footer";
import Stripe from "./components/UI/Stripe";
import StarrySky from "./components/UI/StarrySky";

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
        <Stripe />
        <Portfolio />
        <Stripe />
        <Technologies />
        <Stripe />
        <ElegantServices />
        <Stripe />
        {reviews}
        <Stripe />
        <Footer />
        <StarrySky />
      </main>
    </div>
  );
}
