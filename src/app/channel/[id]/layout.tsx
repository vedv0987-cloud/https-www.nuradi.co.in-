import type { Metadata } from "next";
import { channels } from "@/data/channels";
import { formatSubscribers } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const channel = channels.find((c) => c.id === id);
  if (!channel) return { title: "Channel Not Found — NuradiHealth" };
  const desc = `${channel.name} — ${formatSubscribers(channel.subscriberCount)} subscribers. ${channel.description.slice(0, 120)}`;
  return {
    title: `${channel.name} — NuradiHealth`,
    description: desc,
    openGraph: {
      title: channel.name,
      description: desc,
      images: [{ url: channel.avatar, width: 200, height: 200 }],
      type: "profile",
      siteName: "NuradiHealth",
    },
  };
}

export function generateStaticParams() {
  return channels.map((c) => ({ id: c.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
