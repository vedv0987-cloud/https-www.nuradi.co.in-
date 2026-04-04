"use client";

import { motion } from "motion/react";
import { GraduationCap, FlaskConical, ShieldCheck, RefreshCw } from "lucide-react";

const CARDS = [
  { icon: GraduationCap, title: "Expert creators only", desc: "Every channel is hand-verified. Our creators are real doctors, licensed therapists, certified trainers, and PhD scientists.", stat: "28 verified channels", gradient: "from-emerald-400 to-teal-500" },
  { icon: FlaskConical, title: "Science-backed content", desc: "We only feature evidence-based channels that cite research, explain mechanisms, and correct misinformation.", stat: "1,031+ reviewed videos", gradient: "from-blue-400 to-indigo-500" },
  { icon: ShieldCheck, title: "Zero misinformation", desc: "No unverified health claims. No clickbait. No AI-generated medical advice. Every video comes from a credentialed human expert.", stat: "120+ conditions covered", gradient: "from-violet-400 to-purple-500" },
  { icon: RefreshCw, title: "Always current", desc: "New videos added weekly from all 28 channels. Our database stays fresh with the latest medical knowledge and research.", stat: "Updated every week", gradient: "from-amber-400 to-orange-500" },
];

export function WhyTrustUs() {
  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-6">Why Trust NuradiHealth</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-xl border bg-card hover:shadow-lg transition-shadow"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-sm mb-1.5">{card.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{card.desc}</p>
                <p className="text-xs font-semibold text-primary">{card.stat}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
