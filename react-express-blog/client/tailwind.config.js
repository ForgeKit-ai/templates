/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3e2',
          100: '#fde4c8',
          200: '#fbc78e',
          300: '#f9a654',
          400: '#f7862f',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.neutral.700'),
            '[class~="lead"]': {
              color: theme('colors.neutral.600'),
            },
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.primary.700'),
                textDecoration: 'underline',
              },
            },
            strong: {
              color: theme('colors.neutral.900'),
              fontWeight: '600',
            },
            'h1, h2, h3, h4': {
              color: theme('colors.neutral.900'),
              fontFamily: theme('fontFamily.serif').join(', '),
            },
            h1: {
              fontSize: '2.25rem',
              fontWeight: '800',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.500'),
              backgroundColor: theme('colors.primary.50'),
              padding: '1rem',
              borderRadius: '0.5rem',
            },
            code: {
              color: theme('colors.primary.600'),
              backgroundColor: theme('colors.neutral.100'),
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontWeight: '500',
              fontSize: '0.875rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.neutral.900'),
              color: theme('colors.neutral.100'),
              borderRadius: '0.75rem',
              padding: '1.5rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.neutral.300'),
            '[class~="lead"]': {
              color: theme('colors.neutral.400'),
            },
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            strong: {
              color: theme('colors.neutral.100'),
            },
            'h1, h2, h3, h4': {
              color: theme('colors.neutral.100'),
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.500'),
              backgroundColor: theme('colors.primary.900'),
              color: theme('colors.neutral.200'),
            },
            code: {
              color: theme('colors.primary.400'),
              backgroundColor: theme('colors.neutral.800'),
            },
            pre: {
              backgroundColor: theme('colors.neutral.800'),
            },
          },
        },
      }),
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}