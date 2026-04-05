import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { ARTICLES } from "@/data/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found — NuradiHealth" };

  return {
    title: `${article.title} — NuradiHealth Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.img, width: 1200, height: 630 }],
      type: "article",
      siteName: "NuradiHealth",
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.img],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const currentIndex = ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  // Related articles: same category, excluding current
  const relatedArticles = ARTICLES
    .filter((a) => a.category === article.category && a.slug !== slug)
    .slice(0, 3);

  return (
    <article className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a1a1a] mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all articles
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider mb-4">
          {article.category}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">{article.excerpt}</p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <span className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-xs font-bold">
              {article.author.charAt(0)}
            </span>
            <span className="font-semibold text-gray-700">{article.author}</span>
          </div>
          <span className="text-gray-300">·</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {article.date}
          </div>
          <span className="text-gray-300">·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-10 bg-gray-100">
        <Image src={article.img} alt={article.title} fill sizes="(max-width: 1100px) 100vw, 1100px" className="object-cover" priority />
      </div>

      {/* Article body */}
      <div className="prose prose-lg max-w-none">
        {article.content.map((paragraph, i) => {
          // Render paragraphs with **bold** markdown support
          const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p key={i} className="text-gray-700 leading-relaxed mb-5 text-[17px]">
              {parts.map((part, j) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={j} className="font-bold text-[#1a1a1a]">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={j}>{part}</span>;
              })}
            </p>
          );
        })}
      </div>

      {/* Share + disclaimer */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Share this article</p>
            <div className="flex items-center gap-2 mt-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://www.nuradi.co.in/blog/${article.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-semibold text-[#1a1a1a] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.nuradi.co.in/blog/${article.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-semibold text-[#1a1a1a] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                LinkedIn
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${article.title} — https://www.nuradi.co.in/blog/${article.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-semibold text-[#1a1a1a] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>Medical disclaimer:</strong> This article is for informational purposes only and does not replace professional medical advice. Always consult your doctor for specific health concerns.
          </p>
        </div>
      </div>

      {/* Prev / Next navigation */}
      {(prevArticle || nextArticle) && (
        <nav className="mt-12 grid sm:grid-cols-2 gap-4 pt-8 border-t border-gray-100">
          {prevArticle ? (
            <Link
              href={`/blog/${prevArticle.slug}`}
              className="group block p-5 border border-gray-200 rounded-2xl hover:border-[#1a1a1a] transition-colors"
            >
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                <ArrowLeft className="w-3 h-3" /> Previous
              </div>
              <p className="font-semibold text-[#1a1a1a] leading-snug line-clamp-2 group-hover:text-gray-800">{prevArticle.title}</p>
            </Link>
          ) : <div />}
          {nextArticle ? (
            <Link
              href={`/blog/${nextArticle.slug}`}
              className="group block p-5 border border-gray-200 rounded-2xl hover:border-[#1a1a1a] transition-colors text-right"
            >
              <div className="flex items-center justify-end gap-1 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Next <ArrowRight className="w-3 h-3" />
              </div>
              <p className="font-semibold text-[#1a1a1a] leading-snug line-clamp-2 group-hover:text-gray-800">{nextArticle.title}</p>
            </Link>
          ) : <div />}
        </nav>
      )}

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-8 border-t border-gray-100">
          <h2 className="text-2xl font-black tracking-tight mb-6">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group block overflow-hidden border border-gray-100 rounded-2xl hover:border-[#1a1a1a] transition-colors"
              >
                <div className="relative aspect-[16/9] bg-gray-100">
                  <Image src={a.img} alt={a.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {a.category} · {a.readTime}
                  </div>
                  <h3 className="font-bold text-[#1a1a1a] leading-tight line-clamp-2 group-hover:text-gray-800">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
