"use client";

import { motion } from "motion/react";
import { Calculator, Info } from "lucide-react";
import { BMICalculator } from "@/components/bmi-calculator";

const BMI_RANGES = [
  { range: "< 16.0", label: "Severe Thinness", color: "#3b82f6" },
  { range: "16.0 – 17.0", label: "Moderate Thinness", color: "#60a5fa" },
  { range: "17.0 – 18.5", label: "Underweight", color: "#93c5fd" },
  { range: "18.5 – 25.0", label: "Normal Weight", color: "#22c55e" },
  { range: "25.0 – 30.0", label: "Overweight", color: "#f59e0b" },
  { range: "30.0 – 35.0", label: "Obese Class I", color: "#f97316" },
  { range: "35.0 – 40.0", label: "Obese Class II", color: "#ef4444" },
  { range: "> 40.0", label: "Obese Class III", color: "#dc2626" },
];

export default function BMIPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Calculator className="w-4 h-4" />
          Health Tool
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">BMI Calculator</h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Calculate your Body Mass Index instantly. Enter your height and weight
          to see where you stand.
        </p>
      </motion.div>

      <div className="p-6 sm:p-8 rounded-2xl border bg-card">
        <BMICalculator />
      </div>

      {/* BMI Reference Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 p-6 rounded-2xl border bg-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg">BMI Classification (WHO)</h2>
        </div>
        <div className="grid gap-2">
          {BMI_RANGES.map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between py-2 px-3 rounded-lg"
              style={{ backgroundColor: `${r.color}08` }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: r.color }}
                />
                <span className="text-sm font-medium">{r.label}</span>
              </div>
              <span className="text-sm text-muted-foreground font-mono">
                {r.range}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Source: World Health Organization (WHO) BMI classification for adults
          aged 20 and over. BMI may not be accurate for athletes, elderly, or
          pregnant individuals.
        </p>
      </motion.div>
    </div>
  );
}
