import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/islands/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'luna-bright': 'var(--luna-bright)',
      'luna-purple': 'var(--luna-purple)',
      'luna-dark': 'var(--luna-dark)',
      'luna-black': 'var(--luna-black)',
      'luna-white': 'var(--luna-white)',
    },
  },
  plugins: [],
};
export default config;
