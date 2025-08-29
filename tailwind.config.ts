import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { tp: { slate:'#0b0d16', indigoDark:'#3e2666', indigo:'#4d3293', purple:'#780096' } }, boxShadow: { glow: '0 0 30px rgba(102,72,204,0.45)', glowSm: '0 0 24px rgba(102,72,204,0.35)' } } },
  plugins: [],
} satisfies Config
