/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'background-pattern': "url('/public/img/hero-background.jpg')",
        'background-body': "url('/public/img/body-background.jpg')"
      })
    },
    fontFamily: {
      jetBrains: ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
}

