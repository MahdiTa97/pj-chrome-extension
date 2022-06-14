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
    themes: [
      {
        pjtheme: {
          primary: '#FF6417',
          secondary: '#FFAD17',
          accent: '#1769FF',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#17B3FF',
          success: '#17B37C',
          warning: '#FFE207',
          error: '#E60000',
        },
      },
    ],
  },
};
