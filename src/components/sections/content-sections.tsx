"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Orbit, Sparkles, Layers3, GraduationCap, BriefcaseBusiness, FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Reveal } from "@/components/ui/reveal";
import type { PortfolioData } from "@/lib/types";
import { profilePosts, type ProfileCategory } from "@/data/profileContent";
type Language = "en" | "zh";
type CapabilityBubbleTone = "content" | "growth" | "tools" | "design" | "language" | "evolving";
type CapabilityBubble = {
  label: string;
  tone: CapabilityBubbleTone;
  size: number;
  x: number;
  y: number;
  lead?: boolean;
  tip?: string;
};

export function InfoSection({ site }: { site: PortfolioData["site"] }) {
  return (
    <Reveal>
      <section id="info" className="py-8 md:py-10">
        <p className="max-w-4xl text-sm leading-7 text-slate-400 md:text-base">
          <span>{site.yearsOfExp}</span>
          <span className="mx-3 text-slate-600">·</span>
          <span>{site.telegram}</span>
          <span className="mx-3 text-slate-600">·</span>
          <span>{site.email}</span>
          <span className="mx-3 text-slate-600">·</span>
          <span>{site.focus}</span>
        </p>
      </section>
    </Reveal>
  );
}

export function ExperienceSection({
  experience,
  language
}: {
  experience: PortfolioData["experience"];
  language: Language;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const companyIcons: Record<string, typeof Orbit> = {
    Binance: Orbit,
    ChainFeeds: Orbit,
    ChainNews: Orbit
  };
  const companyLinks: Record<string, string | undefined> = {
    Binance: "https://www.binance.com/zh-CN/square",
    ChainFeeds: "https://www.chainfeeds.me/",
    ChainNews: undefined
  };
  const [visibleMap, setVisibleMap] = useState<Record<number, boolean>>({});
  const [centerIndex, setCenterIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const i18n = {
    en: {
      title: "Experience",
      binance: [
        {
          headline: "Built and scaled an RSS-driven news content system",
          detail:
            "Owned prompt design and source whitelist/blacklist operations, consistently delivering 550-670 EN and 610-850 ZH pieces per week."
        },
        {
          headline: "Owned homepage topic prioritization and editorial structure",
          detail:
            "Reviewed market signals daily and refreshed 36-55 core topics weekly, partnering with the data team to improve relevance and presentation."
        },
        {
          headline: "Published original Web3 research and project interviews",
          detail: "Researched and interviewed trending projects, producing 1-2 in-depth original pieces every week."
        },
        {
          headline: "Led News distribution partnerships and channel expansion",
          detail:
            "Managed RSS and Telegram bot integrations, evaluating audience fit and channel quality to drive meaningful exposure."
        },
        {
          headline: "Collaborated with SEO to improve organic growth",
          detail:
            "Executed long-tail keyword strategy, title optimization, and multilingual localization to increase Google visibility and user growth."
        }
      ],
      chainfeeds: [
        {
          headline: "Selected content curation",
          detail:
            "Reviewed cross-channel submissions and independently delivered 8-10 homepage featured stories each day, including headline rewrites and concise summaries."
        },
        {
          headline: "Original content production",
          detail:
            "Planned and wrote thematic and partnership pieces, with individual articles contributing 30+ new subscribers to the official Substack."
        },
        {
          headline: "Event and campaign copywriting",
          detail:
            "Owned ETHShanghai2024 official communications across warm-up posts, speaker announcements, agenda updates, and recaps, while supporting airdrop campaign content."
        },
        {
          headline: "Community channel operations",
          detail:
            "Curated and distributed market insights, industry updates, and original research across X, Telegram, and WeChat to extend content reach."
        },
        {
          headline: "Substack maintenance and growth optimization",
          detail:
            "Managed channel structure, content taxonomy, and paid feature configuration, helping the official Substack grow to 8,000+ subscribers."
        }
      ],
      chainnews: [
        {
          headline: "WeChat content updates and distribution",
          detail:
            "Edited and published weekly content, distributing to 17 owned communities and external channels like Toutiao, Bihu, and Tencent, with single-article reads stably above 4000+ and steady monthly follower growth."
        },
        {
          headline: "Serialized original content output",
          detail:
            "Planned and wrote recurring columns including NFT weekly brief, next-week outlook, and one-chart explainers, plus ecosystem reviews on Mask and CryptoPunks."
        },
        {
          headline: "Homepage content curation",
          detail:
            "Selected high-quality articles for secondary editing and concise abstraction, maintaining a daily rhythm of 15+ homepage updates."
        },
        {
          headline: "Column system maintenance",
          detail:
            "Reviewed new column onboarding and maintained existing columnist profiles, dynamically adjusting homepage exposure by update cadence and topic heat."
        },
        {
          headline: "Growth through campaign activation",
          detail:
            "Repurposed hot topics into visual content for Twitter and Telegram distribution, and scaled Telegram followers from 0 to 4000+ through SBT campaign activations."
        }
      ]
    },
    zh: {
      title: "经历",
      binance: [
        {
          headline: "搭建并规模化 RSS 新闻内容体系",
          detail: "负责 Prompt 撰写与信源黑白名单管理，稳定支撑每周 550-670 篇英文、610-850 篇中文内容产出。"
        },
        {
          headline: "负责首页话题优先级与内容结构编排",
          detail: "每日梳理市场资讯并动态调整内容结构，每周更新 36-55 个核心话题，并协同数据团队优化相关性与呈现效果。"
        },
        {
          headline: "输出原创 Web3 研究与项目访谈",
          detail: "围绕热点项目开展调研与采访，每周产出 1-2 篇深度原创内容。"
        },
        {
          headline: "主导 News 分发合作与渠道拓展",
          detail: "覆盖 RSS 与 Telegram 机器人接入，基于受众匹配与渠道质量评估，持续推动有效曝光。"
        },
        {
          headline: "与 SEO 团队协作提升自然流量增长",
          detail: "通过长尾关键词策略、标题优化及多语种本地化，提升 Google 搜索曝光与用户增长。"
        }
      ],
      chainfeeds: [
        {
          headline: "精选内容策展",
          detail:
            "审核编辑团队各渠道收集内容，独立完成每日 8-10 篇首页精选，包括标题重拟、摘要提炼与重点内容摘录。"
        },
        {
          headline: "原创内容产出",
          detail: "策划并撰写主题文章及商务合作内容，单篇内容曾为官方 Substack 带来 30+ 新增订阅。"
        },
        {
          headline: "活动与营销内容撰写",
          detail:
            "负责 ETHShanghai2024 官方宣发稿件，包括预热、嘉宾预告、议程与 Recap，同时支持项目合作空投等 Campaign 内容。"
        },
        {
          headline: "社区渠道运营",
          detail:
            "在 X 筛选并发布行业热点、市场观点及原创研究内容，并同步分发至 Telegram 与微信群，扩大传播影响力。"
        },
        {
          headline: "Substack 渠道维护与增长优化",
          detail:
            "负责频道结构与基础信息维护，包括内容分层及付费功能设置，当前官方 Substack 订阅用户已达 8,000+。"
        }
      ],
      chainnews: [
        {
          headline: "微信公众号内容更新与分发",
          detail:
            "每周编辑排版并发布文章，分发至 17 个自有社群及头条、币乎、腾讯等外部渠道，单篇阅读量稳定 4000+，并保证公众号关注量每月增长。"
        },
        {
          headline: "输出系列化原创内容",
          detail:
            "策划并撰写 NFT 周报、下周前瞻、一图读懂等栏目，以及 Mask、CryptoPunks 等生态盘点内容。"
        },
        {
          headline: "首页内容策展",
          detail:
            "筛选优质文章进行二次编辑与摘要提炼，保持每日 15+ 篇首页更新频率。"
        },
        {
          headline: "维护专栏体系",
          detail:
            "审核新专栏入驻并维护已有专栏信息，根据更新频率与内容热度动态调整首页展示。"
        },
        {
          headline: "通过活动驱动增长",
          detail:
            "将热点内容转化为图文用于 Twitter 与 Telegram 推广，并通过领取 SBT 的活动实现电报群从 0 到 4000+ 粉丝增长。"
        }
      ]
    }
  } as const;

  const toStructuredPoints = (item: PortfolioData["experience"][number], idx: number) => {
    if (idx === 0) {
      return [...i18n[language].binance];
    }
    if (idx === 1) {
      return [...i18n[language].chainfeeds];
    }
    if (idx === 2) {
      return [...i18n[language].chainnews];
    }
    if (idx !== 0 && idx !== 1 && idx !== 2) {
      return item.bullets.map((bullet) => {
        const splitAt = bullet.indexOf(",");
        if (splitAt === -1) return { headline: bullet, detail: "" };
        return {
          headline: bullet.slice(0, splitAt).trim(),
          detail: bullet.slice(splitAt + 1).trim()
        };
      });
    }
    return item.bullets.map((bullet) => ({ headline: bullet, detail: "" }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index || "-1");
          if (idx < 0) return;
          if (entry.isIntersecting) {
            setVisibleMap((prev) => ({ ...prev, [idx]: true }));
          }
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setCenterIndex(idx);
          }
        });
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0.2, 0.4, 0.6]
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [experience.length]);

  const renderDetailWithHighlight = (text: string) => {
    const parts = text.split(/(\d[\d,]*(?:\+)?(?:\s*to\s*\d[\d,]*(?:\+)?)?|\d+–\d+|\d+-\d+)/g);
    return parts.map((part, idx) =>
      /(\d[\d,]*(?:\+)?(?:\s*to\s*\d[\d,]*(?:\+)?)?|\d+–\d+|\d+-\d+)/.test(part) ? (
        <span key={`${part}-${idx}`} className="font-semibold text-blue-600 dark:bg-gradient-to-r dark:from-brand-indigo dark:to-brand-cyan dark:bg-clip-text dark:text-transparent">
          {part}
        </span>
      ) : (
        <span key={`${part}-${idx}`}>{part}</span>
      )
    );
  };

  return (
    <Reveal>
      <section id="experience" className="space-y-7 py-12 md:py-14">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.08)] text-indigo-500 transition duration-200 hover:-translate-y-[1px] dark:relative dark:border-white/12 dark:bg-white/[0.03] dark:text-cyan-200 dark:shadow-[0_0_10px_rgba(99,102,241,0.22)] dark:hover:shadow-[0_0_14px_rgba(99,102,241,0.4)]">
            <span className="pointer-events-none absolute inset-0 hidden rounded-full dark:block dark:bg-[linear-gradient(135deg,rgba(34,211,238,0.22),rgba(99,102,241,0.2),rgba(168,85,247,0.18))]" />
            <BriefcaseBusiness size={18} className="relative z-10 dark:[filter:drop-shadow(0_0_6px_rgba(99,102,241,0.4))]" />
          </span>
          <h2 className="text-3xl font-semibold tracking-wide text-slate-900 dark:text-slate-100">{i18n[language].title}</h2>
        </div>
        <div className="relative space-y-4">
          <div className={`absolute bottom-2 left-6 top-2 w-0.5 ${isDark ? "bg-indigo-500/20" : "bg-indigo-500/25"}`} />
          <div
            className={`absolute bottom-2 left-6 top-2 w-0.5 opacity-80 ${
              isDark
                ? "bg-gradient-to-b from-indigo-500/45 via-violet-500/22 to-cyan-500/8 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                : "bg-gradient-to-b from-indigo-500/35 via-blue-500/25 to-cyan-500/15 shadow-[0_0_6px_rgba(59,130,246,0.14)]"
            }`}
            style={{
              backgroundSize: "100% 200%",
              animation: "timelineFlow 7s ease-in-out infinite"
            }}
          />
          {experience.map((item, index) => {
            const isActive = centerIndex === index;
            const isCenter = centerIndex === index;
            const isVisible = !!visibleMap[index];
            const points = toStructuredPoints(item, index);
            return (
              <motion.div
                key={item.company + item.period}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? (isCenter ? 1 : 0.78) : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {index < experience.length - 1 && (
                  <div
                    className={`absolute left-6 top-[52px] z-[1] w-0.5 transition-all duration-300 ${
                      isDark
                        ? isActive
                          ? "h-[calc(100%+12px)] bg-indigo-400/60 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                          : "h-[calc(100%+12px)] bg-indigo-500/20"
                        : isActive
                          ? "h-[calc(100%+12px)] bg-indigo-500/35 shadow-[0_0_8px_rgba(59,130,246,0.18)]"
                          : "h-[calc(100%+12px)] bg-indigo-500/18"
                    }`}
                  />
                )}
              {index === 0 || index === 1 ? (
                <a
                  href={index === 0 ? "https://www.binance.com/zh-CN/square" : "https://www.chainfeeds.me/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={index === 0 ? "View Binance Square" : "Visit ChainFeeds"}
                  className="absolute left-6 top-8 z-10 -translate-x-1/2 outline-none"
                >
                  <span
                    className={`group/binance relative grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white shadow-[0_4px_14px_rgba(59,130,246,0.12)] transition duration-200 hover:cursor-pointer dark:border-indigo-300/40 dark:bg-[#0b1020] dark:shadow-none ${
                      isActive
                        ? index === 0
                          ? "scale-[1.08] shadow-[0_0_16px_rgba(240,185,11,0.3)] dark:shadow-[0_0_24px_rgba(240,185,11,0.42)]"
                          : "scale-[1.08] shadow-[0_0_16px_rgba(56,189,248,0.28)] dark:shadow-[0_0_24px_rgba(56,189,248,0.42)]"
                        : index === 0
                        ? "hover:scale-105 hover:shadow-[0_0_18px_rgba(240,185,11,0.25)] dark:shadow-[0_0_18px_rgba(99,102,241,0.3)] dark:hover:shadow-[0_0_22px_rgba(240,185,11,0.35)]"
                        : "hover:scale-105 hover:shadow-[0_0_18px_rgba(56,189,248,0.22)] dark:shadow-[0_0_18px_rgba(99,102,241,0.3)] dark:hover:shadow-[0_0_22px_rgba(56,189,248,0.35)]"
                    }`}
                  >
                    <span className="grid h-full w-full place-items-center p-[8px]">
                      <Image
                        src={index === 0 ? "/binance-mark.svg" : "/chainfeeds-mark.png"}
                        alt={index === 0 ? "Binance logo" : "ChainFeeds logo"}
                        width={26}
                        height={26}
                        className={
                          index === 0
                            ? "h-full w-full object-contain drop-shadow-[0_0_5px_rgba(240,185,11,0.3)]"
                            : "h-full w-full object-contain drop-shadow-[0_0_5px_rgba(56,189,248,0.3)]"
                        }
                      />
                    </span>
                    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-950/95 px-2 py-1 text-[11px] text-slate-200 opacity-0 transition duration-200 group-hover/binance:opacity-100">
                      {index === 0 ? "View Binance Square" : "Visit ChainFeeds"}
                    </span>
                  </span>
                </a>
              ) : index === 2 ? (
                <span
                  className={`absolute left-6 top-8 z-10 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-[#3b82f6]/55 bg-white shadow-[0_4px_14px_rgba(59,130,246,0.14)] transition duration-200 dark:bg-[#0866FF] dark:shadow-none ${
                    isActive
                      ? "scale-[1.08] shadow-[0_0_18px_rgba(59,130,246,0.24)] dark:shadow-[0_0_24px_rgba(59,130,246,0.56)]"
                      : "group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(59,130,246,0.2)] dark:shadow-[0_0_18px_rgba(59,130,246,0.4)] dark:group-hover:shadow-[0_0_24px_rgba(59,130,246,0.5)]"
                  }`}
                >
                  <span className="grid h-full w-full place-items-center p-[2px]">
                    <Image
                      src="/chainnews-mark.png"
                      alt="ChainNews logo"
                      width={40}
                      height={40}
                      className="h-full w-full rounded-full object-cover brightness-110"
                    />
                  </span>
                </span>
              ) : (
                <span
                  className={`absolute left-6 top-8 z-10 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-slate-300 bg-white text-indigo-600 shadow-[0_4px_14px_rgba(59,130,246,0.12)] transition duration-200 dark:border-indigo-400/30 dark:bg-[#0b1020] dark:text-indigo-300 dark:shadow-none ${
                    isActive
                      ? "scale-[1.08] shadow-[0_0_14px_rgba(59,130,246,0.18)] dark:shadow-[0_0_22px_rgba(99,102,241,0.5)]"
                      : "group-hover:shadow-[0_0_14px_rgba(59,130,246,0.16)] dark:shadow-[0_0_18px_rgba(99,102,241,0.35)] dark:group-hover:shadow-[0_0_22px_rgba(99,102,241,0.45)]"
                  }`}
                >
                  {(() => {
                    const Icon = companyIcons[item.company] ?? Orbit;
                    return <Icon size={16} />;
                  })()}
                </span>
              )}
                <motion.div
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={`ml-16 rounded-2xl border p-6 transition duration-200 hover:-translate-y-1 ${
                    isDark
                      ? isActive
                        ? "border-white/25 bg-gradient-to-br from-slate-900/72 to-indigo-950/24 shadow-[0_0_18px_rgba(99,102,241,0.2)]"
                        : "border-white/10 bg-slate-900/40 opacity-80 hover:border-white/20 hover:bg-slate-900/55 hover:opacity-100 hover:shadow-[0_0_16px_rgba(99,102,241,0.18)]"
                      : isActive
                        ? "border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                        : "border-slate-200 bg-white/95 opacity-100 hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                  }`}
                >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {companyLinks[item.company] ? (
                      <a
                        href={companyLinks[item.company]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold text-gray-900 transition duration-200 hover:text-gray-950 dark:text-slate-100 dark:hover:text-white"
                      >
                        {item.company}
                      </a>
                    ) : (
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">{item.company}</h3>
                    )}
                    <span className="text-slate-400 dark:text-slate-500">·</span>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.period}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.title}</p>
                </div>
                  <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300">
                    {points.map((point, pointIndex) => (
                      <li key={`${point.headline}-${pointIndex}`} className="rounded-lg px-2 py-1 transition duration-200 hover:bg-slate-100/80 dark:hover:bg-white/[0.02]">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">- {point.headline}</p>
                        {point.detail ? (
                          <p className="pl-4 pt-1 text-sm leading-6 text-slate-600 dark:text-slate-300/65">
                            {renderDetailWithHighlight(point.detail)}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </Reveal>
  );
}

export function ProjectsSection({
  projects,
  language
}: {
  projects: PortfolioData["projects"];
  language: Language;
}) {
  void projects;
  const copy = {
    en: {
      title: "Additional Experience",
      openbuildRole: "Contributor",
      openbuildDesc:
        "Contributed to OpenBuild offline event operations, including venue setup, check-in reception, and on-site coordination. Also drafted initial collaboration content for partner projects.",
      sinaName: "Sina Finance",
      sinaRole: "Intern Reporter",
      sinaPeriod: "2018.03 - 2018.08",
      sinaDesc: "Covered financial events and wrote news reports published through Sina Finance channels.",
      featured: "Read featured article"
    },
    zh: {
      title: "补充经历",
      openbuildRole: "贡献者",
      openbuildDesc: "参与 OpenBuild 线下活动执行，包括场地布置、签到接待与现场控场；并协助撰写项目对接内容初稿。",
      sinaName: "新浪财经",
      sinaRole: "实习记者",
      sinaPeriod: "2018.03 - 2018.08",
      sinaDesc: "参与财经活动报道与新闻稿撰写，并发布至新浪财经相关渠道。",
      featured: "查看代表文章"
    }
  } as const;
  const t = copy[language];

  return (
    <Reveal>
      <section id="projects" className="relative space-y-6 py-10 md:py-12">
        <div className="pointer-events-none absolute -right-16 top-4 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/12 via-violet-500/8 to-cyan-500/8 blur-3xl" />
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.08)] text-emerald-500 transition duration-200 hover:-translate-y-[1px] dark:relative dark:border-white/12 dark:bg-white/[0.03] dark:text-emerald-300 dark:shadow-[0_0_10px_rgba(16,185,129,0.22)] dark:hover:shadow-[0_0_14px_rgba(16,185,129,0.35)]">
            <span className="pointer-events-none absolute inset-0 hidden rounded-full dark:block dark:bg-[linear-gradient(135deg,rgba(52,211,153,0.22),rgba(16,185,129,0.18))]" />
            <FileText size={18} className="relative z-10 dark:[filter:drop-shadow(0_0_6px_rgba(16,185,129,0.35))]" />
          </span>
          <h2 className="text-3xl font-bold tracking-wide text-slate-900 dark:font-semibold dark:text-slate-200/90">{t.title}</h2>
        </div>
        <div>
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="group relative mb-8 grid gap-6 rounded-[20px] border border-slate-200 bg-white py-6 pl-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)] transition duration-200 ease-out hover:-translate-y-[2px] hover:border-slate-300 hover:bg-slate-50 md:grid-cols-[240px_minmax(0,1fr)] md:gap-12 dark:border-transparent dark:bg-transparent dark:shadow-none dark:hover:bg-white/[0.03]"
          >
            <div
              className="pointer-events-none absolute inset-y-1 left-0 right-0 rounded-2xl opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 dark:opacity-0"
              style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.14), rgba(34,211,238,0.06) 35%, transparent 72%)" }}
            />
            <div className="md:w-[240px]">
              <h3 className="text-lg font-bold text-slate-900 transition duration-200 group-hover:text-slate-900 dark:font-semibold dark:text-slate-100/90 dark:group-hover:text-white">OpenBuild</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400/90">{t.openbuildRole}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-xs text-violet-700 transition duration-200 dark:border-violet-300/20 dark:bg-violet-400/10 dark:text-violet-200/85 dark:group-hover:shadow-[0_0_12px_rgba(168,85,247,0.28)]">Event Ops</span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs text-blue-600 transition duration-200 dark:border-blue-300/20 dark:bg-blue-400/10 dark:text-blue-200/85 dark:group-hover:shadow-[0_0_12px_rgba(96,165,250,0.28)]">Content Support</span>
              </div>
            </div>
            <div>
              <p className="text-sm leading-[1.6] text-slate-700 transition duration-200 ease-in-out group-hover:translate-x-1 dark:text-zinc-400">
                {t.openbuildDesc}
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="group relative mb-1 grid gap-6 rounded-[20px] border border-slate-200 bg-white py-6 pl-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)] transition duration-200 ease-out hover:-translate-y-[2px] hover:border-slate-300 hover:bg-slate-50 md:grid-cols-[240px_minmax(0,1fr)] md:gap-12 dark:border-transparent dark:bg-transparent dark:shadow-none dark:hover:bg-white/[0.03]"
          >
            <div
              className="pointer-events-none absolute inset-y-1 left-0 right-0 rounded-2xl opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 dark:opacity-0"
              style={{ background: "linear-gradient(90deg, rgba(34,211,238,0.14), rgba(59,130,246,0.08) 38%, transparent 74%)" }}
            />
            <div className="md:w-[240px]">
              <h3 className="text-lg font-bold text-slate-900 transition duration-200 group-hover:text-slate-900 dark:font-semibold dark:text-slate-100/90 dark:group-hover:text-white">{t.sinaName}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400/90">{t.sinaRole}</p>
              <p className="text-sm text-slate-500 dark:text-zinc-400/90">{t.sinaPeriod}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 text-xs text-cyan-700 transition duration-200 dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-200/85 dark:group-hover:shadow-[0_0_12px_rgba(34,211,238,0.25)]">Media</span>
                <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs text-sky-700 transition duration-200 dark:border-sky-300/20 dark:bg-sky-400/10 dark:text-sky-200/85 dark:group-hover:shadow-[0_0_12px_rgba(56,189,248,0.25)]">Content Writing</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm leading-[1.6] text-slate-700 transition duration-200 ease-in-out group-hover:translate-x-1 dark:text-zinc-400">
                {t.sinaDesc}
              </p>
              <p className="text-sm text-slate-600 transition duration-200 ease-in-out group-hover:translate-x-1 dark:text-zinc-400">
                <a
                  href="https://finance.sina.cn/china/gjcj/2018-03-14/detail-ifyscsmv6116218.d.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/read ml-1 inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-600 transition duration-200 hover:scale-[1.03] hover:bg-blue-100 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-slate-100 dark:hover:shadow-[0_0_14px_rgba(96,165,250,0.22)]"
                >
                  {t.featured}
                  <ExternalLink size={13} className="transition duration-200 group-hover/read:translate-x-[1px]" />
                </a>
              </p>
            </div>
          </motion.article>
        </div>
      </section>
    </Reveal>
  );
}

export function StatsSection({ language }: { language: Language }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [inView, setInView] = useState(false);
  const [animCycle, setAnimCycle] = useState(0);
  const [counts, setCounts] = useState({
    impact: 0,
    distribution: 0,
    scale: 0,
    retentionStart: 0,
    retentionEnd: 0
  });
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setAnimCycle((prev) => prev + 1);
        } else {
          setInView(false);
          setCounts({
            impact: 0,
            distribution: 0,
            scale: 0,
            retentionStart: 0,
            retentionEnd: 0
          });
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 1450;
    const start = performance.now();
    let frameId = 0;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = easeOutCubic(progress);
      const retentionPhase = progress < 0.52 ? progress / 0.52 : 1;
      const retentionEndPhase = progress < 0.28 ? 0 : (progress - 0.28) / 0.72;

      setCounts({
        impact: Math.round(30 * eased),
        distribution: Math.round(50000 * eased),
        scale: Math.round(8000 * eased),
        retentionStart: Math.round(67 * easeOutCubic(Math.min(retentionPhase, 1))),
        retentionEnd: Math.round(72 * easeOutCubic(Math.min(retentionEndPhase, 1)))
      });

      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, animCycle]);

  const formatK = (n: number) => `${Math.round(n / 1000)}K+`;
  const valueClassName =
    "bg-[linear-gradient(90deg,#22d3ee,#818cf8)] bg-clip-text text-[56px] font-extrabold leading-none text-transparent [text-shadow:0_4px_12px_rgba(129,140,248,0.15)] transition duration-250 ease-out group-hover:scale-[1.04] group-hover:[text-shadow:0_6px_16px_rgba(129,140,248,0.24)] dark:bg-[linear-gradient(90deg,#67E8F9,#A78BFA,#C084FC)] dark:font-bold dark:[text-shadow:0_0_18px_rgba(103,232,249,0.18),0_0_28px_rgba(167,139,250,0.12)] dark:group-hover:[text-shadow:0_0_22px_rgba(103,232,249,0.24),0_0_34px_rgba(167,139,250,0.18)]";
  const i18n = {
    en: {
      title: "Proof of Work",
      labels: {
        impact: "IMPACT",
        retention: "RETENTION",
        distribution: "DISTRIBUTION",
        scale: "SCALE"
      },
      subtext: {
        impact: "subscribers from a single article",
        retention: "T+30 retention improved",
        distribution: "external audience reached",
        scale: "subscribers supported"
      }
    },
    zh: {
      title: "从内容 → 结果",
      labels: {
        impact: "影响力",
        retention: "留存",
        distribution: "分发",
        scale: "规模"
      },
      subtext: {
        impact: "单篇内容带来的订阅增长",
        retention: "T+30 留存率提升",
        distribution: "触达的外部受众",
        scale: "支持的订阅规模"
      }
    }
  } as const;
  const t = i18n[language];

  const items = [
    { label: t.labels.impact, value: `${counts.impact}+`, subtext: t.subtext.impact },
    { label: t.labels.retention, value: `${counts.retentionStart}% → ${counts.retentionEnd}%`, subtext: t.subtext.retention },
    { label: t.labels.distribution, value: formatK(counts.distribution), subtext: t.subtext.distribution },
    { label: t.labels.scale, value: formatK(counts.scale), subtext: t.subtext.scale }
  ] as const;

  return (
    <Reveal>
      <section
        ref={sectionRef}
        id="proof-of-work"
        className={`relative mb-[120px] mt-[120px] ${
          isDark
            ? ""
            : "rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-6 py-10 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-x-0 -top-16 h-28 ${
            isDark
              ? "bg-[radial-gradient(circle_at_center,rgba(126,247,208,0.08),rgba(126,247,208,0)_70%)] opacity-40"
              : "bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.1),rgba(129,140,248,0)_72%)] opacity-30"
          }`}
        />
        <p className={`mb-8 text-center text-[12px] font-bold uppercase tracking-[0.12em] ${isDark ? "text-white/40" : "text-slate-900"}`}>{t.title}</p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <motion.article
              key={item.label}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group flex flex-col items-center justify-center gap-3 bg-transparent text-center transition duration-300 ease-out"
            >
              <p className={`text-[12px] font-medium uppercase tracking-[0.12em] ${isDark ? "text-white/[0.38]" : "text-slate-500"}`}>{item.label}</p>
              <motion.p
                key={`${item.label}-${animCycle}`}
                initial={{ opacity: 0.5, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, ease: "easeOut", delay: 0.04 }}
                className={valueClassName}
              >
                {item.value}
              </motion.p>
              <p className={`max-w-[220px] text-sm ${isDark ? "text-white/50" : "text-slate-600"}`}>{item.subtext}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

export function EducationSection({ education }: { education: PortfolioData["education"] }) {
  return (
    <Reveal>
      <section id="education" className="space-y-5 py-14">
        <h2 className="text-2xl font-semibold">Education</h2>
        <div className="space-y-3">
          {education.map((item) => (
            <div key={item.school} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
              <h3 className="text-base font-semibold text-slate-100">{item.school}</h3>
              <p className="text-sm text-slate-400">
                {item.degree} · {item.period}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

export function SkillsSection({ skills }: { skills: PortfolioData["skills"] }) {
  return (
    <Reveal>
      <section id="skills" className="space-y-6 py-14">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-300">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

export function AboutContentSection({
  language,
  education: _education
}: {
  language: Language;
  education: PortfolioData["education"];
}) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme !== "dark";
  const i18n = {
    en: {
      introTitle: "Content & Growth Operator",
      intro: [
        "5 years of experience in content editing and operations, specializing in turning complex information into structured, scalable content.",
        "From research and writing to distribution and performance feedback, I build end-to-end content growth loops."
      ],
      capabilityTitle: "Core Capabilities",
      educationTitle: "Education",
      educationItems: [
        {
          school: "Shanghai University of International Business and Economics",
          degree: "Finance | Master's Degree",
          period: "2016.09 - 2019.06"
        },
        {
          school: "Hangzhou City University",
          degree: "Finance | Bachelor's Degree",
          period: "2011.09 - 2015.09"
        }
      ],
      bubbles: [
        { label: "Information Filtering", tone: "content", size: 100, x: 15, y: 16 },
        { label: "Topic Planning", tone: "content", size: 100, x: 31, y: 15 },
        { label: "Long-form Writing", tone: "content", size: 100, x: 16, y: 35 },
        { label: "Narrative Design", tone: "content", size: 100, x: 32, y: 34 },
        { label: "Prompt Design", tone: "tools", size: 96, x: 50, y: 18 },
        { label: "AI Workflow", tone: "tools", size: 96, x: 67, y: 19 },
        { label: "SEO", tone: "growth", size: 128, x: 48, y: 45, lead: true },
        { label: "Distribution Strategy", tone: "growth", size: 118, x: 33, y: 56 },
        { label: "Content Conversion", tone: "growth", size: 118, x: 68, y: 52 },
        { label: "Data Review", tone: "growth", size: 92, x: 81, y: 52 },
        { label: "Community Reach", tone: "growth", size: 92, x: 13, y: 72 },
        { label: "Growth Experiments", tone: "growth", size: 92, x: 30, y: 73 },
        { label: "Visual Expression", tone: "design", size: 90, x: 47, y: 76 },
        { label: "Infographics", tone: "design", size: 90, x: 61, y: 76 },
        { label: "EN Reading", tone: "language", size: 84, x: 73, y: 77 },
        { label: "EN Writing", tone: "language", size: 84, x: 85, y: 77 },
        { label: "CET-6", tone: "language", size: 84, x: 85, y: 90 },
        { label: "Growing", tone: "evolving", size: 76, x: 83, y: 14, tip: "Exploring new skills continuously" }
      ]
    },
    zh: {
      introTitle: "内容与增长运营",
      intro: [
        "拥有五年内容编辑与内容运营经验，具备信息筛选、内容撰写与多渠道分发能力。",
        "同时熟悉社区运营与活动执行，能够从内容生产到传播及用户运营形成完整闭环。"
      ],
      capabilityTitle: "能力标签",
      educationTitle: "教育经历",
      educationItems: [
        {
          school: "上海对外经贸大学",
          degree: "金融学｜硕士",
          period: "2016.09 - 2019.06"
        },
        {
          school: "浙江大学城市学院",
          degree: "金融学｜本科",
          period: "2011.09 - 2015.09"
        }
      ],
      bubbles: [
        { label: "信息筛选", tone: "content", size: 100, x: 15, y: 16 },
        { label: "选题策划", tone: "content", size: 100, x: 31, y: 15 },
        { label: "长文写作", tone: "content", size: 100, x: 16, y: 35 },
        { label: "叙事构建", tone: "content", size: 100, x: 32, y: 34 },
        { label: "Prompt 设计", tone: "tools", size: 96, x: 50, y: 18 },
        { label: "AI 内容工作流", tone: "tools", size: 96, x: 67, y: 19 },
        { label: "SEO 优化", tone: "growth", size: 128, x: 48, y: 45, lead: true },
        { label: "分发策略设计", tone: "growth", size: 118, x: 33, y: 56 },
        { label: "内容转化", tone: "growth", size: 118, x: 68, y: 52 },
        { label: "数据复盘", tone: "growth", size: 92, x: 81, y: 52 },
        { label: "社区触达", tone: "growth", size: 92, x: 13, y: 72 },
        { label: "增长实验", tone: "growth", size: 92, x: 30, y: 73 },
        { label: "视觉表达", tone: "design", size: 90, x: 47, y: 76 },
        { label: "信息图设计", tone: "design", size: 90, x: 61, y: 76 },
        { label: "英文阅读", tone: "language", size: 84, x: 73, y: 77 },
        { label: "英文写作", tone: "language", size: 84, x: 85, y: 77 },
        { label: "CET-6", tone: "language", size: 84, x: 85, y: 90 },
        { label: "持续学习", tone: "evolving", size: 76, x: 83, y: 14, tip: "Exploring new skills continuously" }
      ]
    }
  } as const;
  const t = i18n[language];
  const bubbles = t.bubbles as readonly CapabilityBubble[];

  return (
    <section id="about-content" className="space-y-12 py-14">
      <Reveal>
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.08)] text-indigo-500 transition duration-200 hover:bg-[rgba(99,102,241,0.15)] hover:border-[rgba(99,102,241,0.4)] dark:relative dark:border-white/15 dark:bg-white/[0.03] dark:text-cyan-200 dark:shadow-[0_0_10px_rgba(99,102,241,0.22)] dark:hover:-translate-y-[1px] dark:hover:shadow-[0_0_14px_rgba(99,102,241,0.35)]">
              <span className="pointer-events-none absolute inset-0 hidden rounded-full dark:block dark:bg-[linear-gradient(135deg,rgba(34,211,238,0.22),rgba(99,102,241,0.2),rgba(168,85,247,0.18))]" />
              <Sparkles size={16} className="relative z-10 dark:text-cyan-200 dark:[filter:drop-shadow(0_0_6px_rgba(99,102,241,0.35))]" />
            </span>
            <h2 className="text-xl font-semibold tracking-wide text-slate-900 dark:text-slate-100">{t.introTitle}</h2>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-indigo-50 px-10 py-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] md:px-12 md:py-10 dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-900/55 dark:to-slate-900/35 dark:shadow-none">
            <div className="pointer-events-none absolute -left-16 top-0 h-44 w-44 rounded-full bg-brand-indigo/12 blur-3xl dark:bg-brand-indigo/20" />
            <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-brand-cyan/10 blur-3xl dark:bg-brand-cyan/15" />
            <div className="mx-auto max-w-[900px] space-y-3 text-sm leading-[1.7] text-slate-600 md:text-base dark:text-slate-300">
              {t.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.08)] text-emerald-500 transition duration-200 hover:bg-[rgba(16,185,129,0.15)] hover:border-[rgba(16,185,129,0.4)] dark:relative dark:border-white/15 dark:bg-white/[0.03] dark:text-emerald-300 dark:shadow-[0_0_10px_rgba(34,197,94,0.22)] dark:hover:-translate-y-[1px] dark:hover:shadow-[0_0_14px_rgba(34,197,94,0.35)]">
              <span className="pointer-events-none absolute inset-0 hidden rounded-full dark:block dark:bg-[linear-gradient(135deg,rgba(52,211,153,0.22),rgba(34,197,94,0.18))]" />
              <Layers3 size={16} className="relative z-10 dark:text-emerald-300 dark:[filter:drop-shadow(0_0_6px_rgba(34,197,94,0.35))]" />
            </span>
            <h3 className="text-xl font-semibold tracking-wide text-slate-900 dark:text-slate-100">{t.capabilityTitle}</h3>
          </div>
          <div className="relative min-h-[620px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-16 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-slate-900/35 dark:shadow-none">
            {bubbles.map((bubble, idx) => (
              (() => {
                const isContent =
                  bubble.label === "Topic Planning" ||
                  bubble.label === "选题策划" ||
                  bubble.label === "Narrative Design" ||
                  bubble.label === "叙事构建" ||
                  bubble.label === "Long-form Writing" ||
                  bubble.label === "长文写作" ||
                  bubble.label === "Information Filtering" ||
                  bubble.label === "信息筛选";
                const isGrowth =
                  bubble.label === "SEO" ||
                  bubble.label === "SEO 优化" ||
                  bubble.label === "Content Conversion" ||
                  bubble.label === "内容转化" ||
                  bubble.label === "Distribution Strategy" ||
                  bubble.label === "分发策略设计" ||
                  bubble.label === "Growth Experiments" ||
                  bubble.label === "增长实验" ||
                  bubble.label === "Data Review" ||
                  bubble.label === "数据复盘" ||
                  bubble.label === "Community Reach" ||
                  bubble.label === "社区触达";
                const isAI = bubble.label === "Prompt Design" || bubble.label === "Prompt 设计" || bubble.label === "AI Workflow" || bubble.label === "AI 内容工作流";
                const isLanguage =
                  bubble.label === "EN Reading" ||
                  bubble.label === "EN Writing" ||
                  bubble.label === "CET-6" ||
                  bubble.label === "英文阅读" ||
                  bubble.label === "英文写作";
                const isVisual =
                  bubble.label === "Visual Expression" ||
                  bubble.label === "视觉表达" ||
                  bubble.label === "Infographics" ||
                  bubble.label === "信息图设计";
                const isGrowing = bubble.label === "Growing" || bubble.label === "持续学习";
                const isSeo = bubble.label === "SEO" || bubble.label === "SEO 优化";

                return (
                  <motion.div
                    key={`${bubble.label}-${idx}`}
                    className={`group absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center leading-tight transition-all duration-300 ease-out hover:z-30 hover:[animation-play-state:paused] ${
                      isLight ? "text-[14px] font-medium" : bubble.size >= 118 ? "text-base" : bubble.size >= 100 ? "text-sm" : "text-xs"
                    } ${
                      isLight
                        ? isContent
                          ? "bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.15),transparent_70%),linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.4))] backdrop-blur-[6px] text-[#334155] shadow-[0_0_0_1px_rgba(168,85,247,0.2),0_8px_24px_rgba(168,85,247,0.12)]"
                          : isGrowth
                            ? `bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_70%),linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.4))] backdrop-blur-[6px] ${isSeo ? "font-semibold text-[#0f172a] shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_8px_24px_rgba(59,130,246,0.16)]" : "text-[#334155] shadow-[0_0_0_1px_rgba(59,130,246,0.2),0_8px_24px_rgba(59,130,246,0.12)]"}`
                            : isAI
                              ? "bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.15),transparent_70%),linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.4))] backdrop-blur-[6px] text-[#334155] shadow-[0_0_0_1px_rgba(245,158,11,0.2),0_8px_24px_rgba(245,158,11,0.12)]"
                              : isLanguage
                                ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.4))] backdrop-blur-[6px] text-[#64748b] shadow-[0_0_0_1px_rgba(148,163,184,0.18),0_8px_24px_rgba(15,23,42,0.06)]"
                                : isVisual
                                  ? "bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.15),transparent_70%),linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.4))] backdrop-blur-[6px] text-[#334155] shadow-[0_0_0_1px_rgba(34,211,238,0.2),0_8px_24px_rgba(34,211,238,0.12)]"
                                  : isGrowing
                                    ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.4))] backdrop-blur-[6px] text-[#64748b] shadow-[0_0_0_1px_rgba(148,163,184,0.35),0_8px_24px_rgba(15,23,42,0.06)]"
                                    : "bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.4))] backdrop-blur-[6px] text-[#334155] shadow-[0_0_0_1px_rgba(99,102,241,0.15),0_8px_24px_rgba(15,23,42,0.06)]"
                        : bubble.tone === "content"
                    ? `border-violet-300/25 bg-[radial-gradient(circle_at_35%_30%,rgba(167,139,250,0.3),rgba(91,33,182,0.25)_55%,rgba(15,23,42,0.45)_100%)] text-violet-100 ${
                        bubble.lead ? "shadow-[0_0_18px_rgba(139,92,246,0.3)]" : "shadow-[0_0_10px_rgba(139,92,246,0.18)]"
                      } hover:shadow-[0_0_38px_rgba(139,92,246,0.62)] active:shadow-[0_0_46px_rgba(139,92,246,0.75)] hover:brightness-110`
                    : bubble.tone === "growth"
                      ? `border-emerald-300/25 bg-[radial-gradient(circle_at_35%_30%,rgba(74,222,128,0.3),rgba(22,101,52,0.24)_55%,rgba(15,23,42,0.45)_100%)] text-emerald-100 ${
                          bubble.lead ? "shadow-[0_0_20px_rgba(34,197,94,0.32)]" : "shadow-[0_0_12px_rgba(34,197,94,0.2)]"
                        } hover:shadow-[0_0_38px_rgba(34,197,94,0.62)] active:shadow-[0_0_46px_rgba(34,197,94,0.75)] hover:brightness-110`
                      : bubble.tone === "tools"
                        ? `border-[rgba(251,191,36,0.38)] bg-[radial-gradient(circle_at_35%_30%,rgba(251,191,36,0.32),rgba(146,64,14,0.28)_55%,rgba(15,23,42,0.45)_100%)] text-amber-100 ${
                            bubble.lead ? "shadow-[0_0_28px_rgba(251,146,60,0.3)]" : "shadow-[0_0_18px_rgba(251,146,60,0.22)]"
                          } hover:shadow-[0_0_38px_rgba(251,146,60,0.56)] active:shadow-[0_0_46px_rgba(251,146,60,0.7)] hover:brightness-110`
                        : bubble.tone === "design"
                          ? `border-blue-300/25 bg-[radial-gradient(circle_at_35%_30%,rgba(96,165,250,0.28),rgba(30,64,175,0.24)_55%,rgba(15,23,42,0.45)_100%)] text-blue-100 ${
                              bubble.lead ? "shadow-[0_0_20px_rgba(59,130,246,0.34)]" : "shadow-[0_0_12px_rgba(59,130,246,0.22)]"
                            } hover:shadow-[0_0_38px_rgba(59,130,246,0.62)] active:shadow-[0_0_46px_rgba(59,130,246,0.75)] hover:brightness-110`
                          : bubble.tone === "evolving"
                            ? "z-[1] border-[rgba(167,139,250,0.22)] bg-[radial-gradient(circle_at_35%_30%,rgba(167,139,250,0.18),rgba(71,85,105,0.18)_60%,rgba(15,23,42,0.5)_100%)] text-slate-200/70 shadow-[0_0_18px_rgba(167,139,250,0.16)] hover:shadow-[0_0_26px_rgba(167,139,250,0.32)] hover:text-slate-100/90 hover:opacity-90"
                            : `border-[rgba(226,232,240,0.28)] bg-[radial-gradient(circle_at_35%_30%,rgba(226,232,240,0.24),rgba(100,116,139,0.22)_55%,rgba(15,23,42,0.48)_100%)] text-slate-100 ${
                                bubble.lead ? "shadow-[0_0_22px_rgba(226,232,240,0.18)]" : "shadow-[0_0_14px_rgba(226,232,240,0.12)]"
                              } hover:shadow-[0_0_34px_rgba(226,232,240,0.34)] active:shadow-[0_0_40px_rgba(226,232,240,0.44)] hover:brightness-110`
                    } ${isLight ? "hover:shadow-[0_0_0_1px_rgba(99,102,241,0.25),0_16px_40px_rgba(15,23,42,0.12)]" : ""}`}
                    style={{
                      left: `${bubble.x}%`,
                      top: `${bubble.y}%`,
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      animationDelay: `${idx * 0.17}s`
                    }}
                    animate={{ y: [0, -4, 0, 4, 0] }}
                    transition={{ duration: 4 + (idx % 4), repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{
                      scale: isLight ? 1.05 : bubble.tone === "evolving" ? 1.1 : 1.12,
                      y: isLight ? -6 : -6,
                      transition: { duration: 0.25, ease: "easeOut" }
                    }}
                    whileTap={{
                      scale: 1.25,
                      y: -8,
                      transition: { duration: 0.15, ease: "easeOut" }
                    }}
                  >
                    <span
                      className="max-w-[70%] text-center leading-tight whitespace-normal break-normal [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden"
                    >
                      {bubble.label}
                    </span>
                    {bubble.tone === "evolving" && bubble.tip ? (
                      <span className="pointer-events-none absolute left-1/2 top-full z-40 mt-2 hidden w-max max-w-[220px] -translate-x-1/2 rounded-md border border-slate-300/20 bg-slate-900/85 px-2.5 py-1.5 text-[11px] leading-4 text-slate-200 shadow-[0_0_14px_rgba(15,23,42,0.45)] group-hover:block">
                        {bubble.tip}
                      </span>
                    ) : null}
                  </motion.div>
                );
              })()
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.08)] text-amber-500 transition duration-200 hover:bg-[rgba(245,158,11,0.15)] hover:border-[rgba(245,158,11,0.4)] dark:relative dark:border-white/15 dark:bg-white/[0.03] dark:text-amber-300 dark:shadow-[0_0_10px_rgba(245,158,11,0.22)] dark:hover:-translate-y-[1px] dark:hover:shadow-[0_0_14px_rgba(245,158,11,0.35)]">
              <span className="pointer-events-none absolute inset-0 hidden rounded-full dark:block dark:bg-[linear-gradient(135deg,rgba(251,191,36,0.22),rgba(245,158,11,0.18))]" />
              <GraduationCap size={16} className="relative z-10 dark:text-amber-300 dark:[filter:drop-shadow(0_0_6px_rgba(245,158,11,0.35))]" />
            </span>
            <h3 className="text-xl font-semibold tracking-wide text-slate-900 dark:text-slate-100">{t.educationTitle}</h3>
          </div>
          <div className="space-y-4">
            {t.educationItems.map((item) => (
              <div key={item.school} className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.015] dark:shadow-none">
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.school}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.degree}</p>
                <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">{item.period}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </section>
  );
}

export function PortfolioSection({ portfolio }: { portfolio: PortfolioData["portfolio"] }) {
  const [active, setActive] = useState<PortfolioData["portfolio"][number] | null>(null);

  return (
    <Reveal>
      <section id="portfolio" className="space-y-8 py-20">
        <h2 className="text-3xl font-semibold">Portfolio</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {portfolio.map((item) => (
            <button key={item.title} onClick={() => setActive(item)} className="group relative overflow-hidden rounded-2xl border border-white/10 text-left">
              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={800}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 transition group-hover:opacity-100" />
              <p className="absolute bottom-4 left-4 text-white opacity-0 transition group-hover:opacity-100">{item.title}</p>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-50 grid place-items-center bg-black/65 p-6"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass max-w-xl rounded-2xl p-6"
              >
                <h3 className="text-2xl font-semibold">{active.title}</h3>
                <p className="mt-3 text-slate-300">{active.description}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </Reveal>
  );
}

export function ProfilePortfolioSection({ language }: { language: Language }) {
  const [activeCategory, setActiveCategory] = useState<ProfileCategory>("all");
  const [activeBanner, setActiveBanner] = useState(0);
  const [isBannerPaused, setIsBannerPaused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const categories: ProfileCategory[] = ["all", "项目", "盘点", "活动", "采访", "技术"];
  const i18n = {
    en: {
      title: "Content Hub",
      all: "All",
      categoryLabels: {
        项目: "Projects",
        盘点: "Interviews",
        活动: "Events",
        采访: "Interviews",
        技术: "Tech"
      },
      bannerDotAria: "Go to banner",
      bannerImageAlt: "Banner image",
      empty: "No content in this category yet.",
      previous: "Previous",
      next: "Next",
      page: "Page"
    },
    zh: {
      title: "内容笔记",
      all: "全部",
      categoryLabels: {
        项目: "项目",
        盘点: "盘点",
        活动: "活动",
        采访: "采访",
        技术: "技术"
      },
      bannerDotAria: "切换到横幅",
      bannerImageAlt: "横幅图片",
      empty: "当前分类下暂无内容。",
      previous: "上一页",
      next: "下一页",
      page: "第"
    }
  } as const;
  const t = i18n[language];
  const postLocaleMap: Record<
    string,
    {
      en: { title: string; summary: string; tags: string[] };
      zh: { title: string; summary: string; tags: string[] };
    }
  > = {
    "meme-research-navigation": {
      en: {
        title: "Meme Research Playbook: How to Navigate the Cycle",
        summary: "How to evaluate meme projects with short lifecycles and extreme volatility.",
        tags: ["Meme", "Data", "Interviews"]
      },
      zh: {
        title: "【投研导航】meme 热潮冷思考：该如何玩转？数据分析｜投资逻辑｜实用工具",
        summary: "面对生命周期极短且价格波动巨大的 meme 项目，究竟该如何选择和评估？",
        tags: ["meme", "数据", "盘点"]
      }
    },
    "erc-5169-tokenscript-smart-layer": {
      en: {
        title: "Why ERC-5169 and TokenScript Need Smart Layer",
        summary: "How token-centric architecture drives Web3 structural evolution.",
        tags: ["Middleware", "Airdrop", "Project"]
      },
      zh: {
        title: "ERC-5169 和 TokenScript 为何需要 Smart Layer？",
        summary: "以代币为中心的架构如何带来 Web3 结构演变？",
        tags: ["中间件", "空投", "项目介绍"]
      }
    },
    "chainfeeds-ario-campaign": {
      en: {
        title: "ChainFeeds Reward Season #2: Earn AR.IO On-chain Points",
        summary: "Campaign starts on Oct 30, 2024. First come, first served.",
        tags: ["AR.IO", "Event"]
      },
      zh: {
        title: "ChainFeeds 回馈季第二期：参与获取 AR.IO 链上积分",
        summary: "活动将于 2024 年 10 月 30 日开启，先到先得。",
        tags: ["AR.IO", "活动"]
      }
    },
    "dialogue-gulu-ethereum-endgame": {
      en: {
        title: "Dialogue with Gulu: Ethereum Endgame and the Final Winner",
        summary: "Layer1 + Layer2, non-sovereign space, and evolving transaction paradigms.",
        tags: ["DeFi", "Ethereum", "Viewpoint"]
      },
      zh: {
        title: "对话咕噜：以太坊终局解读，以太坊真的胜出了吗？",
        summary: "Layer1 + Layer2、非国家空间、交易范式演进",
        tags: ["DeFi", "以太坊", "观点"]
      }
    },
    "dialogue-taiko-mainnet-roadmap": {
      en: {
        title: "Dialogue with Taiko: Post-mainnet Roadmap and Ethereum Endgame",
        summary: "Before launch, Vitalik proposed the first block and shared launch expectations.",
        tags: ["Taiko", "Ethereum", "Viewpoint"]
      },
      zh: {
        title: "对话 Taiko：主网上线后将如何发展？与以太坊终局有何关联？",
        summary: "主网上线前，Vitalik Buterin 作为区块提议者 propose 了首个区块，并附言期待其主网上线。",
        tags: ["Taiko", "以太坊", "观点"]
      }
    },
    "nillion-privacy-computing-2025": {
      en: {
        title: "Nillion Blind Compute: Defining Privacy Computing in 2025",
        summary: "A deep dive into architecture, product path, and ecosystem strategy.",
        tags: ["Nillion", "Privacy", "Viewpoint"]
      },
      zh: {
        title: "Nillion 盲计算：定义 2025 隐私计算新未来",
        summary: "Nillion 核心团队围绕技术架构、产品路径与生态策略进行解读，并分享其对隐私计算未来发展的最新见解。",
        tags: ["Nillion", "隐私计算", "观点"]
      }
    },
    "wspn-stablecoin-2": {
      en: {
        title: "WSPN on Stablecoin 2.0: A New Era Ahead?",
        summary: "All efforts converge on one goal: maximizing user value.",
        tags: ["WSPN", "Stablecoin", "Viewpoint"]
      },
      zh: {
        title: "WSPN 谈「稳定币 2.0」：能否开启稳定币市场新纪元？",
        summary: "所有努力最终都指向一个核心目标：最大化用户体验价值。",
        tags: ["WSPN", "稳定币", "观点"]
      }
    },
    "based-rollup-preconfs": {
      en: {
        title: "Why Based Rollups Need Preconfirmations",
        summary: "How preconfirmations improve UX and liquidity efficiency.",
        tags: ["Based Rollup", "Preconfs", "Tech"]
      },
      zh: {
        title: "为什么 Based Rollup 需要预确认（Preconfs）技术？",
        summary: "预确认机制如何提升 Rollup 用户体验与流动性效率。",
        tags: ["Based Rollup", "预确认", "技术"]
      }
    },
    "risc-zero-zk": {
      en: {
        title: "RISC Zero Product Matrix: Powering Ethereum's ZK Future",
        summary: "How the new zkVM approach enables flexible, app-level precompiles.",
        tags: ["ZK", "Project", "zkVM"]
      },
      zh: {
        title: "解密 RISC Zero 产品矩阵：如何助力以太坊迈向 ZK 化未来？",
        summary: "近日，RISC Zero zkVM 发布了 1.2 版本，引入了一种全新的预编译方式，允许开发者将预编译逻辑与应用程序一起部署，而无需内置于 zkVM 本身。",
        tags: ["ZK", "项目介绍", "zkVM"]
      }
    },
    "orb-land-600": {
      en: {
        title: "Orb Land Crypto Experiment: Can 600% Harberger Tax Work?",
        summary: "A provocative test of tokenized access to personal consulting.",
        tags: ["NFT", "Crypto Economy", "Project"]
      },
      zh: {
        title: "加密经济实验 Orb Land：600% 哈伯格税能否实现个人咨询服务？",
        summary: "你愿意支付多少 ETH 以向 Taproot Wizards 发起人 Eric Wall 咨询一个问题？",
        tags: ["NFT", "加密经济", "项目介绍"]
      }
    },
    "lrt-puffer": {
      en: {
        title: "From LRT Protocol to Infra Provider: Puffer's Ethereum Alignment",
        summary: "How Puffer's product evolution aligns with Ethereum's long-term vision.",
        tags: ["LRT", "DeFi", "Project"]
      },
      zh: {
        title: "从 LRT 协议到去中心化基础设施供应商：Puffer 如何对齐以太坊生态？",
        summary: "Puffer 在设计和产品演进中始终践行了与以太坊一致的原则，并展现了对以太坊长期愿景的支持。",
        tags: ["LRT", "DeFi", "项目介绍"]
      }
    },
    "ckb-layer2": {
      en: {
        title: "CKB's Return to Bitcoin Layer2: Hype or Opportunity?",
        summary: "A review of CKB's past, present, and future path.",
        tags: ["Bitcoin", "Layer2", "Project"]
      },
      zh: {
        title: "重返初心：CKB 转向比特币 Layer2 赛道，炒作还是机遇？",
        summary: "CKB 的过去、现在和未来",
        tags: ["比特币", "Layer2", "项目介绍"]
      }
    },
    "symbiotic-thin-coordination-layer": {
      en: {
        title: "Symbiotic Architecture: A Flexible, Permissionless Coordination Layer",
        summary: "Can Symbiotic challenge EigenLayer's current dominance?",
        tags: ["Symbiotic", "DeFi", "Project"]
      },
      zh: {
        title: "Symbiotic 架构简析：灵活且无需许可的 Thin Coordination Layer",
        summary: "获 Lido 和 Paradigm 支持，Symbiotic 能否打破 EigenLayer 一家独大的局面？",
        tags: ["Symbiotic", "DeFi", "项目介绍"]
      }
    },
    "the-graph-ai-web3": {
      en: {
        title: "How The Graph Expands into AI-Native Web3 Infrastructure",
        summary: "What it takes to make dApps more AI-ready.",
        tags: ["AI", "Infrastructure", "Project"]
      },
      zh: {
        title: "The Graph 如何扩展为 AI 驱动的 Web3 基础设施？",
        summary: "如何让 dApp 更易于集成 AI 技术？",
        tags: ["AI", "基础设施", "项目介绍"]
      }
    },
    "dex-orderbook-evolution": {
      en: {
        title: "Orderbook DEX Evolution: A 10-Year Retrospective",
        summary: "As throughput scales, decentralized trading may return to orderbooks.",
        tags: ["DeGate", "DEX", "Interviews"]
      },
      zh: {
        title: "订单簿 DEX 演进之路：这十年都有哪些变化？",
        summary: "随着链的吞吐量提升，去中心化交易最终将回归至订单薄模式",
        tags: ["DeGate", "DEX", "盘点"]
      }
    },
    "layer2-midyear-review": {
      en: {
        title: "Layer2 Mid-Year Interviews: Is the Growth Real?",
        summary: "Data review of Arbitrum, Optimism, zkSync, Starknet, Base, Taiko, and Scroll.",
        tags: ["Layer2", "Data", "Interviews"]
      },
      zh: {
        title: "Layer2 赛道年中回顾：增长数据是真是假？",
        summary: "Arbitrum、Optimism、zkSync、Starknet、Base、Taiko 及 Scroll",
        tags: ["Layer2", "数据", "盘点"]
      }
    },
    "fuel-ecosystem-overview": {
      en: {
        title: "Fuel Network Ecosystem Overview Before Mainnet",
        summary: "A snapshot of ecosystem progress and key projects.",
        tags: ["Ecosystem", "Fuel", "Interviews"]
      },
      zh: {
        title: "主网上线在即，Fuel Network 生态大盘点",
        summary: "Fuel 生态当前发展情况与核心项目梳理",
        tags: ["生态", "Fuel", "盘点"]
      }
    },
    "ethshanghai-wrap-up": {
      en: {
        title: "ETHShanghai Wrap-up: Exploring Ethereum App Futures",
        summary: "Conference highlights on Web3 trends and practical adoption.",
        tags: ["ETHShanghai", "Ethereum", "Event"]
      },
      zh: {
        title: "ETHShanghai 圆满落幕！共话以太坊应用的未来新篇章！",
        summary: "大会期间深入探讨 Web3 生态未来趋势与应用落地。",
        tags: ["ETHShanghai", "以太坊", "活动"]
      }
    },
    "tee-privacy-outlook": {
      en: {
        title: "TEE Revisited: A New Path for Privacy Tech?",
        summary: "TEE's practical opportunity amid MPC and ZK limitations.",
        tags: ["TEE", "Privacy", "Tech"]
      },
      zh: {
        title: "TEE 再度热议：隐私技术发展困境中的新曙光？",
        summary: "TEE 在 MPC 与 ZK 限制下的现实机会。",
        tags: ["TEE", "隐私", "技术"]
      }
    },
    "fuel-efficient-execution-layer": {
      en: {
        title: "Fuel's Path to the Most Efficient Execution Layer",
        summary: "Why Fuel's architecture stays flexible across chain configurations.",
        tags: ["Rollup", "Execution Layer", "Project"]
      },
      zh: {
        title: "致力于成为最高效执行层，Fuel 做对了哪些事情？",
        summary: "Fuel 专注于避免状态增长，并且不局限于任何一种配置，无论是主权 Rollup、结算链还是单体链。",
        tags: ["Rollup", "执行层", "项目介绍"]
      }
    }
  };
  const withLocale = (post: (typeof profilePosts)[number]) => {
    const locale = postLocaleMap[post.slug]?.[language];
    if (!locale) return post;
    return { ...post, title: locale.title, summary: locale.summary, tags: locale.tags };
  };
  const bannerItems = profilePosts;
  const activeBannerItem = bannerItems[activeBanner];
  const localizedActiveBannerItem = activeBannerItem ? withLocale(activeBannerItem) : null;
  const bannerHref = activeBannerItem?.link ?? (activeBannerItem ? `/articles/${activeBannerItem.slug}` : "#");
  const bannerIsExternal = Boolean(activeBannerItem?.link);
  const filteredPosts =
    activeCategory === "all" ? profilePosts : profilePosts.filter((post) => post.category === activeCategory);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE));
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    if (isBannerPaused || bannerItems.length <= 1) return;
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % bannerItems.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [isBannerPaused, bannerItems.length]);

  useEffect(() => {
    if (activeBanner >= bannerItems.length) {
      setActiveBanner(0);
    }
  }, [activeBanner, bannerItems.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const dotIndexes = Array.from({ length: 5 }, (_, idx) => idx);
  const activeDot = activeBanner % 5;

  return (
    <section id="profile-portfolio" className="space-y-8 py-10 md:py-12">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-cyan-600 shadow-[0_2px_8px_rgba(15,23,42,0.05)] dark:border-white/12 dark:bg-white/[0.03] dark:text-cyan-200/85 dark:shadow-none">
          <BookOpen size={18} />
        </span>
        <h2 className="text-3xl font-semibold tracking-wide text-slate-900 dark:text-slate-100">{t.title}</h2>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.article
            key={activeBannerItem?.slug ?? "empty-banner"}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0, scale: 1.01 }}
            exit={{ opacity: 0, x: -8, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onMouseEnter={() => setIsBannerPaused(true)}
            onMouseLeave={() => setIsBannerPaused(false)}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:border-white/20 dark:bg-slate-900/40 dark:shadow-none"
          >
            <Link
              href={bannerHref}
              target={bannerIsExternal ? "_blank" : undefined}
              rel={bannerIsExternal ? "noopener noreferrer" : undefined}
              className="block"
            >
              {activeBannerItem?.cover || activeBannerItem?.image ? (
                <Image
                  src={activeBannerItem?.cover || activeBannerItem?.image || ""}
                  alt={localizedActiveBannerItem?.title ?? t.bannerImageAlt}
                  width={1600}
                  height={900}
                  className="h-64 w-full object-cover md:h-72"
                />
              ) : (
                <div className="relative h-64 w-full overflow-hidden bg-slate-800/80 md:h-72">
                  <div className="absolute -left-10 top-8 h-32 w-32 rounded-full bg-brand-indigo/40 blur-2xl" />
                  <div className="absolute right-2 top-6 h-28 w-28 rounded-full bg-brand-cyan/35 blur-2xl" />
                  <div className="absolute inset-x-16 bottom-10 h-14 rounded-full bg-white/5 blur-xl" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-semibold text-white">{localizedActiveBannerItem?.title}</h3>
                <p className="mt-2 max-w-2xl text-sm text-slate-200">{localizedActiveBannerItem?.summary}</p>
              </div>
            </Link>
          </motion.article>
        </AnimatePresence>

        <div className="relative -mt-1 flex items-center justify-center pt-1">
          <div className="flex items-center justify-center gap-2 rounded-full bg-white/70 px-3 py-1.5 backdrop-blur-sm dark:bg-transparent dark:px-0 dark:py-0 dark:backdrop-blur-0">
          {dotIndexes.map((idx) => (
            <button
              key={`${idx}-${bannerItems[idx]?.slug ?? "dot"}`}
              onClick={() => setActiveBanner(idx)}
              onMouseEnter={() => {
                setActiveBanner(idx);
                setIsBannerPaused(true);
              }}
              onFocus={() => setActiveBanner(idx)}
              onMouseLeave={() => setIsBannerPaused(false)}
              aria-label={`${t.bannerDotAria} ${idx + 1}`}
              aria-current={activeDot === idx}
              aria-pressed={activeDot === idx}
              className={`rounded-full transition duration-200 ${
                activeDot === idx
                  ? "h-2 w-5 bg-[linear-gradient(90deg,#22d3ee,#818cf8)] opacity-100 shadow-[0_4px_12px_rgba(99,102,241,0.25)] dark:h-2.5 dark:w-6 dark:bg-white dark:shadow-[0_0_10px_rgba(99,102,241,0.45)]"
                  : "h-2 w-2 bg-slate-300 opacity-100 hover:bg-slate-400 focus-visible:bg-slate-400 dark:h-2.5 dark:w-2.5 dark:bg-white dark:opacity-40 dark:hover:scale-110 dark:hover:bg-white dark:hover:opacity-80 dark:hover:shadow-[0_0_10px_rgba(99,102,241,0.35)]"
              }`}
            />
          ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-4 py-1.5 text-sm transition duration-200 ${
              activeCategory === category
                ? "border-slate-300 bg-slate-100 text-slate-900 dark:border-white/20 dark:bg-white/10 dark:text-slate-100"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300 dark:hover:bg-white/[0.06]"
            }`}
          >
            {category === "all" ? t.all : t.categoryLabels[category]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${currentPage}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {paginatedPosts.map((post) => {
            const localizedPost = withLocale(post);
            const href = post.link ?? `/articles/${post.slug}`;
            const isExternal = Boolean(post.link);
            const coverSrc = post.cover || post.image || null;
            return (
              <Link
                key={post.slug}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition duration-300 hover:scale-[1.015] hover:border-brand-indigo/30 hover:shadow-[0_14px_30px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-900/35 dark:shadow-none dark:hover:border-brand-indigo/40 dark:hover:shadow-[0_14px_40px_rgba(2,8,23,0.35)]"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  {coverSrc ? (
                    <Image src={coverSrc} alt={localizedPost.title} width={1200} height={900} className="h-[180px] w-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="relative h-[180px] w-full overflow-hidden bg-slate-800/80">
                      <div className="absolute -left-10 top-4 h-28 w-28 rounded-full bg-brand-indigo/40 blur-2xl" />
                      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-brand-cyan/35 blur-2xl" />
                      <div className="absolute inset-x-10 bottom-5 h-10 rounded-full bg-white/5 blur-xl" />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-black/20" />
                </div>
                <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
                <div className="relative p-5">
                  <h3
                    className="text-xl font-semibold leading-[1.35] text-slate-900 transition duration-200 group-hover:text-slate-700 dark:text-slate-100 dark:group-hover:text-slate-50"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {localizedPost.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{localizedPost.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {localizedPost.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brand-indigo/15 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              </Link>
            );
          })}
        </motion.div>
      </AnimatePresence>
      {filteredPosts.length > 0 && (
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition duration-200 enabled:hover:-translate-y-0.5 enabled:hover:border-slate-300 enabled:hover:bg-slate-50 enabled:hover:shadow-[0_0_14px_rgba(99,102,241,0.18)] disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/12 dark:bg-white/[0.02] dark:text-slate-300 dark:enabled:hover:border-white/20 dark:enabled:hover:bg-white/[0.06] dark:enabled:hover:shadow-[0_0_14px_rgba(99,102,241,0.24)]"
          >
            {t.previous}
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t.page} {currentPage} / {totalPages}
          </p>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition duration-200 enabled:hover:-translate-y-0.5 enabled:hover:border-slate-300 enabled:hover:bg-slate-50 enabled:hover:shadow-[0_0_14px_rgba(99,102,241,0.18)] disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/12 dark:bg-white/[0.02] dark:text-slate-300 dark:enabled:hover:border-white/20 dark:enabled:hover:bg-white/[0.06] dark:enabled:hover:shadow-[0_0_14px_rgba(99,102,241,0.24)]"
          >
            {t.next}
          </button>
        </div>
      )}
      {filteredPosts.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-400 dark:shadow-none">
          {t.empty}
        </div>
      )}
    </section>
  );
}

export function FooterSection({
  choice,
  onChoiceChange,
  language
}: {
  choice: "hire" | "regret" | null;
  onChoiceChange: (next: "hire" | "regret") => void;
  language: Language;
}) {
  const [hovered, setHovered] = useState<"hire" | "regret" | null>(null);
  const [talkBurst, setTalkBurst] = useState<{
    id: number;
    count: number;
    spread: number;
    duration: number;
    originX: number;
    originY: number;
  } | null>(null);
  const [showNiceChoice, setShowNiceChoice] = useState(false);
  const [laterHover, setLaterHover] = useState(false);
  const [lastBurstAt, setLastBurstAt] = useState(0);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const i18n = {
    en: {
      title: "still here?",
      hire: "let's talk",
      regret: "or maybe later",
      regretHover: "you sure?",
      niceChoice: "nice choice :)"
    },
    zh: {
      title: "既然看到这里了",
      hire: "和我聊聊",
      regret: "再逛逛",
      regretHover: "确定吗？",
      niceChoice: "这个选择很不错 :)"
    }
  } as const;
  const t = i18n[language];
  const hireLabel = t.hire;
  const regretLabel = laterHover ? t.regretHover : t.regret;

  const fireConfetti = (
    opts: Partial<{
      count: number;
      spread: number;
      duration: number;
      force: boolean;
      originX: number;
      originY: number;
    }> = {}
  ) => {
    const now = Date.now();
    if (!opts.force && now - lastBurstAt < 700) return;
    setLastBurstAt(now);
    setTalkBurst({
      id: now,
      count: opts.count ?? 96,
      spread: opts.spread ?? 95,
      duration: opts.duration ?? 1.1,
      originX: opts.originX ?? 50,
      originY: opts.originY ?? 58
    });
  };

  const handleTalkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onChoiceChange("hire");
    const ctaRect = ctaRef.current?.getBoundingClientRect();
    const btnRect = event.currentTarget.getBoundingClientRect();
    const originX = ctaRect ? ((btnRect.left + btnRect.width / 2 - ctaRect.left) / ctaRect.width) * 100 : 50;
    const originY = ctaRect ? ((btnRect.top + btnRect.height / 2 - ctaRect.top) / ctaRect.height) * 100 : 58;
    fireConfetti({ count: 132, spread: 112, duration: 1.25, force: true, originX, originY });
    setShowNiceChoice(true);
    setTimeout(() => setShowNiceChoice(false), 1000);
  };

  return (
    <footer className="mb-20 mt-12 border-0 border-t border-x-0 border-slate-200/60 bg-transparent outline-none dark:border-transparent dark:bg-transparent">
      <motion.div
        ref={ctaRef}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        className="relative mx-auto flex min-h-[240px] w-full max-w-4xl flex-col items-center justify-center gap-10 overflow-visible px-10 py-12 text-center"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.10),transparent_55%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_50%_42%,rgba(99,102,241,0.16),rgba(56,189,248,0.08)_35%,rgba(2,8,23,0)_72%)]" />
        <AnimatePresence>
          {talkBurst && (
            <motion.div
              key={talkBurst.id}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: talkBurst.duration }}
              className="pointer-events-none absolute inset-0"
            >
              {Array.from({ length: talkBurst.count }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0.9, opacity: 1 }}
                  animate={{
                    x: Math.cos((i / talkBurst.count) * Math.PI * 2) * (talkBurst.spread + (i % 9) * 14),
                    y: -Math.abs(Math.sin((i / talkBurst.count) * Math.PI * 2) * (talkBurst.spread + (i % 6) * 18)) - (i % 5) * 12,
                    scale: 0.15,
                    opacity: 0
                  }}
                  transition={{ duration: talkBurst.duration, ease: "easeOut", delay: (i % 12) * 0.01 }}
                  className={`absolute left-1/2 top-[58%] h-1.5 w-1.5 rounded-full ${
                    i % 3 === 0 ? "bg-brand-cyan" : i % 3 === 1 ? "bg-brand-indigo" : "bg-violet-300"
                  }`}
                  style={{ left: `${talkBurst.originX}%`, top: `${talkBurst.originY}%` }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.h3
          animate={{ opacity: [0.9, 1, 0.9], backgroundPositionX: ["0%", "100%", "0%"] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          className="bg-[linear-gradient(90deg,#22d3ee,#818cf8)] bg-[length:200%_100%] bg-clip-text text-3xl font-bold text-transparent dark:bg-[linear-gradient(90deg,#a78bfa,#60a5fa,#22d3ee)] dark:font-semibold"
        >
                  <span>{t.title}</span>
                  {language === "zh" ? (
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[linear-gradient(90deg,#a78bfa,#22d3ee)] align-middle shadow-[0_0_10px_rgba(96,165,250,0.45)] animate-pulse" />
                  ) : null}
        </motion.h3>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <div className="relative">
            <motion.a
              href="https://t.me/zoeyzz0"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered("hire")}
              onMouseLeave={() => setHovered(null)}
              onHoverStart={() => fireConfetti({ count: 96, spread: 98, duration: 1.1 })}
              onClick={handleTalkClick}
              animate={{
                scale: choice === "hire" ? 1.03 : 1,
                opacity: choice && choice !== "hire" ? 0.45 : 1,
                y: -1
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`rounded-full border px-7 py-3 text-lg font-medium transition duration-200 ${
                choice === "hire"
                  ? "border-transparent bg-[linear-gradient(90deg,#22d3ee,#818cf8)] text-white shadow-[0_8px_24px_rgba(99,102,241,0.25)] dark:border-white/20 dark:bg-white/10 dark:text-slate-100 dark:shadow-[0_0_18px_rgba(99,102,241,0.4)]"
                  : "border-transparent bg-[linear-gradient(90deg,#22d3ee,#818cf8)] text-white shadow-[0_8px_24px_rgba(99,102,241,0.25)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(99,102,241,0.35)] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300 dark:hover:translate-y-0 dark:hover:bg-white/[0.1] dark:hover:text-white dark:hover:shadow-[0_0_32px_rgba(99,102,241,0.5)]"
              }`}
            >
              {hireLabel}
            </motion.a>
          </div>
          <motion.button
            onMouseEnter={() => setHovered("regret")}
            onMouseLeave={() => {
              setHovered(null);
              setLaterHover(false);
            }}
            onClick={() => onChoiceChange("regret")}
            onHoverStart={() => setLaterHover(true)}
            onHoverEnd={() => setLaterHover(false)}
            animate={{
              scale: choice === "regret" ? 1.03 : 1,
              opacity: laterHover ? 0.55 : choice && choice !== "regret" ? 0.4 : 1,
              y: laterHover ? -2 : 1,
              x: 0
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`rounded-full border px-7 py-3 text-lg font-medium transition duration-200 ${
              choice === "regret"
                ? "border-slate-300 bg-transparent text-slate-800 shadow-[0_4px_14px_rgba(15,23,42,0.08)] dark:border-white/20 dark:bg-white/10 dark:text-slate-100 dark:shadow-[0_0_18px_rgba(99,102,241,0.28)]"
                : "border-slate-300 bg-transparent text-slate-700 hover:scale-[0.97] hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300 dark:hover:scale-[0.95] dark:hover:border-white/[0.04] dark:hover:bg-transparent dark:hover:text-slate-500 dark:hover:blur-[0.3px]"
            }`}
          >
            {regretLabel}
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          {showNiceChoice && (
            <motion.p
              key="nice-choice"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="text-base text-slate-600 dark:text-zinc-300"
            >
                      {t.niceChoice}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </footer>
  );
}
