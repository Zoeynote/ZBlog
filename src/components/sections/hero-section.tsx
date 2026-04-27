"use client";

import { BriefcaseBusiness, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { PortfolioData } from "@/lib/types";

type Language = "en" | "zh";

export function HeroSection({
  site,
  language
}: {
  site: PortfolioData["site"];
  language: Language;
}) {
  const content = {
    en: {
      badge: "Content & Growth Operator | Crypto Research",
      lines: [
        "Turning information into influence.",
        "Shaping narratives that move communities.",
        "From insight to distribution, end-to-end."
      ],
      cta: "Let’s talk →",
      labels: {
        experience: "Experience",
        telegram: "Telegram",
        email: "Email"
      }
    },
    zh: {
      badge: "内容与增长运营 | Crypto 研究",
      lines: ["把信息转化为影响力。", "以叙事驱动认知与传播。", "从洞察到分发，一体化执行。"],
      cta: "和我聊聊 →",
      labels: {
        experience: "经验",
        telegram: "电报",
        email: "邮箱"
      }
    }
  } as const;
  const active = content[language];

  const [lineIndex, setLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = active.lines[lineIndex];
    const doneTyping = !isDeleting && displayText === current;
    const doneDeleting = isDeleting && displayText === "";
    const speed = isDeleting ? 42 : 70;

    const timer = setTimeout(() => {
      if (doneTyping) {
        setIsDeleting(true);
        return;
      }
      if (doneDeleting) {
        setIsDeleting(false);
        setLineIndex((prev) => (prev + 1) % active.lines.length);
        return;
      }
      const next = isDeleting
        ? current.slice(0, Math.max(displayText.length - 1, 0))
        : current.slice(0, displayText.length + 1);
      setDisplayText(next);
    }, doneTyping ? 1300 : speed);

    return () => clearTimeout(timer);
  }, [active.lines, displayText, isDeleting, lineIndex]);

  useEffect(() => {
    setDisplayText("");
    setLineIndex(0);
    setIsDeleting(false);
  }, [language]);

  return (
    <section id="hero" className="relative min-h-[68vh] py-20 md:py-24">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-brand-indigo/20 via-brand-purple/15 to-brand-cyan/10 blur-3xl md:h-96 md:w-96" />
      <div className="max-w-3xl space-y-5">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(99,102,241,0.25)] bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08))] px-4 py-1.5 text-xs tracking-wide text-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.06)] backdrop-blur-[8px] transition duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(99,102,241,0.12)] dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:shadow-none dark:backdrop-blur-0 dark:hover:translate-y-0 dark:hover:shadow-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan/70 opacity-60 dark:bg-brand-cyan/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[linear-gradient(135deg,#06b6d4,#6366f1)] shadow-[0_0_8px_rgba(99,102,241,0.4)] dark:bg-brand-cyan dark:shadow-none" />
          </span>
          <span className="bg-[linear-gradient(90deg,#06b6d4,#6366f1,#a855f7)] bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-brand-cyan dark:via-slate-200 dark:to-brand-purple">
            {active.badge}
          </span>
        </motion.p>
        <motion.h1
          className="text-5xl font-bold leading-[0.98] tracking-[-0.03em] md:text-7xl"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } }
          }}
        >
          {site.name.split("").map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="max-w-xl text-lg text-slate-600 dark:text-slate-400"
        >
          <span>{displayText}</span>
          <span className="ml-1 inline-block h-5 w-[1.5px] animate-pulse bg-slate-300 align-middle" />
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="flex flex-wrap gap-4 pt-2"
        >
          <a
            href="https://t.me/zoeyzz0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple px-6 py-3 text-sm font-medium text-white transition duration-300 hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_0_16px_rgba(99,102,241,0.28)]"
          >
            {active.cta}
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          className="grid justify-start gap-5 pt-2 [grid-template-columns:auto] md:[grid-template-columns:auto_auto] xl:[grid-template-columns:auto_auto_auto]"
        >
          <div className="flex min-h-[72px] w-max max-w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-slate-900/40 dark:shadow-none">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-indigo/15 text-brand-indigo">
              <BriefcaseBusiness size={15} />
            </span>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{active.labels.experience}</p>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{site.yearsOfExp}</p>
            </div>
          </div>
          <a
            href="https://t.me/zoeyzz0"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[72px] w-max max-w-full cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition duration-200 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_6px_18px_rgba(56,189,248,0.18)] dark:border-white/10 dark:bg-slate-900/40 dark:shadow-none dark:hover:border-white/20 dark:hover:bg-slate-900/55 dark:hover:shadow-[0_0_24px_rgba(168,85,247,0.25)]"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-purple/15 text-brand-purple">
              <Send size={15} className="transition duration-200 group-hover:scale-105 group-hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.45)]" />
            </span>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{active.labels.telegram}</p>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{site.telegram}</p>
              <p className="text-xs text-slate-500 opacity-0 transition duration-200 group-hover:opacity-100 dark:text-slate-500">chat on Telegram</p>
            </div>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex min-h-[72px] w-max max-w-[420px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition duration-200 hover:scale-[1.01] hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/40 dark:shadow-none dark:hover:border-white/20 dark:hover:bg-slate-900/55"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-cyan/15 text-brand-cyan">
              <Mail size={15} />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-slate-500 dark:text-slate-400">{active.labels.email}</p>
              <p className="text-base font-semibold text-slate-900 [overflow-wrap:anywhere] dark:text-slate-100">{site.email}</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
