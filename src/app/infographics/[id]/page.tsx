import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { INFOGRAPHICS } from "@/data/infographics-data";
import { InfographicCard } from "@/components/infographic-card";
import { InfographicShareButtons } from "@/components/infographic-share-buttons";
import { SchemaMarkup } from "@/components/schema-markup";
import { medicalConditionSchema, faqPageSchema } from "@/lib/schema";

const BASE_URL = "https://www.nuradi.co.in";

export function generateStaticParams() {
  return INFOGRAPHICS.map((i) => ({ id: String(i.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = INFOGRAPHICS.find((i) => String(i.id) === id);
  if (!item) return { title: "Not Found" };

  const title = `${item.disease} — 6 Health Tips | NuradiHealth`;
  const description = `Quick, actionable tips for ${item.disease}: ${item.tips
    .slice(0, 3)
    .map((t) => t.text)
    .join(", ")}, and more. Evidence-based health guidance.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/infographics/${id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function InfographicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = INFOGRAPHICS.find((i) => String(i.id) === id);
  if (!item) notFound();

  const related = INFOGRAPHICS.filter(
    (i) => i.category === item.category && i.id !== item.id
  ).slice(0, 4);

  const currentIndex = INFOGRAPHICS.findIndex((i) => i.id === item.id);
  const prev = currentIndex > 0 ? INFOGRAPHICS[currentIndex - 1] : null;
  const next =
    currentIndex < INFOGRAPHICS.length - 1
      ? INFOGRAPHICS[currentIndex + 1]
      : null;

  const shareUrl = `${BASE_URL}/infographics/${id}`;

  const schemaData = [
    medicalConditionSchema({
      disease: item.disease,
      category: item.categoryLabel,
      tips: item.tips,
      id: item.id,
    }),
    faqPageSchema(
      item.tips.map((t) => ({
        q: `What's a key tip for ${item.disease}?`,
        a: t.text,
      }))
    ),
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <SchemaMarkup data={schemaData} />
      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8 lg:px-12">
        <Link
          href="/infographics"
          className="inline-flex items-center gap-1.5 text-sm text-black/60 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all infographics
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <InfographicCard data={item} />
          </div>

          <div>
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white mb-4"
              style={{ backgroundColor: item.color }}
            >
              {item.categoryLabel}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              {item.disease}
            </h1>
            <p className="text-black/60 leading-relaxed mb-6">
              Here are {item.tips.length} evidence-based tips to help prevent,
              manage, or better understand {item.disease.toLowerCase()}. These
              are educational guidelines — always consult a qualified healthcare
              professional for personalized advice.
            </p>

            <div className="space-y-3 mb-8">
              {item.tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-black/5"
                >
                  <span className="text-2xl flex-shrink-0">{tip.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-black">
                      {tip.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <InfographicShareButtons
              url={shareUrl}
              title={`${item.disease} — 6 Health Tips`}
            />
          </div>
        </div>

        <div className="mt-10 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-sm text-black/70">
          <strong className="text-black">Medical disclaimer:</strong> This
          content is for educational purposes only and is not a substitute for
          professional medical advice, diagnosis, or treatment. Always seek
          guidance from a qualified healthcare provider.
        </div>

        <div className="mt-10 flex items-center justify-between border-t pt-6">
          {prev ? (
            <Link
              href={`/infographics/${prev.id}`}
              className="flex items-center gap-2 text-sm text-black/70 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>
                <span className="block text-xs text-black/50">Previous</span>
                {prev.disease}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/infographics/${next.id}`}
              className="flex items-center gap-2 text-sm text-black/70 hover:text-black transition-colors text-right"
            >
              <span>
                <span className="block text-xs text-black/50">Next</span>
                {next.disease}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">
              More from {item.categoryLabel}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link key={r.id} href={`/infographics/${r.id}`}>
                  <InfographicCard data={r} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
