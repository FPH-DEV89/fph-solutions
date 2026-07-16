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
    url: "https://fph-solutions.com",
    images: [
      {
        url: "https://fph-solutions.com/og-default.svg",
        width: 1200,
        height: 630,
        alt: "FPH Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FPH Solutions — Solutions logicielles sur mesure",
    description:
      "Applications web sur mesure avec Next.js, React et TypeScript.",
    images: ["https://fph-solutions.com/og-default.svg"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FPH Solutions",
    url: "https://fph-solutions.com",
    logo: "https://fph-solutions.com/favicon.ico",
    description:
      "Solutions logicielles sur mesure — Next.js, React, TypeScript. Applications SAV, sites vitrine, automatisation et IA.",
    founder: {
      "@type": "Person",
      name: "Florian Philibert",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@fph-solutions.com",
      contactType: "sales",
      availableLanguage: ["French", "English"],
    },
    sameAs: [
      "https://github.com/FPH-DEV89",
    ],
  }
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light') {
                  document.documentElement.classList.remove('dark')
                } else {
                  document.documentElement.classList.add('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
