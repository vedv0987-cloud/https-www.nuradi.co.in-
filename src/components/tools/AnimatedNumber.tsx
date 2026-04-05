"use client";

import { useEffect } from "react";
import { useSpring, useTransform, motion } from "motion/react";

interface Props {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}

export function AnimatedNumber({
  value,
  duration = 1.5,
  format = (n) => Math.round(n).toLocaleString("en-IN"),
  className,
}: Props) {
  const spring = useSpring(0, {
    stiffness: 60,
    damping: 15,
    duration: duration * 1000,
  });
  const display = useTransform(spring, (n) => format(n));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
}
