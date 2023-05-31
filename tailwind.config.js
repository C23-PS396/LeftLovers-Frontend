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
          "0%, 27%, 100%": {
            filter: "blur(0px)",
            opacity: "1",
          },
          "50%, 90%": {
            filter: "blur(90px)",
            opacity: "0",
          },
        },
      },
      animation: {
        wiggle: "wiggle 6s linear infinite",
      },
    },
  },
  plugins: [],
};
