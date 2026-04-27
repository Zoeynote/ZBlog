"use client";

import { motion } from "framer-motion";

type Language = "en" | "zh";

export function LanguageToggle({
  language,
  onChange
}: {
  language: Language;
  onChange: (next: Language) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-[0_4px_16px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
      <button
        onClick={() => onChange("en")}
        className={`relative rounded-full px-3 py-1.5 text-xs transition duration-200 ${
          language === "en" ? "text-slate-900 dark:text-white" : "text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-transparent dark:hover:text-slate-200"
        }`}
      >
        {language === "en" && (
          <motion.span
            layoutId="lang-pill"
            className="absolute inset-0 rounded-full bg-slate-100 dark:bg-white/10"
            transition={{ duration: 0.25 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
      <button
        onClick={() => onChange("zh")}
        className={`relative rounded-full px-3 py-1.5 text-xs transition duration-200 ${
          language === "zh" ? "text-slate-900 dark:text-white" : "text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-transparent dark:hover:text-slate-200"
        }`}
      >
        {language === "zh" && (
          <motion.span
            layoutId="lang-pill"
            className="absolute inset-0 rounded-full bg-slate-100 dark:bg-white/10"
            transition={{ duration: 0.25 }}
          />
        )}
        <span className="relative z-10">中</span>
      </button>
    </div>
  );
}
