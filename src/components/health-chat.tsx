"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, ThumbsUp, ThumbsDown, Copy, Check, Search, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface Source {
  title: string;
  url: string;
  domain: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  timestamp: Date;
  isStreaming?: boolean;
  feedback?: "helpful" | "not_helpful" | null;
}

const QUICK_QUESTIONS = [
  "What are early signs of diabetes?",
  "Home remedy for cold and cough",
  "Is Dolo 650 safe during pregnancy?",
  "What does high creatinine mean?",
  "Best foods for weight loss in India",
  "How to reduce cholesterol naturally",
];

export function HealthChat({ isWidget = false }: { isWidget?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll only the messages container — not the whole page
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isSearching]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    const assistantId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      sources: [],
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No response body");

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));

            switch (data.type) {
              case "searching":
                setIsSearching(true);
                setSearchQuery(data.query || "");
                break;
              case "search_complete":
                setIsSearching(false);
                setSearchQuery("");
                break;
              case "text":
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: m.content + data.content } : m
                  )
                );
                break;
              case "sources":
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantId ? { ...m, sources: data.sources } : m))
                );
                break;
              case "done":
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantId ? { ...m, isStreaming: false } : m))
                );
                setIsLoading(false);
                setIsSearching(false);
                break;
              case "error":
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: data.message || "Something went wrong.", isStreaming: false }
                      : m
                  )
                );
                setIsLoading(false);
                break;
            }
          } catch {}
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Connection error. Please try again.", isStreaming: false }
            : m
        )
      );
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCopy = (msg: Message) => {
    navigator.clipboard.writeText(msg.content);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (msgId: string, feedback: "helpful" | "not_helpful") => {
    setMessages((prev) => prev.map((m) => (m.id === msgId ? { ...m, feedback } : m)));
  };

  return (
    <div className={cn("flex flex-col bg-white", isWidget ? "h-full" : "h-[calc(100vh-120px)]")}>
      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-1">Hi! I&apos;m HealthBot</h2>
            <p className="text-xs text-gray-500 mb-5 max-w-xs mx-auto">
              I search the web in real-time for the latest health information. Ask me anything!
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-[11px] bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-100 hover:border-gray-300 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {msg.role === "user" ? (
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-[#1a1a1a] text-white rounded-2xl rounded-br-sm px-4 py-2.5">
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="text-sm text-gray-800 leading-relaxed">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => <h1 className="text-lg font-bold text-[#1a1a1a] mt-4 mb-2 first:mt-0">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-base font-bold text-[#1a1a1a] mt-4 mb-2 first:mt-0">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-bold text-[#1a1a1a] mt-3 mb-1.5 first:mt-0">{children}</h3>,
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                            ul: ({ children }) => <ul className="mb-2 space-y-1.5 list-disc pl-5">{children}</ul>,
                            ol: ({ children }) => <ol className="mb-2 space-y-1.5 list-decimal pl-5">{children}</ol>,
                            li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
                            strong: ({ children }) => <strong className="font-bold text-[#1a1a1a]">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-amber-400 bg-amber-50 px-3 py-2 my-2 rounded-r text-[13px] text-gray-700">
                                {children}
                              </blockquote>
                            ),
                            hr: () => <hr className="my-3 border-gray-200" />,
                            a: ({ href, children }) => (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
                                {children}
                              </a>
                            ),
                            code: ({ children }) => (
                              <code className="bg-gray-100 text-[#1a1a1a] px-1.5 py-0.5 rounded text-[12px] font-mono">{children}</code>
                            ),
                            table: ({ children }) => (
                              <div className="overflow-x-auto my-2">
                                <table className="min-w-full text-[12px] border-collapse">{children}</table>
                              </div>
                            ),
                            th: ({ children }) => <th className="border border-gray-200 px-2 py-1 bg-gray-100 font-bold text-left">{children}</th>,
                            td: ({ children }) => <td className="border border-gray-200 px-2 py-1">{children}</td>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                        {msg.isStreaming && (
                          <span className="inline-block w-1.5 h-4 bg-[#1a1a1a] animate-pulse ml-0.5 align-middle" />
                        )}
                      </div>
                    </div>

                    {msg.sources && msg.sources.length > 0 && !msg.isStreaming && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                        <p className="text-[10px] text-gray-400 mb-1 font-medium uppercase tracking-wider">Sources</p>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sources.map((source, i) => (
                            <a
                              key={i}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-[11px] text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded-full hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
                            >
                              <Search className="w-2.5 h-2.5" />
                              {source.domain}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {!msg.isStreaming && msg.content && (
                      <div className="mt-2 flex gap-3 ml-1">
                        <button
                          onClick={() => handleFeedback(msg.id, "helpful")}
                          className={cn(
                            "text-[11px] transition-colors",
                            msg.feedback === "helpful" ? "text-green-600" : "text-gray-400 hover:text-green-600"
                          )}
                        >
                          <ThumbsUp className="w-3.5 h-3.5 inline" />
                        </button>
                        <button
                          onClick={() => handleFeedback(msg.id, "not_helpful")}
                          className={cn(
                            "text-[11px] transition-colors",
                            msg.feedback === "not_helpful" ? "text-red-600" : "text-gray-400 hover:text-red-600"
                          )}
                        >
                          <ThumbsDown className="w-3.5 h-3.5 inline" />
                        </button>
                        <button
                          onClick={() => handleCopy(msg)}
                          className="text-[11px] text-gray-400 hover:text-[#1a1a1a] transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 inline text-green-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 inline" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 ml-11 text-xs text-gray-500"
          >
            <div className="w-3.5 h-3.5 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin" />
            <span>
              Searching the web{searchQuery && `: "${searchQuery}"`}
            </span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-3 bg-white">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask any health question..."
            disabled={isLoading}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:border-[#1a1a1a] focus:bg-white outline-none disabled:opacity-60 transition-all"
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          Searches web for latest info · Not medical advice · Always consult a doctor
        </p>
      </div>
    </div>
  );
}
