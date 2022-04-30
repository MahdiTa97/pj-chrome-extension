const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [require('daisyui')],
  variants: {},
  corePlugins: {
    preflight: true,
  },
  daisyui: {
    rtl: true,
  },
};
