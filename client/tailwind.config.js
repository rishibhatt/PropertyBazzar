/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'darkBlack' : '#121212',
      'lightGreen' : '#A9B8AC',
      'white' : 'white',
      'orange' : '#EA4E35',
      'darkGreen' : '#006400',
      'cream': '#E8E8E8',
      'indigo' : 'indigo',
      'gray' : 'gray',
      'purple' : 'purple',
      'sky' : '#0ea5e9',
      'pink' :'#ec4899',
      'honeyDraw' : '#E2EFDE',
      'yellow' : '#F4B266',
      'chamoise' :'#9B7E46',
      'floralWhite' : '#FFF8F0',
      'whiteSmoke' : '#F3F3F3'
    },
    extend: {
      backgroundImage : {
        'hero-image' : "url('/src/assets/images/hero-image.jpg')",
        'logo' : "url('/src/assets/images/logo.png')",

      },
      
      
    },
  },
  plugins: [],
}