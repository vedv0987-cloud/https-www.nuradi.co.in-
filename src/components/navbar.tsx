"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Tv,
  ChevronDown,
  Wind,
  Calculator,
  Stethoscope,
  Heart,
  FlaskConical,
  Scale,
  Flame,
  Droplets,
  HeartPulse,
  Percent,
  PieChart,
  Moon as MoonIcon,
  Timer,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const MAIN_LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/channels", label: "Channels" },
  { href: "/health-az", label: "Health A-Z" },
];

const TOOL_LINKS = [
  { href: "/health-lab", label: "All Health Tools", icon: FlaskConical, desc: "8 interactive calculators" },
  { href: "/health-lab/bmi", label: "BMI Calculator", icon: Scale, desc: "Check your Body Mass Index" },
  { href: "/health-lab/calories", label: "Calorie Calculator", icon: Flame, desc: "Daily calorie needs" },
  { href: "/health-lab/heart-rate", label: "Heart Rate Zones", icon: HeartPulse, desc: "5 training zones" },
  { href: "/body-explorer", label: "Body Explorer", icon: Stethoscope, desc: "Videos by organ" },
  { href: "/breathe", label: "Breathing Exercise", icon: Wind, desc: "1-minute guided breathing" },
];

const MOBILE_ALL = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/channels", label: "Channels" },
  { href: "/health-az", label: "Health A-Z" },
  { href: "/health-lab", label: "Health Lab" },
  { href: "/body-explorer", label: "Body Explorer" },
  { href: "/breathe", label: "Breathing" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Tv className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            Health<span className="text-primary">EduTV</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {MAIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              {link.label}
            </Link>
          ))}

          {/* Health Tools Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1 cursor-pointer"
              )}
            >
              <Heart className="w-3.5 h-3.5 text-primary" />
              Health Tools
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200",
                  toolsOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-64 bg-popover border rounded-xl shadow-lg p-2 z-50"
                >
                  {TOOL_LINKS.map((tool) => {
                    const ToolIcon = tool.icon;
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ToolIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{tool.label}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {tool.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/about"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            About
          </Link>
        </div>

        {/* Search + Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos, channels..."
              className="w-64 pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1"
            />
          </form>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggle}>
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b overflow-hidden"
          >
            <form onSubmit={handleSearch} className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search videos, channels..."
                  className="pl-9"
                  autoFocus
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-0.5">
              {MOBILE_ALL.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "justify-start"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
