"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Search, FileQuestion } from "lucide-react";
import { videos } from "@/data/videos";
import { channels } from "@/data/channels";
import { VideoCard } from "@/components/video-card";
import { ChannelCard } from "@/components/channel-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [tab, setTab] = useState<"videos" | "channels">("videos");

  const filteredVideos = useMemo(() => {
    if (!query.trim()) return [];
    const terms = query.toLowerCase().split(" ").filter((t) => t.length > 1);
    return videos
      .map((v) => {
        const channel = channels.find((c) => c.id === v.channelId);
        const title = v.title.toLowerCase();
        const searchable = [title, v.description, v.category, channel?.name || "", ...v.tags].join(" ").toLowerCase();
        let score = 0;
        terms.forEach((t) => {
          if (title.includes(t)) score += 3;
          else if (searchable.includes(t)) score += 1;
        });
        return { video: v, score };
      })
      .filter((r) => r.score >= Math.min(terms.length, 2))
      .sort((a, b) => b.score - a.score || b.video.views - a.video.views)
      .slice(0, 60)
      .map((r) => r.video);
  }, [query]);

  const filteredChannels = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return channels.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.categories.some((cat) => cat.includes(q))
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto mb-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos, channels, topics..."
            className="pl-12 h-12 text-lg"
            autoFocus
          />
        </form>
      </motion.div>

      {query.trim() && (
        <>
          {/* Result count */}
          <p className="text-sm text-muted-foreground mb-4">
            Found {filteredVideos.length} videos and {filteredChannels.length}{" "}
            channels for &ldquo;{query}&rdquo;
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={tab === "videos" ? "default" : "outline"}
              size="sm"
              onClick={() => setTab("videos")}
            >
              Videos ({filteredVideos.length})
            </Button>
            <Button
              variant={tab === "channels" ? "default" : "outline"}
              size="sm"
              onClick={() => setTab("channels")}
            >
              Channels ({filteredChannels.length})
            </Button>
          </div>

          {/* Results */}
          {tab === "videos" ? (
            filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos.map((video, i) => (
                  <VideoCard key={video.id} video={video} index={i} />
                ))}
              </div>
            ) : (
              <EmptyState query={query} />
            )
          ) : filteredChannels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredChannels.map((channel, i) => (
                <ChannelCard key={channel.id} channel={channel} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState query={query} />
          )}
        </>
      )}

      {!query.trim() && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg">Start typing to search</p>
          <p className="text-sm mt-2">
            Try: yoga, anxiety, brain, workout, nutrition, physics
          </p>
        </div>
      )}
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="text-center py-16">
      <FileQuestion className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
      <p className="text-lg text-muted-foreground">
        No results for &ldquo;{query}&rdquo;
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        Try different keywords or browse categories
      </p>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="h-12 bg-muted rounded-lg animate-pulse max-w-2xl mx-auto" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
