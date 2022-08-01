module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        open: ["OpenSans"],
        work: ["WorkSans-Regular"],
      },
      colors: {
        gray: {
          5: "#F8F9FA",
          10: "#D9D9D9",
          15: "#2C2F30",
          20: "c0c1c2",
          25: "#202124",
          30: "#C6C7C8",
        },
        blue: {
          10: "#9E92DC",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
  ],
};
