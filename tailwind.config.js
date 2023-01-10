/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "main-background-color": "#202124",
        "input-gray": "rgba(241,243,244,.24)",
        "hover-gray": "#28292c",
        "border-gray": "#5f6368",
        "main-text-color": "#e8eaed",
        "active-yellow": "#41331c",
        "icons-color": "#98989a",
      },
    },
  },
  plugins: [],
};
