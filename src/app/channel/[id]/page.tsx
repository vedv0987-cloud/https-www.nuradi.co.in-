"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { channels } from "@/data/channels";
import { videos } from "@/data/videos";
import { VideoCard } from "@/components/video-card";
import { CATEGORY_META } from "@/types";
import { cn, formatSubscribers } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export default function ChannelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const channel = channels.find((c) => c.id === id);

  if (!channel) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Channel not found</h1>
        <Link href="/channels" className={cn(buttonVariants(), "mt-4")}>Browse Channels</Link>
      </div>
    );
  }

  const channelVideos = videos.filter((v) => v.channelId === channel.id);

  return (
    <div className="pb-16">
      {/* Channel Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-muted/30 border-b py-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Image
              src={channel.avatar}
              alt={channel.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{channel.name}</h1>
                {channel.verified && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
              </div>
              <p className="text-muted-foreground mt-1 max-w-lg">
                {channel.description}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>
                  {formatSubscribers(channel.subscriberCount)} subscribers
                </span>
                <span>{channel.videoCount} videos</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {channel.categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="text-xs"
                    style={{
                      borderColor: CATEGORY_META[cat].color,
                      color: CATEGORY_META[cat].color,
                    }}
                  >
                    {CATEGORY_META[cat].label}
                  </Badge>
                ))}
              </div>
            </div>
            <a
              href={channel.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              YouTube Channel
            </a>
          </div>
        </div>
      </motion.div>

      {/* Videos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <h2 className="text-xl font-bold mb-6">
          Videos ({channelVideos.length})
        </h2>
        {channelVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {channelVideos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-12">
            No videos from this channel yet.
          </p>
        )}
      </div>
    </div>
  );
}
