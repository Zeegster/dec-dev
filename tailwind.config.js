/** @type {import('tailwindcss').Config} */

export default ({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}',
  'node_modules/daisyui/dist/**/*.js',
  'node_modules/react-daisyui/dist/**/*.js',],
  theme: {
    fontFamily: { mont: 'Montserrat' },

    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        blue: {
          50: '#E0F6FF',
          100: '#43688F',
          200: '#7FAEDF',
          300: '#68A6E7',
          400: '#43688F',
          500: '#4391E21C',
          600: '#71A0D180',
          700: '#4391E2',
        },

        'green-100': '#00bf39',
        'red-100': '#f50505',

        'violent-100': '#D2BFE4',
        'white-blue-100': '#ABE5F2',
        'gray-200': '#43688F59',
        'red-200': '#FC285B59',

        'gray-100': '#D9D9D9',
      },
    },
  },
  plugins: [require('daisyui')],
});