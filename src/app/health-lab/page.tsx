"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Scale, Flame, Droplets, HeartPulse, Percent, PieChart, Moon, Timer,
  FlaskConical, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const TOOLS = [
  { id: "bmi", name: "BMI Calculator", desc: "Instantly know your Body Mass Index and what it means", icon: Scale, gradient: "from-emerald-400 to-cyan-500", cat: "Body" },
  { id: "calories", name: "Calorie Calculator", desc: "Find exactly how many calories your body needs daily", icon: Flame, gradient: "from-orange-400 to-red-500", cat: "Nutrition" },
  { id: "water", name: "Water Intake", desc: "Calculate your perfect daily hydration target", icon: Droplets, gradient: "from-blue-400 to-indigo-500", cat: "Body" },
  { id: "heart-rate", name: "Heart Rate Zones", desc: "Discover your 5 training zones for maximum results", icon: HeartPulse, gradient: "from-rose-400 to-pink-600", cat: "Fitness" },
  { id: "body-fat", name: "Body Fat Estimator", desc: "More accurate than BMI — know your real body composition", icon: Percent, gradient: "from-amber-400 to-orange-500", cat: "Body" },
  { id: "macros", name: "Macro Calculator", desc: "Get your ideal protein, carb, and fat split for any goal", icon: PieChart, gradient: "from-green-400 to-emerald-600", cat: "Nutrition" },
  { id: "sleep", name: "Sleep Calculator", desc: "Find the perfect bedtime based on sleep science", icon: Moon, gradient: "from-violet-400 to-purple-600", cat: "Wellness" },
  { id: "fasting", name: "Fasting Timer", desc: "Track your intermittent fasting window in real-time", icon: Timer, gradient: "from-teal-400 to-green-500", cat: "Nutrition" },
];

export default function HealthLabPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <FlaskConical className="w-4 h-4" />
          Interactive Health Tools
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Health Lab
          </span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-lg">
          Interactive tools powered by science. Every result connects you to
          expert videos.
        </p>
        <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <span className="font-semibold">8 Tools</span>
          <span>|</span>
          <span className="font-semibold">1,000+ Videos</span>
          <span>|</span>
          <span className="font-semibold">28 Channels</span>
        </div>
      </motion.div>

      {/* Tools Grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {TOOLS.map((tool, i) => {
          const ToolIcon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/health-lab/${tool.id}`}
                className="group block p-6 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                  <div className={`w-full h-full rounded-bl-full bg-gradient-to-br ${tool.gradient}`} />
                </div>
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${tool.gradient} flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ToolIcon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-base group-hover:text-primary transition-colors">
                        {tool.name}
                      </h2>
                      <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {tool.cat}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tool.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-3 group-hover:gap-2 transition-all">
                      Try it free <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
