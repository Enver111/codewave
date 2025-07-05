import type { Metadata } from "next";
import { Ubuntu, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/components/auth/AuthProvider";
import AppLoader from "./components/AppLoader";
import { LoadingProvider } from "./context/LoadingContext";
import { MessageProvider } from "./context/MessageContext";

// Основной шрифт - Ubuntu
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

// Моноширинный шрифт для кода - JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
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
    <html lang="en" className={`${ubuntu.variable} ${jetbrainsMono.variable}`}>
      <body className="font-ubuntu antialiased">
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
