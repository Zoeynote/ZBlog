"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { HeroSection } from "@/components/sections/hero-section";
import {
  ExperienceSection,
  FooterSection,
  AboutContentSection,
  ProfilePortfolioSection,
  ProjectsSection,
  StatsSection
} from "@/components/sections/content-sections";

const portfolioData = data as PortfolioData;
type Language = "en" | "zh";
type TabKey = "home" | "profile" | "about";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [honestChoice, setHonestChoice] = useState<"hire" | "regret" | null>(null);

  const tabs: Array<{ key: TabKey; en: string; zh: string }> = [
    { key: "home", en: "Home", zh: "首页" },
    { key: "profile", en: "Profile", zh: "作品" },
    { key: "about", en: "About", zh: "关于" }
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 text-slate-900 dark:text-slate-100">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed right-[-140px] top-28 -z-10 h-[360px] w-[360px] rounded-full bg-gradient-to-br from-brand-indigo/20 via-brand-purple/15 to-brand-cyan/10 blur-3xl"
        animate={{
          opacity: honestChoice === "hire" ? 0.9 : 0.6,
          scale: honestChoice === "hire" ? 1.06 : 1
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
      <header className="pointer-events-none sticky top-4 z-[9999] flex justify-end gap-3 py-6">
        <div className="pointer-events-auto flex items-center gap-3">
          <LanguageToggle language={language} onChange={setLanguage} />
          <ThemeToggle />
        </div>
      </header>

      <section className="relative z-[9999] mb-8 pointer-events-auto">
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-[0_2px_10px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-5 py-2 text-sm transition duration-200 ${
                activeTab === tab.key
                  ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-slate-100"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:brightness-110"
              }`}
            >
              {language === "en" ? tab.en : tab.zh}
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {activeTab === "home" && (
            <>
              <HeroSection site={portfolioData.site} language={language} />
              <ExperienceSection experience={portfolioData.experience} language={language} />
              <ProjectsSection projects={portfolioData.projects} language={language} />
              <StatsSection language={language} />
            </>
          )}

          {activeTab === "profile" && <ProfilePortfolioSection language={language} />}

          {activeTab === "about" && (
            <>
              <AboutContentSection language={language} education={portfolioData.education} />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {activeTab === "about" && <FooterSection choice={honestChoice} onChoiceChange={setHonestChoice} language={language} />}
    </main>
  );
}
