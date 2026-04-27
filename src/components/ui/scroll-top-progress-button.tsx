"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollTopProgressButton() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const radius = 18;
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      setProgress(nextProgress);
      setShow(scrollTop > 300);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const strokeDashoffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          key="scroll-top-progress"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ y: -3, scale: 1.04 }}
          className="group fixed bottom-20 right-6 z-[9999] grid h-12 w-12 place-items-center rounded-full border border-[rgba(99,102,241,0.18)] bg-[rgba(255,255,255,0.85)] text-indigo-600 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-[12px] transition duration-200 hover:shadow-[0_12px_30px_rgba(99,102,241,0.2)] dark:border-white/12 dark:bg-[rgba(15,23,42,0.75)] dark:text-white dark:shadow-[0_8px_28px_rgba(99,102,241,0.35)] dark:hover:shadow-[0_12px_34px_rgba(99,102,241,0.5)]"
        >
          <svg
            viewBox="0 0 48 48"
            className="-rotate-90 pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="55%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="rgba(15,23,42,0.12)"
              strokeWidth="3"
              className="dark:stroke-[rgba(255,255,255,0.15)]"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="url(#scrollProgressGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <motion.span
            className="relative z-10"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ArrowUp size={17} />
          </motion.span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
