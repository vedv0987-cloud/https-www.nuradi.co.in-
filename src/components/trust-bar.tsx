"use client";

import { motion } from "motion/react";
import { BadgeCheck, Play, Stethoscope, FlaskConical, ShieldCheck, RefreshCw } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const STATS = [
  { icon: BadgeCheck, value: 28, label: "Verified Channels", suffix: "", color: "#22c55e" },
  { icon: Play, value: 1031, label: "Expert Videos", suffix: "+", color: "#3b82f6" },
  { icon: Stethoscope, value: 120, label: "Conditions Covered", suffix: "+", color: "#8b5cf6" },
  { icon: FlaskConical, value: 100, label: "Science-Backed", suffix: "%", color: "#f59e0b" },
  { icon: ShieldCheck, value: 0, label: "Misinformation", suffix: "", color: "#ef4444" },
  { icon: RefreshCw, value: 0, label: "Updated Weekly", suffix: "", isText: true, textValue: "Weekly", color: "#06b6d4" },
];

function AnimatedNumber({ target, suffix, isText, textValue }: { target: number; suffix: string; isText?: boolean; textValue?: string }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || isText) return;
    const duration = 1200;
    const start = performance.now();
    function animate(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = p * (2 - p);
      setCount(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [visible, target, isText]);

  return <span ref={ref} className="text-lg font-bold">{isText ? textValue : `${count.toLocaleString()}${suffix}`}</span>;
}

export function TrustBar() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2 -mx-4 px-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border bg-card flex-shrink-0 min-w-[150px]"
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ color: stat.color }} />
              <div>
                <AnimatedNumber target={stat.value} suffix={stat.suffix} isText={stat.isText} textValue={stat.textValue} />
                <p className="text-[10px] text-muted-foreground leading-tight">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
