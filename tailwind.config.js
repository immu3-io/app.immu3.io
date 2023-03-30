// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './preview/**/*.{vue,js,ts,jsx,tsx}',
    './app.vue'
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        neutral: colors.gray,
        'menu-background': colors.gray,
        'menu-text': colors.gray
      }
    }
  }
};
