import type { Metadata } from "next";
import { DISEASE_CATEGORIES } from "@/data/disease-categories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = DISEASE_CATEGORIES[category];
  if (!cat) return { title: "Category Not Found — HealthEduTV" };
  return {
    title: `${cat.label} Conditions — Health A-Z — HealthEduTV`,
    description: `Browse all ${cat.label.toLowerCase()} health conditions with expert videos and information.`,
    openGraph: {
      title: `${cat.label} — Health A-Z`,
      description: `Browse ${cat.label.toLowerCase()} conditions on HealthEduTV.`,
      type: "website",
      siteName: "HealthEduTV",
    },
  };
}

export function generateStaticParams() {
  return Object.keys(DISEASE_CATEGORIES).map((c) => ({ category: c }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
