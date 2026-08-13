import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FPH Solutions — Solutions logicielles sur mesure",
    short_name: "FPH Solutions",
    description:
      "Applications web sur mesure avec Next.js, React et TypeScript. Solutions SAV, sites vitrine, automatisation et IA.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
