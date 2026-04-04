"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { channels } from "@/data/channels";
import { ChannelCard } from "@/components/channel-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortBy = "popular" | "videos" | "name";

export default function ChannelsPage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("popular");

  const filtered = useMemo(() => {
    let result = channels.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );

    if (sortBy === "popular") {
      result.sort((a, b) => b.subscriberCount - a.subscriberCount);
    } else if (sortBy === "videos") {
      result.sort((a, b) => b.videoCount - a.videoCount);
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [query, sortBy]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-2">Channels</h1>
        <p className="text-muted-foreground mb-6">
          Verified health and education creators
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search channels..."
            className="pl-9"
          />
        </div>
        <Select
          value={sortBy}
          onValueChange={(v) => setSortBy(v as SortBy)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="videos">Most Videos</SelectItem>
            <SelectItem value="name">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((channel, i) => (
          <ChannelCard key={channel.id} channel={channel} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No channels found</p>
        </div>
      )}
    </div>
  );
}
