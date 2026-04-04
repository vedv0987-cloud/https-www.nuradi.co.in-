import type { Metadata } from "next";
import { bodyParts } from "@/data/body-parts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const part = bodyParts.find((p) => p.id === id);
  if (!part) return { title: "Body Part Not Found — NuradiHealth" };
  return {
    title: `${part.name} — Body Explorer — NuradiHealth`,
    description: `Explore ${part.videoCount} expert videos about the ${part.name.toLowerCase()}. Learn about anatomy, health conditions, and treatments.`,
    openGraph: {
      title: `${part.name} — Body Explorer`,
      description: `${part.videoCount} expert videos about the ${part.name.toLowerCase()}.`,
      type: "article",
      siteName: "NuradiHealth",
    },
  };
}

export function generateStaticParams() {
  return bodyParts.map((p) => ({ id: p.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
