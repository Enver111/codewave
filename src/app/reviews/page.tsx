"use client";
import Footer from "../components/footer";
import Header from "../components/header";
import Reviews from "../components/reviews";
import PulsingLoader from "../components/PulsingLoader";
import { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <PulsingLoader loading={loading} />
      <main className="min-h-screen bg-[#0a0e1a] text-white font-sans">
        <Header />
        <div className="pt-24">
          <Reviews />
        </div>
        <Footer />
      </main>
    </>
  );
}
