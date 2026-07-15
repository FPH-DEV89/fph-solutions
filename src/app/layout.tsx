import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "FPH Solutions — Solutions logicielles sur mesure",
    template: "%s — FPH Solutions",
  },
  description:
    "Applications web sur mesure avec Next.js, React et TypeScript. Solutions SAV, sites vitrine, automatisation et IA. Portfolio de Florian Philibert.",
  keywords: [
    "développement web",
    "Next.js",
    "React",
    "TypeScript",
    "portfolio",
    "SAV",
    "solution logicielle",
    "FPH Solutions",
    "Florian Philibert",
  ],
  authors: [{ name: "Florian Philibert" }],
  creator: "FPH Solutions",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "FPH Solutions",
    title: "FPH Solutions — Solutions logicielles sur mesure",
    description:
      "Applications web sur mesure avec Next.js, React et TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh bg-[#0a0a0a] text-zinc-100 antialiased">
        <Header />
        <main className="flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
