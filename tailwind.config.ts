import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Light Mode Colors
        light: {
          background: {
            primary: '#F8FAF8',
            secondary: '#E7E9E7',
            tertiary: '#DFE2DF',
            input: '#EFF1EF',
            blur: '#F8FAF8',
          },
          text: {
            primary: '#1D211C',
            secondary: '#60655F',
            tertiary: '#7F847D',
            placeholder: '#898E87',
            disabled: '#B9BCB8',
            button: '#05F500',
          },
          border: {
            primary: '#B9BCB8',
            secondary: '#CCCFC6',
            tertiary: '#DFE2DF',
          },
        },
        // Dark Mode Colors
        dark: {
          background: {
            primary: '#181917',
            secondary: '#282A27',
            tertiary: '#2F312E',
            input: '#212220',
            blur: '#181917',
          },
          text: {
            primary: '#ECEEEC',
            secondary: '#AFB5AD',
            tertiary: '#767D74',
            placeholder: '#687066',
            disabled: '#5C625B',
            button: '#05FF00',
          },
          border: {
            primary: '#5C625B',
            secondary: '#454843',
            tertiary: '#2F312E',
          },
        },
        // UI component background (example of old config)
        'background-secondary': '#282A27',
        // UI borders
        'background-border': '#2F312E',
        // Primary text color
        'text-primary': '#AFB5AD',
        // App main background
        'background-primary': '#181917',
        // Bright branding color
        'branding-bright': '#05FF00',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
