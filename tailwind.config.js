/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  'node_modules/flowbite-react/lib/esm/**/*.js',
  './pages/**/*.{html,js}',
  './components/**/*.{html,js}',
  './src/scenes/**/*.{js,jsx}', // Changed to target all files within the 'scenes' directory
  ],
  plugins: [
    require('flowbite/plugin')
],
theme: {
  extend: {
     fontFamily: {
        'poppins': ['Poppins'],
     }
  }
},
  // ...
 }
 