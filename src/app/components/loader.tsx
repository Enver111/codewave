"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000); // 4 сек
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e1a] bg-opacity-95 transition-opacity duration-700" style={{animation: 'fadeOut 0.7s 3.4s forwards'}}>
      <style>{`
        @keyframes fadeOut { to { opacity: 0; pointer-events: none; } }
      `}</style>
      <div className="w-full max-w-xl">
        <img src="/icon.svg" alt="Loading..." className="w-full h-auto animate-pulse" />
      </div>
    </div>
  );
}
