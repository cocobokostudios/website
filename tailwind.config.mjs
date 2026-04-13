/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{webc,html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
