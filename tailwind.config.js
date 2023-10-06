// module.exports = {
//   prefix: '',
//   content: [
//     './src/**/*.{html,ts}',
//   ],
//   darkMode: 'class', // or 'media' or 'class'
//   theme: {
//     extend: {
//       colors: {
//         primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
//       }
//     },
//     fontFamily: {
//       'body': [
//         'Inter',
//         'ui-sans-serif',
//         'system-ui',
//         '-apple-system',
//         'system-ui',
//         'Segoe UI',
//         'Roboto',
//         'Helvetica Neue',
//         'Arial',
//         'Noto Sans',
//         'sans-serif',
//         'Apple Color Emoji',
//         'Segoe UI Emoji',
//         'Segoe UI Symbol',
//         'Noto Color Emoji'
//       ],
//       'sans': [
//         'Inter',
//         'ui-sans-serif',
//         'system-ui',
//         '-apple-system',
//         'system-ui',
//         'Segoe UI',
//         'Roboto',
//         'Helvetica Neue',
//         'Arial',
//         'Noto Sans',
//         'sans-serif',
//         'Apple Color Emoji',
//         'Segoe UI Emoji',
//         'Segoe UI Symbol',
//         'Noto Color Emoji'
//       ]
//     },
//     screens: {
//       'sm': '640px',
//       // => @media (min-width: 640px) { ... }
//
//       'md': '768px',
//       // => @media (min-width: 768px) { ... }
//
//       'lg': '1024px',
//       // => @media (min-width: 1024px) { ... }
//
//       'xl': '1280px',
//       // => @media (min-width: 1280px) { ... }
//
//       '2xl': '1536px',
//       // => @media (min-width: 1536px) { ... }
//     },
//     fontSize: {
//       sm: ['12px', '18px'],
//       base: ['13px', '20px'],
//       medium: ['16px', '24px'],
//       lg: ['20px', '28px'],
//       xl: ['24px', '32px'],
//     },
//     // fontFamily: {
//     //   display: ['Inter', 'system-ui', 'sans-serif'],
//     //   body: ['Inter', 'system-ui', 'sans-serif'],
//     // },
//     // extend: {}
//   },
//   variants: {
//     backgroundColor: ['active']
//   },
//   plugins: [
//     require('tailwindcss'),
//     require('autoprefixer'),
//   ]
// };
const colors = require('tailwindcss/colors')

module.exports = {
  prefix: '',
  mode: 'jit',
  important: false,
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-up': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-up': 'fade-out-up 0.3s ease-out',
      },
      boxShadow: {
        custom: '0px 0px 50px 0px rgb(82 63 105 / 15%)',
      },
      colors: {
        primary: colors.green,
        night: {
          50: '#e4e4eb',
          100: '#bbbace',
          200: '#8f8ead',
          300: '#66658c',
          400: '#4b4777',
          500: '#302a62',
          600: '#2b245b',
          700: '#241c51',
          800: '#1c1445',
          900: '#130030',
        },
      },
    },
    fontFamily: {
      poppins: ['Poppins', 'system-ui', 'sans-serif'],
      nunito: ['Nunito Sans', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  variants: {
    extend: {},
    scrollbar: ['dark', 'rounded']
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
