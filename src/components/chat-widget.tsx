"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Bot, Maximize2 } from "lucide-react";
import Link from "next/link";
import { HealthChat } from "./health-chat";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1a1a1a] rounded-full shadow-lg flex items-center justify-center group"
            aria-label="Open chat"
          >
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute w-full h-full rounded-full bg-[#1a1a1a]/20 animate-ping" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col
                       max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:h-[85vh] max-sm:rounded-b-none max-sm:rounded-t-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a1a1a]">HealthBot</h3>
                  <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Online · Searches web in real-time
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <Link
                  href="/chat"
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-[#1a1a1a] transition-colors"
                  aria-label="Open full page"
                >
                  <Maximize2 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-[#1a1a1a] transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat */}
            <HealthChat isWidget={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
