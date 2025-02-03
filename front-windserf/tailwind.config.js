/** @type {import('tailwindcss').Config} */
export default {
  content: [".index.html", "./src/**/*.{ts,jsx,tsx,js}"],
  theme: {
    extend: {
      colors: {
        darkYellow: "#e7c63f",
        lightYellow: "#efe66f",
        brown: "#281207",
        gray: "#847770",
        beige: "#f3eae8",
      },
      width: {
        "30rem": "30rem",
        "9/40": "22.5%",
        "21.5%": "21.5%",
        "1/10": "10%",
        "27rem": "27rem",
        "28rem": "28rem",
        "30vw": "30vw",
      },
      minWidth: {
        "30rem": "30rem",
      },
    },
    fontFamily: {
      roboto_slab: ["Roboto Slab", "serif"],
      open_sans: ["Open Sans", "sans-serif"],
    },
  },
  plugins: [],
};
