/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black:    '#000000',
        surface:  '#0A0A0A',
        surface2: '#111111',
        surface3: '#1A1A1A',
        border:   '#222222',
        muted:    '#666666',
        dim:      '#9A9A9A',
        offwhite: '#F7F5F0',
        accent:   '#9EFF00',
      },
      fontFamily: {
        head: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem,8vw,7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h2':      ['clamp(2rem,4vw,3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h3':      ['clamp(1.25rem,2.5vw,1.75rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        content: '1280px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(1.5rem)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
