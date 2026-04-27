"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const isDark = theme !== "light";

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:glass dark:border-transparent dark:bg-transparent dark:text-slate-100 dark:shadow-none"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={16} className="text-slate-500 dark:text-slate-100" /> : <Moon size={16} className="text-slate-500 dark:text-slate-100" />}
      <span>{isDark ? "Light" : "Dark"}</span>
    </motion.button>
  );
}
