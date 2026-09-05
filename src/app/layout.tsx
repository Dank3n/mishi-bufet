import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientShell } from "@/components/fx/ClientShell";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Mishi Bufet — Sushi Train & Bufet Asiatic | Mega Mall",
    template: "%s · Mishi Bufet",
  },
  description:
    "Bufet asiatic și sushi train lângă Mega Mall, București. All you can eat sushi, combo-uri și meniu de băuturi.",
  keywords: [
    "Mishi Bufet",
    "sushi train",
    "bufet asiatic",
    "Mega Mall",
    "București",
    "all you can eat",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col font-body antialiased bg-bg-deep text-ink">
        <ClientShell>
          <div className="noise-overlay" aria-hidden />
          <Navbar />
          <main className="flex-1 relative z-0">{children}</main>
          <Footer />
        </ClientShell>
      </body>
    </html>
  );
}
