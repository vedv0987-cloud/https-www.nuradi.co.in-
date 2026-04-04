import type { Metadata } from "next";
import { videos } from "@/data/videos";
import { channels } from "@/data/channels";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const video = videos.find((v) => v.id === id);
  if (!video) return { title: "Video Not Found — HealthEduTV" };
  const channel = channels.find((c) => c.id === video.channelId);
  return {
    title: `${video.title} — HealthEduTV`,
    description: video.description.slice(0, 160),
    openGraph: {
      title: video.title,
      description: video.description.slice(0, 160),
      images: [{ url: video.thumbnail, width: 1280, height: 720 }],
      type: "video.other",
      siteName: "HealthEduTV",
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description.slice(0, 160),
      images: [video.thumbnail],
    },
    authors: channel ? [{ name: channel.name }] : undefined,
  };
}

export function generateStaticParams() {
  return videos.map((v) => ({ id: v.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
