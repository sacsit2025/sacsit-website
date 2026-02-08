import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navigation, Footer } from "@/components";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SACS-IT | Results-Secured Technology Studio",
  description: "Enterprise-grade technology platforms — from architecture to production. Backed by 25 years of engineering depth and independently verified delivery.",
  keywords: ["technology studio", "platform development", "enterprise software", "industrial automation", "AI infrastructure", "Lebanon", "Beirut"],
  authors: [{ name: "SACS-IT" }],
  openGraph: {
    title: "SACS-IT | Results-Secured Technology Studio",
    description: "Enterprise-grade technology platforms — from architecture to production. Backed by 25 years of engineering depth and independently verified delivery.",
    url: "https://sacsit.com",
    siteName: "SACS-IT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SACS-IT | Results-Secured Technology Studio",
    description: "Enterprise-grade technology platforms — from architecture to production.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-white min-h-screen`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
