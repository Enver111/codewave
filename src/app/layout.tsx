import type { Metadata } from "next";
import { Ubuntu, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: {
    default: "CodeWave - Профессиональная веб-разработка",
    template: "%s | CodeWave",
  },
  description:
    "Создаем современные веб-сайты, мобильные приложения и дизайн. Полный цикл разработки от идеи до запуска. Качественно, быстро, с гарантией.",
  keywords: [
    "веб-разработка",
    "создание сайтов",
    "дизайн",
    "мобильные приложения",
    "Next.js",
    "React",
    "TypeScript",
    "CodeWave",
  ],
  authors: [{ name: "CodeWave Team" }],
  creator: "CodeWave",
  publisher: "CodeWave",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icons/codewave_logo.svg",
    shortcut: "/icons/codewave_logo.svg",
    apple: "/icons/codewave_logo.svg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "CodeWave",
    title: "CodeWave - Профессиональная веб-разработка",
    description:
      "Создаем современные веб-сайты, мобильные приложения и дизайн. Полный цикл разработки от идеи до запуска.",
    url: "https://codewave.com",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CodeWave - Веб-разработка и дизайн",
      },
    ],
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeWave - Профессиональная веб-разработка",
    description:
      "Создаем современные веб-сайты, мобильные приложения и дизайн. Полный цикл разработки от идеи до запуска.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://codewave.com",
  },
  other: {
    "theme-color": "#0a0022",
    "msapplication-TileColor": "#0a0022",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`dark ${ubuntu.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-ubuntu antialiased">{children}</body>
    </html>
  );
}
