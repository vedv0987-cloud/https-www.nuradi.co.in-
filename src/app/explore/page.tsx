"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { videos } from "@/data/videos";
import { VideoCard } from "@/components/video-card";
import { Category, CATEGORY_META } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Duration = "all" | "short" | "medium" | "long";
type SortBy = "trending" | "newest" | "views";
const PER_PAGE = 24;

function parseDuration(d: string): number {
  const parts = d.split(":").map(Number);
  return parts.length === 3
    ? parts[0] * 3600 + parts[1] * 60 + parts[2]
    : parts[0] * 60 + parts[1];
}

export default function ExplorePage() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [duration, setDuration] = useState<Duration>("all");
  const [sortBy, setSortBy] = useState<SortBy>("views");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...videos];

    if (category !== "all") {
      result = result.filter((v) => v.category === category);
    }

    if (duration !== "all") {
      result = result.filter((v) => {
        const secs = parseDuration(v.duration);
        if (duration === "short") return secs < 300;
        if (duration === "medium") return secs >= 300 && secs < 1200;
        return secs >= 1200;
      });
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else if (sortBy === "views") {
      result.sort((a, b) => b.views - a.views);
    }

    return result;
  }, [category, duration, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset page when filters change
  const handleFilter = (fn: () => void) => {
    fn();
    setPage(1);
  };

  const activeFilters = [
    ...(category !== "all"
      ? [{ key: "cat", label: CATEGORY_META[category].label }]
      : []),
    ...(duration !== "all"
      ? [
          {
            key: "dur",
            label:
              duration === "short"
                ? "Under 5 min"
                : duration === "medium"
                  ? "5-20 min"
                  : "20+ min",
          },
        ]
      : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-1">Explore</h1>
        <p className="text-muted-foreground mb-6">
          {filtered.length} curated health and education videos
        </p>
      </motion.div>

      {/* Category Quick Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
        <Button
          variant={category === "all" ? "default" : "outline"}
          size="sm"
          className="flex-shrink-0 rounded-full"
          onClick={() => handleFilter(() => setCategory("all"))}
        >
          All
        </Button>
        {(Object.entries(CATEGORY_META) as [Category, (typeof CATEGORY_META)[Category]][]).map(([key, meta]) => (
          <Button
            key={key}
            variant={category === key ? "default" : "outline"}
            size="sm"
            className="flex-shrink-0 rounded-full"
            style={category === key ? { backgroundColor: meta.color, borderColor: meta.color } : {}}
            onClick={() => handleFilter(() => setCategory(key))}
          >
            {meta.label}
          </Button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Select
          value={category}
          onValueChange={(v) =>
            handleFilter(() => setCategory(v as Category | "all"))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {(
              Object.entries(CATEGORY_META) as [
                Category,
                (typeof CATEGORY_META)[Category],
              ][]
            ).map(([key, meta]) => (
              <SelectItem key={key} value={key}>
                {meta.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={duration}
          onValueChange={(v) =>
            handleFilter(() => setDuration(v as Duration))
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Duration</SelectItem>
            <SelectItem value="short">Short (&lt;5 min)</SelectItem>
            <SelectItem value="medium">Medium (5-20 min)</SelectItem>
            <SelectItem value="long">Long (20+ min)</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(v) => handleFilter(() => setSortBy(v as SortBy))}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="views">Most Viewed</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="trending">Trending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active filter pills */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((f) => (
            <Badge
              key={f.key}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/10"
              onClick={() => {
                if (f.key === "cat") handleFilter(() => setCategory("all"));
                if (f.key === "dur") handleFilter(() => setDuration("all"));
              }}
            >
              {f.label}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-6"
            onClick={() =>
              handleFilter(() => {
                setCategory("all");
                setDuration("all");
                setSortBy("views");
              })
            }
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${category}-${duration}-${sortBy}-${page}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {paged.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paged.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No videos match your filters
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() =>
                  handleFilter(() => {
                    setCategory("all");
                    setDuration("all");
                  })
                }
              >
                Clear Filters
              </Button>
            </div>
          )}
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
            <ChevronLeft className="w-4 h-4" />
            Prev
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let p: number;
              if (totalPages <= 7) {
                p = i + 1;
              } else if (page <= 4) {
                p = i + 1;
              } else if (page >= totalPages - 3) {
                p = totalPages - 6 + i;
              } else {
                p = page - 3 + i;
              }
              return (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  size="sm"
                  className="w-9 h-9 p-0"
                  onClick={() => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {p}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => {
              setPage(page + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
