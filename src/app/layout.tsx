import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "[PLATFORM_NAME]",
  description: "[TAGLINE]"
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
