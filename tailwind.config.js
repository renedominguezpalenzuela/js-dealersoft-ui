module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('daisyui')
  ],
};