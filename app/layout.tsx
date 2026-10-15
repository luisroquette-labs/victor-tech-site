import type { Metadata } from "next";
import { Fraunces, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Victor.Tech — Landing Pages que Convertem & Sites de Alta Performance",
  description:
    "Especialista em sites e ativos digitais de vendas. Landing pages de alta conversão, sites premium em código nativo (até 10x mais rápidos) e automações de IA sob medida para comércios locais e profissionais liberais.",
  openGraph: {
    title: "Victor.Tech — Ativos digitais que vendem 24h por dia",
    description:
      "Landing pages de alta conversão, sites premium em código nativo e automações de IA sob medida. +320% em conversões, 150+ projetos entregues.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} ${grotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
