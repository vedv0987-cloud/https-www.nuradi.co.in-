"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = {
  Platform: [
    { href: "/explore", label: "Explore" },
    { href: "/channels", label: "Channels" },
    { href: "/health-az", label: "Health A-Z" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ],
  Categories: [
    { href: "/category/health", label: "Health & Wellness" },
    { href: "/category/fitness", label: "Fitness" },
    { href: "/category/nutrition", label: "Nutrition" },
    { href: "/category/mental-health", label: "Mental Health" },
  ],
  Legal: [
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/refund-policy", label: "Cancellation & Refund" },
    { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
    { href: "/contact", label: "Contact Us" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/nuradihealth-on-light.svg"
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
          <div className="text-xs text-muted-foreground text-center sm:text-left">
            <p>
              &copy; {new Date().getFullYear()} NuradiHealth \u00B7 Operated by VEDPRAKASH SHYAMCHARAN VISHWAKARMA
            </p>
            <p className="mt-1">
              All videos belong to their respective YouTube creators.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Mumbai, MH, India \u00B7 <a href="mailto:vedv0987@gmail.com" className="hover:text-foreground transition-colors">vedv0987@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
