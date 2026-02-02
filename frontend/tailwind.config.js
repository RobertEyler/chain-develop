/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        'background-tertiary': 'var(--background-tertiary)',
        foreground: 'var(--foreground)',
        'foreground-muted': 'var(--foreground-muted)',
        'foreground-subtle': 'var(--foreground-subtle)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-muted': 'var(--primary-muted)',
        accent: 'var(--accent)',
        'accent-muted': 'var(--accent-muted)',
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
        'border-accent': 'var(--border-accent)',
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
        'card-elevated': 'var(--card-elevated)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
