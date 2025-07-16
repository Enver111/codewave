"use client";

interface PulsingLoaderProps {
  loading?: boolean;
}

export default function PulsingLoader({ loading = true }: PulsingLoaderProps) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e1a]">
      <div className="animate-pulse">
        <img
          src="/icons/codewave_logo.svg"
          alt="CodeWave Loading..."
          className="w-36 h-36 sm:w-36 sm:h-36"
        />
      </div>
    </div>
  );
}
