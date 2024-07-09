import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oliveGrey: '#3B3C36', // Adjust this hex value to match the color in your screenshot
        cream: '#fff9ed',
      },
    },
  },
  plugins: [],
};
export default config;
