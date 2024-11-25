/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Montserrat', 'sans-serif'],
        text: ['Poppins', 'sans-serif'],
        heading: ['Jura', 'sans-serif'],
      },
      backgroundImage: {
        home: "url('./assets/hero-image.jpg')",
      }
    },
  },
  plugins: [],
}

