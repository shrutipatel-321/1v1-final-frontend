/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html","./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      sans: 'Roboto Mono, monospace',
      monospace: ['Roboto Mono', 'Menlo', 'Courier', 'monospace'],
    },
    extend:{
      height:{
        screen:'100dvh',
      },
      maxWidth: {
        'full': '100%', // Override max-w-full to be 100% of the screen
      },
      colors: {
        darkest: '#343a40',
        dark: '#495057',
        medium: '#ced4da',
        light: '#f1f3f5',
        theme: '#1098ad',
        accent: '#ffa94d',
      },
    },
  },
  plugins: [],
}
// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         darkest: '#343a40',
//         dark: '#495057',
//         medium: '#ced4da',
//         light: '#f1f3f5',
//         theme: '#1098ad',
//         accent: '#ffa94d',
//       },
//     },
//   },
//   plugins: [],
// }
