import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NuradiHealth — India's Health Platform",
    short_name: "NuradiHealth",
    description:
      "34 health calculators, 120 disease guides, live news, AI chatbot, and curated wellness videos.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10b981",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/nuradihealth-dark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/nuradihealth-dark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["health", "medical", "lifestyle", "education"],
    lang: "en-IN",
  };
}
