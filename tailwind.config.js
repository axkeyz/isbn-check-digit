/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/views/**/*.erb',
    './app/frontend/**/*.{js,vue,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'merriweather': ['Merriweather', 'serif']
      }
    },
  },
  plugins: [],
}

