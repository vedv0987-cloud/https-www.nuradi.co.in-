import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COMPARISONS } from "@/data/comparisons";
import type { Metadata } from "next";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comp = COMPARISONS.find((c) => c.slug === slug);
  if (!comp) return { title: "Not Found" };
  return {
    title: `${comp.a} vs ${comp.b} — Which is Healthier? | NuradiHealth`,
    description: comp.verdict,
  };
}

export default async function ComparisonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = COMPARISONS.find((c) => c.slug === slug);
  if (!comp) notFound();

  const aWins = comp.metrics.filter((m) => m.winner === "a").length;
  const bWins = comp.metrics.filter((m) => m.winner === "b").length;
  const ties = comp.metrics.filter((m) => m.winner === "tie").length;
  const winner = aWins > bWins ? "a" : bWins > aWins ? "b" : "tie";

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/compare" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> All comparisons
        </Link>

        {/* Header */}
        <div className="rounded-2xl border bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30 p-6 mb-6">
          <div className="text-center text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-2">
            🥊 Health Face-Off
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 text-center">
              <div className="text-5xl mb-2">{comp.emoji_a}</div>
              <h2 className="text-lg font-bold">{comp.a}</h2>
            </div>
            <div className="text-2xl font-extrabold text-rose-600">VS</div>
            <div className="flex-1 text-center">
              <div className="text-5xl mb-2">{comp.emoji_b}</div>
              <h2 className="text-lg font-bold">{comp.b}</h2>
            </div>
          </div>
        </div>

        {/* Metrics table */}
        <div className="rounded-2xl border bg-card overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">Metric</th>
                <th className="text-center px-4 py-3 font-bold">{comp.a}</th>
                <th className="text-center px-4 py-3 font-bold">{comp.b}</th>
              </tr>
            </thead>
            <tbody>
              {comp.metrics.map((m, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="px-4 py-3 font-semibold text-xs">{m.label}</td>
                  <td className={`text-center px-4 py-3 ${m.winner === "a" ? "bg-emerald-50 dark:bg-emerald-950/20 font-bold text-emerald-700 dark:text-emerald-400" : ""}`}>
                    {m.winner === "a" && "✓ "}{m.a}
                  </td>
                  <td className={`text-center px-4 py-3 ${m.winner === "b" ? "bg-emerald-50 dark:bg-emerald-950/20 font-bold text-emerald-700 dark:text-emerald-400" : ""}`}>
                    {m.winner === "b" && "✓ "}{m.b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Verdict */}
        <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-2">🏆 Verdict</p>
          <p className="text-2xl font-extrabold mb-2">
            {winner === "a" ? `${comp.a} wins ${aWins}-${bWins}${ties ? ` (${ties} ties)` : ""}`
              : winner === "b" ? `${comp.b} wins ${bWins}-${aWins}${ties ? ` (${ties} ties)` : ""}`
              : "It's a tie!"}
          </p>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">{comp.verdict}</p>
        </div>
      </div>
    </div>
  );
}
