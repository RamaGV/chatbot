// ./tailwind.config.js

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Esto permite alternar entre el modo claro y oscuro utilizando una clase.
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#3498db',
          secondary: '#f1c40f',
          background: '#f9f9f9',
          text: '#333',
        },
        dark: {
          primary: '#2c3e50',
          secondary: '#95a5a6',
          background: '#2f3436',
          text: '#fff',
        },
      },
    },
  },
  plugins: [],
};
export default config;
