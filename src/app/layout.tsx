import type { Metadata } from "next";
import { Bebas_Neue, Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-nike",
  display: "swap",
  adjustFontFallback: true,
});

/** Poster street — titoli ad alto impatto (default tema Atleti). */
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poster",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Atleti",
  description: "Template siti ufficiali atleti — Next.js, dati da JSON",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${oswald.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] font-sans text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
