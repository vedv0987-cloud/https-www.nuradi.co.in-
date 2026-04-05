"use client";

import { useRef, useState } from "react";
import { Download, Share2, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  filename: string;
  shareText: string;
  shareUrl: string;
  children: React.ReactNode;
}

export function ShareResultCard({
  filename,
  shareText,
  shareUrl,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (!ref.current) return;
    setLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(ref.current, {
        background: "#ffffff",
      } as unknown as Parameters<typeof html2canvas>[1]);
      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("Share card generation failed", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "NuradiHealth",
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // user cancelled
      }
    }
    // Fallback: open WhatsApp
    const waUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(waUrl, "_blank");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div ref={ref} className="bg-white rounded-2xl overflow-hidden">
        {children}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleShare}
          className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Share2 className="h-4 w-4" /> Share
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          disabled={loading}
          className="gap-1.5"
        >
          <Download className="h-4 w-4" />
          {loading ? "Generating..." : "Download PNG"}
        </Button>
        <Button
          onClick={handleCopy}
          variant="outline"
          className="gap-1.5"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
          {copied ? "Copied!" : "Copy link"}
        </Button>
      </div>
    </div>
  );
}
