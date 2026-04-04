"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Star, Clock, Sun } from "lucide-react";
import { ToolLayout } from "@/components/health-lab/tool-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchRelatedVideos, saveToLS, loadFromLS } from "@/lib/health-lab-utils";
import type { Video } from "@/types";

interface BedtimeOption {
  time: string;
  cycles: number;
  hours: number;
  quality: string;
  qualityColor: string;
  isBest: boolean;
}

function formatTime(date: Date): string {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function SleepPage() {
  const [wakeHour, setWakeHour] = useState(7);
  const [wakeMinute, setWakeMinute] = useState(0);
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");
  const [results, setResults] = useState<BedtimeOption[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const saved = loadFromLS<{
      wakeHour: number; wakeMinute: number; ampm: "AM" | "PM";
    }>("sleep_inputs");
    if (saved) {
      setWakeHour(saved.wakeHour);
      setWakeMinute(saved.wakeMinute);
      setAmpm(saved.ampm);
    }
  }, []);

  const calculate = useCallback(() => {
    // Convert to 24h
    let h24 = wakeHour;
    if (ampm === "PM" && wakeHour !== 12) h24 += 12;
    if (ampm === "AM" && wakeHour === 12) h24 = 0;

    const wakeDate = new Date();
    wakeDate.setHours(h24, wakeMinute, 0, 0);

    const CYCLE_MIN = 90;
    const FALL_ASLEEP_MIN = 15;

    const options: BedtimeOption[] = [
      { cycles: 6, hours: 9, quality: "Best", qualityColor: "#22c55e", isBest: true },
      { cycles: 5, hours: 7.5, quality: "Great", qualityColor: "#3b82f6", isBest: false },
      { cycles: 4, hours: 6, quality: "Okay", qualityColor: "#f59e0b", isBest: false },
      { cycles: 3, hours: 4.5, quality: "Not Recommended", qualityColor: "#ef4444", isBest: false },
    ].map((opt) => {
      const totalMin = opt.cycles * CYCLE_MIN + FALL_ASLEEP_MIN;
      const bedtime = new Date(wakeDate.getTime() - totalMin * 60 * 1000);
      return { ...opt, time: formatTime(bedtime) };
    });

    setResults(options);
    setVideos(searchRelatedVideos("sleep quality circadian rhythm deep sleep"));
    saveToLS("sleep_inputs", { wakeHour, wakeMinute, ampm });
  }, [wakeHour, wakeMinute, ampm]);

  return (
    <ToolLayout
      toolId="sleep"
      title="Sleep Calculator"
      icon={Moon}
      color="#8b5cf6"
      relatedVideos={videos}
      science="Sleep occurs in cycles of approximately 90 minutes, each progressing through light sleep (N1, N2), deep sleep (N3), and REM sleep. Waking between cycles rather than in the middle of one helps you feel more refreshed. Most adults need 5-6 complete cycles (7.5-9 hours) per night. The calculator adds 15 minutes to account for the average time it takes to fall asleep. Deep sleep is most abundant in early cycles, while REM sleep increases in later cycles, making both short and long sleep suboptimal for cognitive function."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 p-6 rounded-2xl border bg-card"
        >
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-3 block">
              <Sun className="w-4 h-4 inline mr-1.5" />
              I need to wake up at
            </label>

            <div className="flex items-center gap-3 justify-center">
              {/* Hour */}
              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWakeHour((h) => (h >= 12 ? 1 : h + 1))}
                  className="w-12"
                >
                  +
                </Button>
                <div className="w-16 h-16 rounded-xl border-2 border-[#8b5cf6]/30 bg-[#8b5cf6]/5 flex items-center justify-center">
                  <span className="text-3xl font-black text-foreground">
                    {wakeHour.toString().padStart(2, "0")}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWakeHour((h) => (h <= 1 ? 12 : h - 1))}
                  className="w-12"
                >
                  -
                </Button>
                <span className="text-[10px] text-muted-foreground">Hour</span>
              </div>

              <span className="text-3xl font-black text-muted-foreground mt-[-24px]">:</span>

              {/* Minute */}
              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWakeMinute((m) => (m >= 55 ? 0 : m + 5))}
                  className="w-12"
                >
                  +
                </Button>
                <div className="w-16 h-16 rounded-xl border-2 border-[#8b5cf6]/30 bg-[#8b5cf6]/5 flex items-center justify-center">
                  <span className="text-3xl font-black text-foreground">
                    {wakeMinute.toString().padStart(2, "0")}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWakeMinute((m) => (m <= 0 ? 55 : m - 5))}
                  className="w-12"
                >
                  -
                </Button>
                <span className="text-[10px] text-muted-foreground">Minute</span>
              </div>

              {/* AM/PM */}
              <div className="flex flex-col items-center gap-1 ml-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmpm("AM")}
                  className="w-12"
                >
                  +
                </Button>
                <div className="w-16 h-16 rounded-xl border-2 border-[#8b5cf6]/30 bg-[#8b5cf6]/5 flex items-center justify-center">
                  <span className="text-xl font-black text-foreground">{ampm}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmpm("PM")}
                  className="w-12"
                >
                  -
                </Button>
                <span className="text-[10px] text-muted-foreground">AM/PM</span>
              </div>
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-11 text-base bg-[#8b5cf6] hover:bg-[#7c3aed] text-white">
            <Moon className="w-4 h-4 mr-2" />
            Calculate Bedtimes
          </Button>

          {/* Sleep Cycle Visual */}
          <div className="p-4 rounded-xl bg-muted/30">
            <p className="text-xs text-muted-foreground mb-3 font-medium">How Sleep Cycles Work</p>
            <div className="flex items-end gap-0.5 h-16">
              {Array.from({ length: 6 }).map((_, cycleIdx) =>
                [1, 2, 3, 4, 5].map((stage, stageIdx) => {
                  const heights = [30, 50, 80, 100, 60];
                  return (
                    <motion.div
                      key={`${cycleIdx}-${stageIdx}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${heights[stageIdx]}%` }}
                      transition={{ delay: 0.05 * (cycleIdx * 5 + stageIdx), duration: 0.3 }}
                      className="flex-1 rounded-t-sm"
                      style={{
                        backgroundColor:
                          stageIdx < 2
                            ? "#8b5cf620"
                            : stageIdx === 2
                              ? "#8b5cf650"
                              : stageIdx === 3
                                ? "#8b5cf6"
                                : "#3b82f6",
                      }}
                    />
                  );
                })
              )}
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-muted-foreground">
              <span>Cycle 1</span>
              <span>Cycle 2</span>
              <span>Cycle 3</span>
              <span>Cycle 4</span>
              <span>Cycle 5</span>
              <span>Cycle 6</span>
            </div>
            <div className="flex items-center gap-3 mt-3 text-[9px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#8b5cf620]" /> Light
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#8b5cf6]" /> Deep
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#3b82f6]" /> REM
              </span>
            </div>
          </div>
        </motion.div>

        {/* Result Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {results.length > 0 ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground">
                  To wake up at{" "}
                  <span className="font-bold text-foreground">
                    {wakeHour}:{wakeMinute.toString().padStart(2, "0")} {ampm}
                  </span>
                  , go to bed at one of these times:
                </p>

                {results.map((opt, i) => (
                  <motion.div
                    key={opt.cycles}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className={cn(
                      "p-5 rounded-2xl border bg-card relative overflow-hidden transition-all",
                      opt.isBest && "border-2 ring-2 ring-[#8b5cf6]/20"
                    )}
                    style={opt.isBest ? { borderColor: "#8b5cf6" } : {}}
                  >
                    {opt.isBest && (
                      <div className="absolute top-3 right-3">
                        <Star className="w-5 h-5 text-[#8b5cf6] fill-[#8b5cf6]" />
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${opt.qualityColor}15` }}
                      >
                        <Clock className="w-6 h-6" style={{ color: opt.qualityColor }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-2xl font-black" style={{ color: opt.qualityColor }}>
                          {opt.time}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm text-muted-foreground">
                            {opt.hours}h / {opt.cycles} cycles
                          </span>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: opt.qualityColor }}
                          >
                            {opt.quality}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cycle visualization */}
                    <div className="flex gap-1 mt-3">
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          className={cn(
                            "flex-1 h-2 rounded-full",
                            idx < opt.cycles ? "opacity-100" : "opacity-20"
                          )}
                          style={{
                            backgroundColor: idx < opt.cycles ? opt.qualityColor : "#888",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-muted-foreground text-center"
                >
                  Times include 15 minutes to fall asleep. Aim for 5-6 complete sleep cycles.
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 rounded-2xl border border-dashed bg-muted/20 flex flex-col items-center justify-center text-center min-h-[300px]"
              >
                <Moon className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Set your wake-up time and click Calculate to see optimal bedtimes</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
