import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#6366F1",
          purple: "#8B5CF6",
          cyan: "#22D3EE",
          bgDark: "#0B0F1A"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(99,102,241,0.45), 0 20px 40px rgba(2,8,23,0.45)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 15% 10%, rgba(99,102,241,0.22), transparent 32%), radial-gradient(circle at 80% 15%, rgba(139,92,246,0.2), transparent 35%), radial-gradient(circle at 60% 75%, rgba(34,211,238,0.17), transparent 35%)"
      }
    }
  },
  plugins: []
};

export default config;
