import type { Metadata } from "next";
import diseasesData from "@/data/diseases.json";

const diseases = diseasesData as { slug: string; name: string; overview: string; category: string }[];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const disease = diseases.find((d) => d.slug === slug);
  if (!disease) return { title: "Condition Not Found — HealthEduTV" };
  return {
    title: `${disease.name} — Health A-Z — HealthEduTV`,
    description: disease.overview.slice(0, 160),
    openGraph: {
      title: `${disease.name} — HealthEduTV`,
      description: disease.overview.slice(0, 160),
      type: "article",
      siteName: "HealthEduTV",
    },
  };
}

export function generateStaticParams() {
  return diseases.map((d) => ({ slug: d.slug }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
