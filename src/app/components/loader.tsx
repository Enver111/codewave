"use client";

interface LoaderProps {
  loading: boolean;
}

export default function Loader({ loading }: LoaderProps) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0e1a]">
      <div className="w-full max-w-md px-8">
        <img src="/icon.svg" alt="Loading..." className="w-full h-auto" />
      </div>
      <div className="w-full max-w-sm h-2 bg-gray-800 rounded-full overflow-hidden mt-8">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          style={{
            animation: "loading-progress 2s ease-out forwards",
          }}
        ></div>
      </div>
      <style>{`
        @keyframes loading-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
