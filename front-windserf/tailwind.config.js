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
    },
    fontFamily: {
      roboto_slab: ["Roboto Slab", "serif"],
      open_sans: ["Open Sans", "sans-serif"],
    },
  },
  plugins: [],
};
