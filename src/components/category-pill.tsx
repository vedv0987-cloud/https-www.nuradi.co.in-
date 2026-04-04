"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Category, CATEGORY_META } from "@/types";
import {
  Heart,
  Dumbbell,
  Apple,
  Brain,
  Stethoscope,
  Atom,
  Lightbulb,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Dumbbell,
  Apple,
  Brain,
  Stethoscope,
  Atom,
  Lightbulb,
};

export function CategoryPill({
  category,
  index = 0,
  active = false,
  onClick,
}: {
  category: Category;
  index?: number;
  active?: boolean;
  onClick?: () => void;
}) {
  const meta = CATEGORY_META[category];
  const Icon = ICON_MAP[meta.icon];

  const Comp = onClick ? "button" : Link;
  const props = onClick
    ? { onClick }
    : { href: `/category/${category}` as string };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      {/* @ts-expect-error - dynamic component */}
      <Comp
        {...props}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
          active
            ? "text-white shadow-md"
            : "bg-card hover:shadow-md text-foreground"
        }`}
        style={{
          borderColor: meta.color,
          ...(active
            ? { backgroundColor: meta.color }
            : {}),
        }}
      >
        {Icon && (
          <Icon
            className="w-4 h-4"
            style={{ color: active ? "white" : meta.color }}
          />
        )}
        {meta.label}
      </Comp>
    </motion.div>
  );
}
