"use client";

import { Bot, Pill, Stethoscope, Apple, FlaskConical, Shield, Baby, Brain, Sparkles } from "lucide-react";
import Link from "next/link";
import { HealthChat } from "@/components/health-chat";

const QUICK_TOPICS = [
  { icon: Stethoscope, label: "Symptoms", href: "/symptom-checker" },
  { icon: Pill, label: "Medicines", href: "/tools/generic-medicine" },
  { icon: Apple, label: "Diet & Nutrition", href: "/tools/food-nutrition" },
  { icon: FlaskConical, label: "Lab Reports", href: "/health-az" },
  { icon: Shield, label: "First Aid", href: "/first-aid" },
  { icon: Baby, label: "Pregnancy", href: "/pregnancy" },
  { icon: Brain, label: "Mental Health", href: "/myths" },
  { icon: Sparkles, label: "Home Remedies", href: "/home-remedies" },
];

export default function ChatPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar — Quick Topics */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-3">
                <Bot className="w-3 h-3" />
                AI Assistant
              </div>
              <h1 className="text-2xl font-black tracking-tight">HealthBot</h1>
              <p className="text-sm text-gray-500 mt-1">
                Real-time AI health assistant with web search
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">
                Quick Topics
              </p>
              <div className="space-y-1">
                {QUICK_TOPICS.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 hover:text-[#1a1a1a] transition-colors group"
                    >
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#1a1a1a] transition-colors" />
                      <span>{topic.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                How It Works
              </p>
              <ul className="text-xs text-gray-600 space-y-2">
                <li className="flex gap-2">
                  <span className="text-[#1a1a1a] font-bold">1.</span>
                  Ask any health question
                </li>
                <li className="flex gap-2">
                  <span className="text-[#1a1a1a] font-bold">2.</span>
                  HealthBot searches the web
                </li>
                <li className="flex gap-2">
                  <span className="text-[#1a1a1a] font-bold">3.</span>
                  Get evidence-based answers with sources
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main chat area */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <HealthChat isWidget={false} />
        </div>
      </div>
    </div>
  );
}
