import type { Config } from 'tailwindcss';

/** Fluid type: scales between 360px–1200px viewports (replaces transform page-scale). */
function fluid(minPx: number, maxPx: number, minVp = 360, maxVp = 1200) {
  const slope = (maxPx - minPx) / (maxVp - minVp);
  const intercept = minPx - slope * minVp;
  return `clamp(${minPx / 16}rem, ${intercept.toFixed(4)}px + ${(slope * 100).toFixed(4)}vw, ${maxPx / 16}rem)`;
}

const config: Config = {
  future: {
    oxide: false,
  },
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
      'luna-dark-10': 'var(--luna-dark-10)',
      'luna-black': 'var(--luna-black)',
      'luna-white': 'var(--luna-white)',
      'luna-white-50': 'var(--luna-white-50)',
    },
    fontSize: {
      96: [fluid(48, 96), { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      84: [fluid(40, 84), { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      64: [fluid(36, 64), { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      48: [fluid(28, 48), { lineHeight: '1.15', letterSpacing: '-0.03em' }],
      40: [fluid(24, 40), { lineHeight: '1.2', letterSpacing: '-0.03em' }],
      36: [fluid(22, 36), { lineHeight: '1.25', letterSpacing: '-0.03em' }],
      32: [fluid(20, 32), { lineHeight: '1.5', letterSpacing: '-0.03em' }],
      28: [fluid(18, 28), { lineHeight: '1.4', letterSpacing: '-0.02em' }],
      24: [fluid(17, 24), { lineHeight: '1.35', letterSpacing: '-0.02em' }],
      20: [fluid(15, 20), { lineHeight: '1.7', letterSpacing: '-0.02em' }],
      18: [fluid(14, 18), { lineHeight: '1.5', letterSpacing: '-0.02em' }],
      16: [fluid(14, 16), { letterSpacing: '-0.02em' }],
      15: [fluid(13, 15), { letterSpacing: '-0.02em' }],
      14: [fluid(12, 14), { lineHeight: 'normal', letterSpacing: '-0.02em' }],
      12: [fluid(11, 12), { lineHeight: 'normal', letterSpacing: '-0.02em' }],
    },
  },
  plugins: [],
};

export default config;
