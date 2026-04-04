import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { TrustBar } from "@/components/trust-bar";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NuradiHealth — Curated Health & Education Videos",
  description:
    "A premium video discovery platform featuring curated health, wellness, fitness, and education content from trusted YouTube creators.",
  metadataBase: new URL("https://www.nuradi.co.in"),
  openGraph: {
    title: "NuradiHealth — Curated Health & Education Videos",
    description:
      "1,000+ expert videos from 28 verified doctors, scientists & therapists. Zero misinformation.",
    siteName: "NuradiHealth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NuradiHealth",
    description:
      "Curated health & education videos from trusted YouTube creators.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NuradiHealth",
  url: "https://www.nuradi.co.in",
  description:
    "A premium video discovery platform featuring curated health, wellness, fitness, and education content from trusted YouTube creators.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.nuradi.co.in/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <TrustBar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
