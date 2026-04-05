"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Tag, Filter } from "lucide-react";
import { affiliateProducts, AffiliateProduct } from "@/lib/affiliateMap";
import AffiliateCard from "@/components/affiliate/AffiliateCard";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { key: "all", label: "All Products" },
  { key: "health", label: "Health" },
  { key: "fitness", label: "Fitness" },
  { key: "nutrition", label: "Nutrition" },
  { key: "mental-health", label: "Mental Health" },
  { key: "medical", label: "Medical" },
  { key: "science", label: "Science" },
  { key: "personal-dev", label: "Personal Dev" },
];

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allProducts: (AffiliateProduct & { categoryKey: string })[] = Object.entries(affiliateProducts).flatMap(
    ([key, products]) => products.map((p) => ({ ...p, categoryKey: key }))
  );

  const filtered = activeCategory === "all"
    ? allProducts
    : allProducts.filter((p) => p.categoryKey === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-12 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-4">
            <Tag className="w-3 h-3" />
            Recommended Products
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
            Deals & Recommendations
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked health and wellness products that we genuinely recommend. Some links are affiliate — your support keeps NuradiHealth free.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold transition-all",
                activeCategory === cat.key
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-[#1a1a1a]"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <AffiliateCard product={product} source="deals-page" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Affiliate Disclosure */}
        <div className="max-w-3xl mx-auto">
          <AffiliateDisclosure variant="footer" />
        </div>
      </div>
    </div>
  );
}
