"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Play, Clock } from "lucide-react";
import { Video, CATEGORY_META } from "@/types";
import { channels } from "@/data/channels";
import { formatViews, timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function VideoCard({
  video,
  index = 0,
  compact = false,
}: {
  video: Video;
  index?: number;
  compact?: boolean;
}) {
  const channel = channels.find((c) => c.id === video.channelId);
  const cat = CATEGORY_META[video.category];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <Link href={`/video/${video.id}`} className="group flex gap-3">
          <div className="relative w-40 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1 py-0.5 rounded">
              {video.duration}
            </span>
          </div>
          <div className="min-w-0 flex-1 py-0.5">
            <h4 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {video.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              {channel?.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatViews(video.views)} · {timeAgo(video.publishedAt)}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/video/${video.id}`} className="group block">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-sm group-hover:shadow-xl transition-shadow duration-300">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-14 h-14 rounded-full bg-white/95 dark:bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg backdrop-blur-sm"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 text-gray-900 fill-gray-900 ml-0.5" />
            </motion.div>
          </div>
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
            <Clock className="w-3 h-3" />
            {video.duration}
          </div>
          {video.featured && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-md">
              FEATURED
            </div>
          )}
        </div>
        <div className="mt-3 flex gap-3">
          {channel && (
            <img
              src={channel.avatar}
              alt={channel.name}
              className="w-9 h-9 rounded-full flex-shrink-0 ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
              loading="lazy"
            />
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 hover:text-foreground transition-colors">
              {channel?.name}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
              <span>{formatViews(video.views)}</span>
              <span>·</span>
              <span>{timeAgo(video.publishedAt)}</span>
            </div>
            <Badge
              variant="secondary"
              className="mt-1.5 text-[10px] px-1.5 py-0 cursor-pointer hover:opacity-80"
              style={{ borderColor: cat.color, color: cat.color }}
            >
              {cat.label}
            </Badge>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
