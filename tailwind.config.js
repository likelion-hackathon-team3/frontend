/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F8F7FC',
        card: '#FEFDFB',
        ink: '#2E2A38',
        muted: '#A79BC0',
        coral: '#F2794A',
        terracotta: '#C98A5D',
        sage: '#6FAE8F',
        lavender: '#9B87C4',
        'lavender-deep': '#8C7AE6',
        gold: '#D9A441',
      },
    },
  },
  plugins: [],
}
