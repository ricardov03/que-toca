import { defineConfig } from 'vite-plugin-windicss'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  plugins: [
    typography(),
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'tiny': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              'color': 'inherit',
              'opacity': 0.75,
              'fontWeight': '500',
              'textDecoration': 'underline',
              '&:hover': {
                opacity: 1,
                color: colors.red[600],
              },
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
          },
        },
      },
    },
  },
  shortcuts: {
    'card-default': 'p-6 max-w-lg mx-auto rounded-xl border-1 border-gray-100 shadow-md flex flex-no-wrap items-centers space-x-8 bg-gradient-to-t from-gray-100 to-gray-50 relative',
    'card-dark-default': 'p-6 max-w-lg mx-auto rounded-xl border-1 border-gray-900 shadow-md flex flex-no-wrap items-centers space-x-8 bg-gradient-to-t from-gray-700 to-gray-600 relative',
    'card-icon': 'h-18 w-18 text-white bg-blue-500 hover:bg-indigo-500 duration-500 transition-color border rounded-xl flex items-center justify-center shadow-inner',
    'card-dark-icon': 'h-18 w-18 text-white bg-blue-900 hover:bg-indigo-900 duration-500 transition-color border-gray-900 border rounded-xl flex items-center justify-center shadow-inner',
    'timer-style': 'inline-block text-5xl text-blue-500 cursor-pointer delay-150 duration-500 transition-all transform-gpu hover:rotate-y-360',
  },
})
