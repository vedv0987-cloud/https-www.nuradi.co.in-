"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  CheckCircle2,
  Calendar,
  Eye,
  ChevronRight,
  ChevronDown,
  Clock,
  Share2,
  ThumbsUp,
  Bookmark,
} from "lucide-react";
import { videos } from "@/data/videos";
import { channels } from "@/data/channels";
import { VideoCard } from "@/components/video-card";
import { CATEGORY_META } from "@/types";
import { cn, formatViews, timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const video = videos.find((v) => v.id === id);
  const [descOpen, setDescOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareMsg, setShareMsg] = useState(false);

  if (!video) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Video not found</h1>
        <Link href="/explore" className={cn(buttonVariants(), "mt-4")}>
          Browse Videos
        </Link>
      </div>
    );
  }

  const channel = channels.find((c) => c.id === video.channelId);
  const cat = CATEGORY_META[video.category];
  const relatedVideos = videos
    .filter((v) => v.id !== video.id && v.category === video.category)
    .slice(0, 6);
  const channelVideos = videos
    .filter((v) => v.id !== video.id && v.channelId === video.channelId)
    .slice(0, 4);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMsg(true);
      setTimeout(() => setShareMsg(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* ───── MAIN CONTENT ───── */}
        <div className="space-y-5">
          {/* YouTube Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden shadow-xl bg-black"
          >
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1&autoplay=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </motion.div>

          {/* Title & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">
              {video.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {formatViews(video.views)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {timeAgo(video.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant={liked ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLiked(!liked)}
                  className="gap-1.5"
                >
                  <ThumbsUp
                    className={cn("w-4 h-4", liked && "fill-current")}
                  />
                  {liked ? "Liked" : "Like"}
                </Button>
                <Button
                  variant={saved ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSaved(!saved)}
                  className="gap-1.5"
                >
                  <Bookmark
                    className={cn("w-4 h-4", saved && "fill-current")}
                  />
                  {saved ? "Saved" : "Save"}
                </Button>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <AnimatePresence>
                    {shareMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap"
                      >
                        Link copied!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          <Separator />

          {/* Channel Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            {channel && (
              <div className="flex items-center justify-between gap-4">
                <Link
                  href={`/channel/${channel.id}`}
                  className="flex items-center gap-3 group flex-1 min-w-0"
                >
                  <Image
                    src={channel.avatar}
                    alt={channel.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold group-hover:text-primary transition-colors truncate">
                        {channel.name}
                      </span>
                      {channel.verified && (
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {(channel.subscriberCount / 1_000_000).toFixed(1)}M
                      subscribers
                    </span>
                  </div>
                </Link>
                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href={channel.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "gap-1.5"
                    )}
                  >
                    <ExternalLink className="w-4 h-4 text-red-500" />
                    Subscribe
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-muted/50 rounded-xl p-4 cursor-pointer hover:bg-muted/70 transition-colors"
            onClick={() => setDescOpen(!descOpen)}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="flex flex-wrap gap-1.5">
                <Badge
                  className="text-[10px]"
                  style={{ borderColor: cat.color, color: cat.color }}
                >
                  {cat.label}
                </Badge>
                {video.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <p
              className={cn(
                "text-sm leading-relaxed transition-all",
                !descOpen && "line-clamp-2"
              )}
            >
              {video.description}
            </p>
            <button className="flex items-center gap-1 text-xs font-medium text-primary mt-2">
              {descOpen ? "Show less" : "Show more"}
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform",
                  descOpen && "rotate-180"
                )}
              />
            </button>
          </motion.div>

          {/* Watch on YouTube */}
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full gap-2 justify-center"
            )}
          >
            <ExternalLink className="w-4 h-4" />
            Watch on YouTube
          </a>

          {/* More from Channel */}
          {channelVideos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">
                  More from {channel?.name}
                </h2>
                {channel && (
                  <Link
                    href={`/channel/${channel.id}`}
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    View all <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {channelVideos.map((v, i) => (
                  <VideoCard key={v.id} video={v} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* ───── SIDEBAR ───── */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-bold sticky top-20 bg-background py-2 z-10">
            Related Videos
          </h2>
          <div className="space-y-3">
            {relatedVideos.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} compact />
            ))}
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
