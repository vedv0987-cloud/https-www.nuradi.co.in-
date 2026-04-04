"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink, CheckCircle2, PlayCircle } from "lucide-react";
import { Channel, CATEGORY_META } from "@/types";
import { cn, formatSubscribers } from "@/lib/utils";
import { videos } from "@/data/videos";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export function ChannelCard({
  channel,
  index = 0,
}: {
  channel: Channel;
  index?: number;
}) {
  const channelVideoCount = videos.filter(
    (v) => v.channelId === channel.id
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      className="group bg-card border rounded-xl p-5 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <Link href={`/channel/${channel.id}`}>
          <Image
            src={channel.avatar}
            alt={channel.name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full flex-shrink-0 ring-2 ring-transparent group-hover:ring-primary/30 transition-all"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Link
              href={`/channel/${channel.id}`}
              className="font-semibold text-base hover:text-primary transition-colors truncate"
            >
              {channel.name}
            </Link>
            {channel.verified && (
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {formatSubscribers(channel.subscriberCount)} subscribers
          </p>
          <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
            {channel.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {channel.categories.map((cat) => (
              <Link key={cat} href={`/category/${cat}`}>
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 cursor-pointer hover:opacity-80"
                  style={{
                    borderColor: CATEGORY_META[cat].color,
                    color: CATEGORY_META[cat].color,
                  }}
                >
                  {CATEGORY_META[cat].label}
                </Badge>
              </Link>
            ))}
          </div>
          {channelVideoCount > 0 && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <PlayCircle className="w-3.5 h-3.5" />
              {channelVideoCount} videos on HealthEduTV
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Link
          href={`/channel/${channel.id}`}
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "flex-1"
          )}
        >
          View Channel
        </Link>
        <a
          href={channel.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <ExternalLink className="w-3.5 h-3.5 mr-1" />
          YouTube
        </a>
      </div>
    </motion.div>
  );
}
