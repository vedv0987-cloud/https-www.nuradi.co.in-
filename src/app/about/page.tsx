"use client";

import { motion } from "motion/react";
import {
  Shield,
  Users,
  Tv,
  Heart,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Verified Creators Only",
    description:
      "Every channel is hand-picked and verified. We only feature creators with genuine expertise and credentials.",
  },
  {
    icon: Users,
    title: "Community Curated",
    description:
      "Our editorial team reviews content to ensure accuracy, quality, and relevance to health and education.",
  },
  {
    icon: Tv,
    title: "Distraction-Free",
    description:
      "No algorithmic rabbit holes. Just clean, organized content designed for intentional learning.",
  },
  {
    icon: Heart,
    title: "Free & Open",
    description:
      "All videos are free to watch. We link directly to YouTube creators so they get the views they deserve.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          About NuradiHealth
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Trusted knowledge,
          <br />
          <span className="text-primary">beautifully organized.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-[1000px] mx-auto">
          NuradiHealth is a curated video discovery platform that brings together
          the best health and education content from verified YouTube creators.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-muted/50 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          In a world of information overload, finding reliable health and
          education content shouldn&apos;t be a gamble. We curate videos from
          doctors, scientists, therapists, and educators who have the credentials
          and track record to be trusted. No clickbait. No misinformation. Just
          evidence-based knowledge presented beautifully.
        </p>
      </motion.div>

      {/* Features */}
      <div className="grid sm:grid-cols-2 gap-6">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl border bg-card"
          >
            <feature.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* How We Curate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold">How We Curate</h2>
        <div className="space-y-3">
          {[
            "Channel must have verifiable credentials (medical degree, certifications, academic affiliation)",
            "Content is reviewed for scientific accuracy and responsible health messaging",
            "No pseudoscience, conspiracy theories, or unproven miracle cures",
            "Videos must be well-produced and genuinely educational",
            "Channels must have a consistent track record of quality content",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Credits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground border-t pt-8"
      >
        <p>
          Built by <span className="font-semibold text-foreground">Realatte AI</span>{" "}
          · All videos belong to their respective YouTube creators.
        </p>
      </motion.div>
    </div>
  );
}
