"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  step: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  canGoNext?: boolean;
  nextLabel?: string;
  children: React.ReactNode;
}

export function StepWizard({
  step,
  totalSteps,
  onPrev,
  onNext,
  canGoNext = true,
  nextLabel,
  children,
}: Props) {
  const isLast = step === totalSteps - 1;

  return (
    <div className="flex flex-col gap-6">
      {/* Progress dots */}
      <div className="flex items-center gap-2 justify-center">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === step
                ? "w-8 bg-emerald-500"
                : i < step
                  ? "w-1.5 bg-emerald-500"
                  : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden min-h-[200px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={step === 0}
          className="gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <span className="text-xs text-muted-foreground">
          Step {step + 1} of {totalSteps}
        </span>
        <Button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {nextLabel || (isLast ? "Calculate" : "Next")}{" "}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
