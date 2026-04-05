"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { getRelatedTools, getToolBySlug } from "@/lib/tools-registry";
import { webApplicationSchema } from "@/lib/schema";

interface Props {
  slug: string;
  title: string;
  description: string;
  inputs: React.ReactNode;
  result: React.ReactNode;
}

export function CalculatorShell({
  slug,
  title,
  description,
  inputs,
  result,
}: Props) {
  const tool = getToolBySlug(slug);
  const related = getRelatedTools(slug);
  const schema = webApplicationSchema({
    name: title,
    description,
    slug,
    category: tool?.category,
  });

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> All tools
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            {tool?.icon && <span className="text-4xl">{tool.icon}</span>}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {title}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              {inputs}
            </div>
          </div>
          <div>{result}</div>
        </div>

        <div className="mt-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 text-sm text-foreground/80">
          <strong>Medical disclaimer:</strong> This calculator is for
          educational purposes only and is not a substitute for professional
          medical advice, diagnosis, or treatment. Always seek guidance from a
          qualified healthcare provider.
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Try another tool</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/tools/${r.slug}`}
                  className="rounded-xl border bg-card p-4 hover:border-emerald-500/40 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {r.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
