import type { Metadata } from "next";
import { Ubuntu, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppLoader from "./components/AppLoader";

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
    <html lang="en" className={`dark ${ubuntu.variable} ${jetbrainsMono.variable}`}>
      <body className="font-ubuntu antialiased">
        <AppLoader>{children}</AppLoader>
      </body>
    </html>
  );
}
