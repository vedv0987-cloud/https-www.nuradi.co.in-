"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, Clock, Calendar, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

import { ARTICLES as articles } from "@/data/articles";

const categories = [
  "All",
  "Wellness",
  "Nutrition",
  "Fitness",
  "Mental Health",
  "Medical",
];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || a.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Health Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-lg text-black/60"
          >
            Evidence-based articles on health, nutrition, and wellness — written
            by medical professionals.
          </motion.p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative mb-6"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border-black/20 bg-white pl-10 text-black placeholder:text-black/40 focus-visible:ring-black"
          />
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/70 hover:bg-black/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Blog Card Grid */}
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-black/50">
            No articles found. Try a different search or category.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * (i % 6) }}
              >
                <Link href={`/blog/${article.slug}`} className="group block">
                  <div className="overflow-hidden border rounded-2xl bg-white transition-shadow hover:shadow-lg">
                    {/* Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black/5">
                      <Image
                        src={article.img}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      {/* Category Badge */}
                      <Badge className="absolute left-3 top-3 bg-black text-white hover:bg-black/80">
                        {article.category}
                      </Badge>
                    </div>

                    <div className="p-5">
                      <h2 className="text-xl font-semibold leading-tight tracking-tight group-hover:underline">
                        {article.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-black/60">
                        {article.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-xs text-black/50">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {article.date}
                          </span>
                        </div>
                        <span className="font-medium text-black/70">
                          {article.author}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-black transition-colors group-hover:text-black/70">
                        Read more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
