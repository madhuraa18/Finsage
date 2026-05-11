/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary palette
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // Electric blue accent
        electric: {
          DEFAULT: "#00D4FF",
          50: "#f0fdff",
          100: "#ccf7ff",
          200: "#99eeff",
          300: "#5ce0ff",
          400: "#00D4FF",
          500: "#00b8e6",
          600: "#0095c4",
          700: "#0077a0",
          800: "#005c80",
          900: "#004a68",
        },
        // Neon green finance
        neon: {
          DEFAULT: "#00FF88",
          50: "#f0fff8",
          100: "#ccffe9",
          200: "#99ffd2",
          300: "#5cffb8",
          400: "#00FF88",
          500: "#00e67a",
          600: "#00c466",
          700: "#009e52",
          800: "#007a3f",
          900: "#005c30",
        },
        // Dark backgrounds
        dark: {
          50: "#f8fafc",
          100: "#0a0f1e",
          200: "#080d18",
          300: "#060a12",
          400: "#04070d",
          500: "#020408",
          bg: "#050914",
          card: "#0d1626",
          border: "#1a2540",
          muted: "#1e2d4d",
        },
        // Navy
        navy: {
          DEFAULT: "#0a1628",
          light: "#0f1f3d",
          mid: "#0d1b35",
          dark: "#060e1e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-gradient": "linear-gradient(135deg, #050914 0%, #0a1628 50%, #050914 100%)",
        "blue-glow": "radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)",
        "green-glow": "radial-gradient(ellipse at center, rgba(0,255,136,0.1) 0%, transparent 70%)",
        "hero-gradient": "linear-gradient(135deg, #050914 0%, #0a1628 40%, #050d20 100%)",
      },
      boxShadow: {
        "glow-blue": "0 0 20px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1)",
        "glow-green": "0 0 20px rgba(0, 255, 136, 0.3), 0 0 60px rgba(0, 255, 136, 0.1)",
        "glow-blue-sm": "0 0 10px rgba(0, 212, 255, 0.4)",
        "glow-green-sm": "0 0 10px rgba(0, 255, 136, 0.4)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 8px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0,212,255,0.1)",
      },
      animation: {
        "ticker": "ticker 30s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 212, 255, 0.6), 0 0 80px rgba(0, 212, 255, 0.2)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
