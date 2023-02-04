/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: {
      md: { max: "612px" },
    },
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
        /* side bar shadow */
        sbs: "0 16px 10px 0 rgb(0 0 0 / 14%), 0 11px 18px 0 rgb(0 0 0 / 12%), 0 13px 5px -1px rgb(0 0 0 / 20%)",
        /* take note shadow */
        tns: "0 3px 5px rgb(0 0 0 / 20%)",
        /* background colors container shadow */
        bccs: "0 1px 2px 0 rgb(0 0 0 / 60%), 0 2px 6px 2px rgb(0 0 0 / 30%)",
        /*search by color container shadow */
        sbcc: "0 1px 2px 0 rgb(0 0 0 / 60%), 0 1px 3px 1px rgb(0 0 0 / 30%)",
      },
    },
  },
  plugins: [],
};
