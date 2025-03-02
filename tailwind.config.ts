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
      'luna-white-50': 'var(--luna-white-50)',
    },
    fontSize: {
      96: ['96px', { lineHeight: 'normal', letterSpacing: '-2.88px' }],
      84: ['84px', { lineHeight: 'normal', letterSpacing: '-2.52px' }],
      64: ['64px', { lineHeight: 'normal', letterSpacing: '-1.92px' }],
      48: ['48px', { lineHeight: 'normal', letterSpacing: '-1.44px' }],
      40: ['40px', { lineHeight: 'normal', letterSpacing: '-1.2px' }],
      36: ['36px', { lineHeight: 'normal', letterSpacing: '-1.08px' }],
      32: ['32px', { lineHeight: 1.8, letterSpacing: '-0.96px' }],
      28: ['28px', { lineHeight: '40px' }],
      24: ['24px', { lineHeight: 'normal', letterSpacing: '-0.72px' }],
      20: ['20px', { lineHeight: 1.8, letterSpacing: '-0.6px' }],
      16: ['16px', { letterSpacing: '-0.48px' }],
      15: ['15px'],
      14: ['14px', { lineHeight: 'normal', letterSpacing: '-0.42px' }],
      12: ['12px', { lineHeight: 'normal', letterSpacing: '-0.36px' }],
    },
  },
  plugins: [],
};
export default config;
