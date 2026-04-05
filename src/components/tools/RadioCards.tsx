"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface RadioOption<T extends string | number> {
  value: T;
  label: string;
  description?: string;
  icon?: string;
}

interface Props<T extends string | number> {
  options: RadioOption<T>[];
  value: T | null;
  onChange: (v: T) => void;
  columns?: 1 | 2 | 3;
  className?: string;
}

export function RadioCards<T extends string | number>({
  options,
  value,
  onChange,
  columns = 1,
  className,
}: Props<T>) {
  const gridClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-3";

  return (
    <div className={cn("grid gap-3", gridClass, className)}>
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <motion.button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-start gap-3 text-left rounded-xl border-2 p-4 transition-all",
              selected
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                : "border-border bg-card hover:border-emerald-500/40"
            )}
          >
            {opt.icon && (
              <span className="text-2xl flex-shrink-0 leading-none">
                {opt.icon}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-sm font-semibold",
                  selected && "text-emerald-700 dark:text-emerald-400"
                )}
              >
                {opt.label}
              </p>
              {opt.description && (
                <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
                  {opt.description}
                </p>
              )}
            </div>
            <div
              className={cn(
                "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors",
                selected
                  ? "border-emerald-500 bg-emerald-500"
                  : "border-border"
              )}
            >
              {selected && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
