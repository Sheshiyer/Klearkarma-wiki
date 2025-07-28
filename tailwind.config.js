/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Chakra-based color system
        chakra: {
          root: 'hsl(var(--chakra-root))',
          sacral: 'hsl(var(--chakra-sacral))',
          solar: 'hsl(var(--chakra-solar))',
          heart: 'hsl(var(--chakra-heart))',
          throat: 'hsl(var(--chakra-throat))',
          'third-eye': 'hsl(var(--chakra-third-eye))',
          crown: 'hsl(var(--chakra-crown))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        'liquid': '32px',
        'glass': '28px',
      },
      backdropBlur: {
        'liquid': '28px',
        'glass': '24px',
      },
      animation: {
        'liquid-shimmer': 'liquidShimmer 3s ease-in-out infinite',
        'liquid-rotate': 'liquidRotate 20s linear infinite',
        'orb-pulse': 'orbPulse 3s ease-in-out infinite',
        'chakra-shift': 'chakraShift 30s ease-in-out infinite',
        'float': 'float 25s infinite linear',
      },
      boxShadow: {
        'liquid': '0 16px 50px 0 rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.25), inset 0 -2px 0 rgba(255, 255, 255, 0.05), 0 0 0 0.5px rgba(255, 255, 255, 0.1)',
        'liquid-hover': '0 32px 80px 0 rgba(0, 0, 0, 0.25), inset 0 3px 0 rgba(255, 255, 255, 0.35), inset 0 -3px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15)',
        'glass': '0 12px 40px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 0 0 0.5px rgba(255, 255, 255, 0.08)',
        'orb': '0 0 40px hsla(var(--chakra-heart), 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.7',
            h1: {
              color: 'white',
              fontWeight: '700',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            },
            h2: {
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '600',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            },
            h3: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '500',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            },
            a: {
              color: 'hsl(var(--chakra-throat))',
              '&:hover': {
                color: 'hsl(var(--chakra-heart))',
              },
            },
            code: {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              color: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '0.375rem',
              padding: '0.25rem 0.5rem',
            },
            pre: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}