import type { Metadata } from "next";
import { CATEGORY_META, Category } from "@/types";

const categories = Object.keys(CATEGORY_META) as Category[];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = CATEGORY_META[slug as Category];
  if (!meta) return { title: "Category Not Found — HealthEduTV" };
  return {
    title: `${meta.label} Videos — HealthEduTV`,
    description: meta.description,
    openGraph: {
      title: `${meta.label} — HealthEduTV`,
      description: meta.description,
      type: "website",
      siteName: "HealthEduTV",
    },
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
