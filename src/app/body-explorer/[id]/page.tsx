"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Play, Clock, Eye, ChevronLeft, ChevronRight, X,
} from "lucide-react";
import bodyPartsData from "@/data/body-parts-videos.json";
import { bodyParts } from "@/data/body-parts";
import { ORGAN_ICONS } from "@/components/organ-icons";
import { cn, formatViews } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

const PER_PAGE = 24;

interface BPVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  publishedAt: string;
  channelName: string;
  channelAvatar: string;
  tags: string[];
}

export default function BodyPartPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [page, setPage] = useState(1);
  const [playingVideo, setPlayingVideo] = useState<BPVideo | null>(null);

  const bpData = (bodyPartsData as Record<string, { id: string; name: string; videoCount: number; videos: BPVideo[] }>)[id];
  const bpMeta = bodyParts.find((bp) => bp.id === id);

  if (!bpData || !bpMeta) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Body part not found</h1>
        <Link href="/body-explorer" className={cn(buttonVariants(), "mt-4")}>
          Back to Body Explorer
        </Link>
      </div>
    );
  }

  const videos = bpData.videos;
  const totalPages = Math.ceil(videos.length / PER_PAGE);
  const paged = videos.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        href="/body-explorer"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Body Explorer
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-5 mb-8"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: bpMeta.bg }}
        >
          {(() => {
            const IconComp = ORGAN_ICONS[bpMeta.id];
            return IconComp ? <IconComp color={bpMeta.color} size={48} /> : null;
          })()}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{bpMeta.name}</h1>
          <p className="text-muted-foreground mt-0.5">
            {videos.length} videos — sorted by most viewed
          </p>
        </div>
      </motion.div>

      {/* ═══ INLINE VIDEO PLAYER ═══ */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${playingVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={playingVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <div className="p-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-white font-semibold text-lg leading-tight">
                    {playingVideo.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-2">
                    {playingVideo.channelAvatar && (
                      <img
                        src={playingVideo.channelAvatar}
                        alt=""
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="text-white/70 text-sm">
                      {playingVideo.channelName}
                    </span>
                    <span className="text-white/50 text-sm">
                      {formatViews(playingVideo.views)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10 flex-shrink-0"
                  onClick={() => setPlayingVideo(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {paged.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ y: -4 }}
            >
              <button
                onClick={() => {
                  setPlayingVideo(video);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group block text-left w-full"
              >
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
                      className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                      whileHover={{ scale: 1.15 }}
                    >
                      <Play className="w-6 h-6 text-gray-900 fill-gray-900 ml-0.5" />
                    </motion.div>
                  </div>
                  {playingVideo?.youtubeId === video.youtubeId && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      NOW PLAYING
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                </div>
                <div className="mt-3 flex gap-3">
                  {video.channelAvatar && (
                    <img
                      src={video.channelAvatar}
                      alt={video.channelName}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {video.channelName}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                      <Eye className="w-3 h-3" />
                      <span>{formatViews(video.views)}</span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => {
              setPage(page - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </Button>
          <span className="text-sm text-muted-foreground px-3">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => {
              setPage(page + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Other body parts */}
      <div className="mt-16 border-t pt-10">
        <h2 className="text-xl font-bold mb-4">Explore Other Body Parts</h2>
        <div className="flex flex-wrap gap-2">
          {bodyParts
            .filter((bp) => bp.id !== id)
            .map((bp) => (
              <Link
                key={bp.id}
                href={`/body-explorer/${bp.id}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm hover:bg-muted transition-colors"
              >
                {(() => {
                  const IC = ORGAN_ICONS[bp.id];
                  return IC ? <IC color={bp.color} size={16} /> : null;
                })()}
                {bp.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
