import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/components/auth/AuthProvider";
import AppLoader from "./components/AppLoader";
import { LoadingProvider } from "./context/LoadingContext";
import { MessageProvider } from "./context/MessageContext";

// iOS-подобный шрифт (используем Inter с оптимизациями)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeWave",
  description: "CodeWave Solutions",
  icons: {
    icon: "/icons/codewave_logo.svg",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  other: {
    'theme-color': '#000000',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased">
        <AuthProvider>
          <LoadingProvider>
            <MessageProvider>
              <AppLoader>{children}</AppLoader>
            </MessageProvider>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
