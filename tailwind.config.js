/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          "0%": { filter: "blur(4px)", opacity: "0" },
          "20%": { filter: "blur(0)", opacity: "1" },
          "80%": { filter: "blur(0)", opacity: "1" },
          "100%": { filter: "blur(4px)", opacity: "0" },
        },
      },
      animation: {
        wiggle: "wiggle 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
