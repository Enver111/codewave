"use client";
import Contacts from "../components/contacts";
import Header from "../components/header";
import PulsingLoader from "../components/PulsingLoader";
import { useEffect, useState } from "react";

export default function ContactsPage() {
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
        <Contacts />
      </main>
    </>
  );
}
