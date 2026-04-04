"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BodyPart } from "@/data/body-parts";
import { ORGAN_ICONS } from "@/components/organ-icons";

export function BodyPartGrid({
  parts,
  compact = false,
}: {
  parts: BodyPart[];
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-4"
          : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      }
    >
      {parts.map((part, i) => {
        const IconComp = ORGAN_ICONS[part.id];
        return (
          <motion.div
            key={part.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href={`/body-explorer/${part.id}`}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div
                className={`${compact ? "w-16 h-16" : "w-24 h-24"} rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg relative`}
                style={{ backgroundColor: part.bg }}
              >
                {IconComp && (
                  <IconComp
                    color={part.color}
                    size={compact ? 32 : 48}
                  />
                )}
                {part.videoCount > 0 && !compact && (
                  <span
                    className="absolute -top-0.5 -right-0.5 text-[10px] font-bold text-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: part.color }}
                  >
                    {part.videoCount > 99 ? "99+" : part.videoCount}
                  </span>
                )}
              </div>
              <span
                className={`${compact ? "text-[10px]" : "text-xs"} font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight`}
              >
                {part.name}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
