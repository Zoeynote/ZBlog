import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ParticleBg } from "@/components/ui/particle-bg";
import { ScrollTopProgressButton } from "@/components/ui/scroll-top-progress-button";

export const metadata: Metadata = {
  title: "Portfolio | Premium Personal Website",
  description: "Modern personal portfolio with Next.js, Tailwind and Framer Motion.",
  keywords: ["portfolio", "next.js", "framer motion", "tailwindcss", "frontend engineer"],
  openGraph: {
    title: "Portfolio | Premium Personal Website",
    description: "One page premium portfolio website.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ScrollProgress />
          <ParticleBg />
          <ScrollTopProgressButton />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
