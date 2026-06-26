import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mistral 선셋 팔레트
        primary: { DEFAULT: "#F2540B", deep: "#C2410C", on: "#FFFFFF" },
        sunshine: {
          300: "#FDBA74",
          500: "#FB923C",
          700: "#F97316",
          800: "#EA580C",
          900: "#C2410C",
        },
        yellow: { saturated: "#FFD400" },
        cream: {
          DEFAULT: "#FBF3E3",
          soft: "#FEF9F0",
          deeper: "#F5E6C8",
          footer: "#FAF1DD",
        },
        beige: { deep: "#E8D9B8" },
        ink: {
          DEFAULT: "#1A1A1A",
          900: "#1A1A1A",
          700: "#2B2B2B",
          500: "#5C5C5C",
          300: "#8A8A8A",
          100: "#ECE7DA",
        },
        slate: "#5C5C5C",
        steel: "#8A8A8A",
        stone: "#A0A0A0",
        muted: "#B8B8B8",
        hairline: { DEFAULT: "#E5E0D5", soft: "#EFEAE0", strong: "#D8D2C4" },
        canvas: "#FFFFFF",
        surface: { DEFAULT: "#FAFAF8", code: "#1A1A1A" },
        // 레거시 키(잔존 참조 호환용)
        teal: { 500: "#F2540B", 400: "#FB923C" },
        coal: { 950: "#1A1A1A", 900: "#222222", 800: "#2B2B2B", 700: "#3A3A3A" },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "var(--font-pretendard)",
          "Georgia",
          "serif",
        ],
        sans: ["var(--font-pretendard)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        hero: "clamp(2.75rem, 6vw, 5.25rem)",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,.04)",
        mockup: "0 12px 24px -4px rgba(0,0,0,.08)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
