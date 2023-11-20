import { withShurikenUI } from '@shuriken-ui/tailwind';
import colors from 'tailwindcss/colors';

export default withShurikenUI({
  darkMode: 'class',
  content: [],
  theme: {
    fontFamily: {
      sans: ['Inter  Variable', 'sans-serif'],
      heading: ['Inter  Variable', 'sans-serif'],
      alt: ['Karla  Variable', 'sans-serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    extend: {
      colors: {
        primary: colors.emerald,
        muted: colors.slate,
      },
    },
  },
});
