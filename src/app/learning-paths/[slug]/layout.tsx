import type { Metadata } from "next";
import { LEARNING_PATHS } from "@/data/learning-paths";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = LEARNING_PATHS.find((p) => p.slug === slug);
  if (!path) return { title: "Learning Path Not Found — HealthEduTV" };
  return {
    title: `${path.name} — Learning Paths — HealthEduTV`,
    description: path.description,
    openGraph: {
      title: `${path.name} — Learning Path`,
      description: path.description,
      type: "article",
      siteName: "HealthEduTV",
    },
  };
}

export function generateStaticParams() {
  return LEARNING_PATHS.map((p) => ({ slug: p.slug }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
