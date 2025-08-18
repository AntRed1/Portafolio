/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a",
        },
        secondary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "bounce-slow": "bounce 3s infinite",
        "glass-hover": "glassHover 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glassHover: {
          "0%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-2px) scale(1.02)" },
          "100%": { transform: "translateY(-4px) scale(1.03)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
