/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // scan all React source files
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          // example custom colors
          brand: {
            light: "#3ABFF8",
            DEFAULT: "#0284C7",
            dark: "#0C4A6E",
          },
        },
        fontFamily: {
          sans: ["Inter", "system-ui", "sans-serif"],
          mono: ["Fira Code", "monospace"],
        },
      },
    },
    plugins: [],
  };
  