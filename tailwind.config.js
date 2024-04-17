import { clickable } from "./tailwind/clickable";
import { hocus } from "./tailwind/hocus";
import { rem } from "./tailwind/rem";
import { shape } from "./tailwind/shape";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "40em",
      desktop: "64em",
    },
    // todo: Add colors
    // colors: {
    //   "moderate-blue": "hsl(238 40% 52%)",
    // },
    fontFamily: {
      // todo: Add font from Fontsource
      base: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
    fontSize: {
      // todo: Add font sizes
      heading: [rem(32), { fontWeight: 500, lineHeight: rem(32) }],
      body: [rem(18), { lineHeight: rem(24) }],
    },
    extend: {},
  },
  plugins: [hocus, shape, clickable],
};
