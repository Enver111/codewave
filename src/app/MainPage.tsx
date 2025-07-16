"use client";

import Header from "./components/header";
import Subheader from "./components/subheader";
import Services from "./components/services";
import Blog from "./components/TimelineItem";
import Technologies from "./components/technologies";
import ElegantServices from "./components/ElegantServices";
import Contacts from "./components/contacts";
import Footer from "./components/footer";
import Stripe from "./components/UI/Stripe";
import StarrySky from "./components/UI/StarrySky";
import Reviews from "./components/reviews";

interface MainPageProps {
  reviews: boolean;
}

export default function MainPage({ reviews }: MainPageProps) {
  return (
    <div>
      <main className="min-h-screen bg-[#0a0e1a] text-white font-sans">
        <Header />
        <Subheader />
        <Services />
        <Stripe />
        <Blog />
        <Stripe />
        <Technologies />
        <Stripe />
        <ElegantServices />
        <Stripe />
        <Reviews />
        <Stripe />
        <Footer />
        <StarrySky />
      </main>
    </div>
  );
}
