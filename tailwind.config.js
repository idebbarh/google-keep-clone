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
        "text-gray": "rgba(255,255,255,0.702)",
        "main-text-color": "#e8eaed",
        "active-yellow": "#41331c",
        "icons-color": "#98989a",
      },
      boxShadow: {
        sbs: "0 16px 10px 0 rgb(0 0 0 / 14%), 0 11px 18px 0 rgb(0 0 0 / 12%), 0 13px 5px -1px rgb(0 0 0 / 20%)",
        tns: "0 3px 5px rgb(0 0 0 / 20%)",
      },
    },
  },
  plugins: [],
};
