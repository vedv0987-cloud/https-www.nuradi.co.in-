"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Stethoscope, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_ACTIONS = [
  "Check Symptoms",
  "Medicine Info",
  "Diet Help",
  "Exercise Tips",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your health assistant. Ask me anything about symptoms, diet, exercise, or medicines. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I'm having trouble right now. Please try again in a moment.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-xl shadow-sky-500/30 flex items-center justify-center transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Health Assistant</h3>
                  <p className="text-[10px] text-white/60">
                    Powered by AI
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed",
                      msg.role === "user"
                        ? "bg-sky-500 text-white rounded-br-md"
                        : "bg-white text-gray-800 border rounded-bl-md shadow-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 border-t bg-white flex gap-1.5 overflow-x-auto scrollbar-hide">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    onClick={() => sendMessage(action)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-medium hover:bg-sky-100 transition-colors border border-sky-100"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-3 border-t bg-white flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a health question..."
                className="flex-1 text-sm px-3 py-2 rounded-full bg-gray-100 border-0 outline-none focus:ring-2 focus:ring-sky-500/20"
                disabled={loading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || loading}
                className="rounded-full bg-sky-500 hover:bg-sky-600 h-9 w-9 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>

            {/* Disclaimer */}
            <div className="px-3 pb-2 bg-white">
              <p className="text-[9px] text-gray-400 text-center">
                Not medical advice. Always consult a doctor.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
