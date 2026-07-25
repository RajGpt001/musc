/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // Empty colors object to remove default Tailwind colors, 
      // User will define custom palette next.
    },
    extend: {},
  },
  plugins: [],
}
