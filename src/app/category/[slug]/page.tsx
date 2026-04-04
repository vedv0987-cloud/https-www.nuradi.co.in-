"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Heart,
  Dumbbell,
  Apple,
  Brain,
  Stethoscope,
  Atom,
  Lightbulb,
} from "lucide-react";
import { videos } from "@/data/videos";
import { channels } from "@/data/channels";
import { VideoCard } from "@/components/video-card";
import { Category, CATEGORY_META } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  Heart, Dumbbell, Apple, Brain, Stethoscope, Atom, Lightbulb,
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const category = slug as Category;
  const meta = CATEGORY_META[category];

  if (!meta) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Link href="/explore" className={cn(buttonVariants(), "mt-4")}>Browse All</Link>
      </div>
    );
  }

  const Icon = ICON_MAP[meta.icon];
  const categoryVideos = videos.filter((v) => v.category === category);
  const categoryChannels = channels.filter((c) =>
    c.categories.includes(category)
  );

  return (
    <div className="pb-16">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative py-12 mb-8"
        style={{
          background: `linear-gradient(135deg, ${meta.color}15 0%, ${meta.color}05 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${meta.color}20` }}
            >
              {Icon && (
                <Icon className="w-7 h-7" style={{ color: meta.color }} />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{meta.label}</h1>
              <p className="text-muted-foreground mt-1">{meta.description}</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {categoryVideos.length} videos · {categoryChannels.length}{" "}
                channels
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryVideos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>

        {categoryVideos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No videos in this category yet.
            </p>
          </div>
        )}

        {/* Top Channels */}
        {categoryChannels.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">
              Top Channels in {meta.label}
            </h2>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
              {categoryChannels.map((channel) => (
                <Link
                  key={channel.id}
                  href={`/channel/${channel.id}`}
                  className="flex-shrink-0 group flex flex-col items-center gap-2 w-24"
                >
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className="w-16 h-16 rounded-full border-2 border-transparent group-hover:border-primary transition-colors"
                    loading="lazy"
                  />
                  <span className="text-xs font-medium text-center line-clamp-2 group-hover:text-primary transition-colors">
                    {channel.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
