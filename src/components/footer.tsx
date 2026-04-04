"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";

const FOOTER_LINKS = {
  Platform: [
    { href: "/explore", label: "Explore" },
    { href: "/channels", label: "Channels" },
    { href: "/about", label: "About" },
  ],
  Categories: [
    { href: "/category/health", label: "Health & Wellness" },
    { href: "/category/fitness", label: "Fitness" },
    { href: "/category/nutrition", label: "Nutrition" },
    { href: "/category/mental-health", label: "Mental Health" },
  ],
  More: [
    { href: "/category/medical", label: "Medical Education" },
    { href: "/category/science", label: "Science" },
    { href: "/category/personal-dev", label: "Personal Development" },
  ],
};

export function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src={theme === "dark" ? "/nuradihealth-on-dark.svg" : "/nuradihealth-on-light.svg"}
                alt="NuradiHealth"
                width={140}
                height={24}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground mt-3 max-w-[240px]">
              Curated health & education videos from trusted YouTube creators.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} HealthEduTV. All videos belong to
            their respective YouTube creators.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" />{" "}
            by Realatte AI
          </p>
        </div>
      </div>
    </footer>
  );
}
