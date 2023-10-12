/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
     screens: {
        sm: '960px',
        md: '1280px',
        lg: '1920px',
        xl: '2240px',
      },
  extend:{
        colors: {
           custOrange: '#0CD021',
           custNavy: '#081E26',
           custRed: '#94342D',
           custGreen: '#002140',
           custBei: '#D3CAC9',
         },
         }
  },
  plugins: [],
  important: true,
}

