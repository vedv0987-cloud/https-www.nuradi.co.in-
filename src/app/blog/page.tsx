"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, Calendar, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  img: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "10 Signs You're Dehydrated",
    excerpt:
      "Dehydration sneaks up on you faster than you think. From persistent headaches to dark urine, learn the warning signs your body sends when it desperately needs more water.",
    category: "Wellness",
    readTime: "4 min read",
    date: "March 28, 2026",
    author: "Dr. Priya Sharma",
    img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
  },
  {
    id: 2,
    title: "The Truth About Intermittent Fasting",
    excerpt:
      "Intermittent fasting has taken the wellness world by storm, but does it really work? We break down the science, the myths, and who should avoid it entirely.",
    category: "Nutrition",
    readTime: "7 min read",
    date: "March 25, 2026",
    author: "Dr. Arjun Mehta",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
  },
  {
    id: 3,
    title: "Why Walking 10,000 Steps Actually Matters",
    excerpt:
      "The 10,000-step goal isn't just a marketing gimmick. Recent studies reveal that consistent daily walking reduces cardiovascular risk by up to 30% and boosts mental clarity.",
    category: "Fitness",
    readTime: "5 min read",
    date: "March 22, 2026",
    author: "Dr. Sneha Kulkarni",
    img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
  },
  {
    id: 4,
    title: "Indian Superfoods You Should Eat Daily",
    excerpt:
      "From turmeric to amla, India's traditional kitchen holds powerful superfoods backed by modern science. Discover which staples can transform your daily health.",
    category: "Nutrition",
    readTime: "6 min read",
    date: "March 19, 2026",
    author: "Dr. Kavita Desai",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
  },
  {
    id: 5,
    title: "How Stress Affects Your Body",
    excerpt:
      "Chronic stress does far more than ruin your mood. It silently damages your heart, gut, and immune system. Here's what happens inside when stress goes unchecked.",
    category: "Mental Health",
    readTime: "6 min read",
    date: "March 16, 2026",
    author: "Dr. Rohan Patel",
    img: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=800&q=80",
  },
  {
    id: 6,
    title: "Sleep Hygiene: The Complete Guide",
    excerpt:
      "Poor sleep is linked to obesity, depression, and heart disease. Master the art of sleep hygiene with these evidence-based strategies for deeper, more restorative rest every night.",
    category: "Wellness",
    readTime: "8 min read",
    date: "March 13, 2026",
    author: "Dr. Ananya Rao",
    img: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=800&q=80",
  },
  {
    id: 7,
    title: "Understanding Your Blood Test Results",
    excerpt:
      "CBC, lipid panel, HbA1c — blood tests can be confusing. This plain-language guide helps you decode your reports and understand what each number means for your health.",
    category: "Medical",
    readTime: "9 min read",
    date: "March 10, 2026",
    author: "Dr. Vikram Singh",
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80",
  },
  {
    id: 8,
    title: "The Science Behind Yoga Benefits",
    excerpt:
      "Yoga isn't just stretching — it rewires your nervous system. New research shows how regular practice reduces inflammation, lowers cortisol, and improves gene expression.",
    category: "Fitness",
    readTime: "6 min read",
    date: "March 7, 2026",
    author: "Dr. Meera Iyer",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
  },
  {
    id: 9,
    title: "How to Start Meditating Today",
    excerpt:
      "Meditation doesn't require hours of silence or a mountain retreat. Start with just five minutes a day using these simple, beginner-friendly techniques that actually stick.",
    category: "Mental Health",
    readTime: "5 min read",
    date: "March 4, 2026",
    author: "Dr. Aditya Nair",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  },
  {
    id: 10,
    title: "Managing Diabetes with Indian Diet",
    excerpt:
      "You don't need to abandon roti and rice. Learn how to manage blood sugar effectively with smart Indian meal planning, portion control, and traditional ingredients.",
    category: "Nutrition",
    readTime: "7 min read",
    date: "March 1, 2026",
    author: "Dr. Priya Sharma",
    img: "https://images.unsplash.com/photo-1505576399279-0d754c0d8953?w=800&q=80",
  },
  {
    id: 11,
    title: "Heart Health After 40: What to Know",
    excerpt:
      "After 40, your cardiovascular risk increases significantly. From cholesterol management to exercise routines, here's your essential guide to keeping your heart strong.",
    category: "Medical",
    readTime: "7 min read",
    date: "February 26, 2026",
    author: "Dr. Vikram Singh",
    img: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80",
  },
  {
    id: 12,
    title: "Is Your BMI Actually Accurate?",
    excerpt:
      "BMI has been the go-to health metric for decades, but it has serious flaws. Discover why body composition, waist circumference, and other measures tell a better story.",
    category: "Wellness",
    readTime: "5 min read",
    date: "February 23, 2026",
    author: "Dr. Arjun Mehta",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
  },
  {
    id: 13,
    title: "5 Exercises for Lower Back Pain",
    excerpt:
      "Lower back pain affects 80% of adults at some point. These five physiotherapist-approved exercises can relieve pain, strengthen your core, and prevent future episodes.",
    category: "Fitness",
    readTime: "5 min read",
    date: "February 20, 2026",
    author: "Dr. Sneha Kulkarni",
    img: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80",
  },
  {
    id: 14,
    title: "Mental Health in the Digital Age",
    excerpt:
      "Social media, constant notifications, and information overload are reshaping our mental health. Learn practical strategies to protect your mind in an always-connected world.",
    category: "Mental Health",
    readTime: "6 min read",
    date: "February 17, 2026",
    author: "Dr. Rohan Patel",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  },
  {
    id: 15,
    title: "Pregnancy Nutrition Guide for Indian Women",
    excerpt:
      "From folate-rich greens to iron-packed lentils, Indian cuisine offers everything a pregnant woman needs. This trimester-by-trimester guide ensures optimal nutrition for mother and baby.",
    category: "Nutrition",
    readTime: "8 min read",
    date: "February 14, 2026",
    author: "Dr. Kavita Desai",
    img: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&q=80",
  },
  {
    id: 16,
    title: "How to Read Food Labels in India",
    excerpt:
      "FSSAI regulations require specific labelling, but most people ignore the fine print. Learn to spot hidden sugars, misleading claims, and harmful additives on Indian food packages.",
    category: "Nutrition",
    readTime: "6 min read",
    date: "February 11, 2026",
    author: "Dr. Ananya Rao",
    img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
  },
  {
    id: 17,
    title: "The Gut-Brain Connection Explained",
    excerpt:
      "Your gut is your second brain. Emerging research reveals how the trillions of bacteria in your digestive system directly influence your mood, memory, and mental health.",
    category: "Medical",
    readTime: "7 min read",
    date: "February 8, 2026",
    author: "Dr. Meera Iyer",
    img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80",
  },
  {
    id: 18,
    title: "Why Generic Medicines Are Safe",
    excerpt:
      "Generic drugs contain the same active ingredients as branded ones and undergo rigorous testing. Understanding bioequivalence can save you money without compromising your health.",
    category: "Medical",
    readTime: "5 min read",
    date: "February 5, 2026",
    author: "Dr. Aditya Nair",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
  },
  {
    id: 19,
    title: "Building Immunity Naturally",
    excerpt:
      "Skip the expensive supplements. From vitamin C-rich amla to probiotic-packed curd, these natural immunity boosters from your kitchen are backed by real scientific evidence.",
    category: "Wellness",
    readTime: "6 min read",
    date: "February 2, 2026",
    author: "Dr. Priya Sharma",
    img: "https://images.unsplash.com/photo-1610348725531-acac70e5fe4c?w=800&q=80",
  },
  {
    id: 20,
    title: "Screen Time and Your Health",
    excerpt:
      "Excessive screen time causes more than eye strain. It disrupts sleep cycles, increases anxiety, and contributes to sedentary lifestyles. Here's how to set healthy digital boundaries.",
    category: "Wellness",
    readTime: "5 min read",
    date: "January 30, 2026",
    author: "Dr. Rohan Patel",
    img: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80",
  },
];

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
                <Link href="#" className="group block">
                  <Card className="overflow-hidden border-black/10 bg-white transition-shadow hover:shadow-lg">
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

                    <CardContent className="p-5">
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
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
