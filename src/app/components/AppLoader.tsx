"use client";

import Loader from "./loader";
import { useLoading } from "../context/LoadingContext";

interface AppLoaderProps {
  children: React.ReactNode;
}

export default function AppLoader({ children }: AppLoaderProps) {
  const { isAppLoading, isContentVisible } = useLoading();

  return (
    <>
      <Loader loading={isAppLoading} />
      <div
        className={`transition-opacity duration-500 ${
          isContentVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
