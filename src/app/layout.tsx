import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIBO Strategy",
  description: "Стратегические консультации по китайской метафизике в современном цифровом формате.",
  metadataBase: new URL("https://vibostrategy.vercel.app"),
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "VIBO Strategy",
    description: "Стратегическая платформа консультаций для сложных жизненных и бизнес-задач.",
    url: "https://vibostrategy.vercel.app",
    siteName: "VIBO Strategy",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og/og-image.svg",
        width: 1200,
        height: 630,
        alt: "VIBO Strategy"
      }
    ]
  }
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  const gaMeasurementId = "G-NK8T28Z6HN";

  return (
    <html lang="ru">
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
