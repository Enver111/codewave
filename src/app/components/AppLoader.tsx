"use client";

import Loader from "./loader";

interface AppLoaderProps {
  children: React.ReactNode;
}

export default function AppLoader({ children }: AppLoaderProps) {

  return (
    <>
      <Loader loading={false} />
      <div className={`transition-opacity duration-500 opacity-100`}>
        {children}
      </div>
    </>
  );
}
