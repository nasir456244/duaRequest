/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm':{'max': '639px'},

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        Manrope: ['Manrope', 'sans-serif'],
       },
       boxShadow: {
        '3xl': '27 0px -3px rgba(0, 0, 0, 0.5)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      flexBasis: {
        '1/7': '11%',
        '2/7': '8%',
        '3/7': '42.8571429%',
        '4/7': '72%',
        '5/7': '92%',
        '6/7': '85.7142857%',
      },
    },
  },
  plugins: [],
}
