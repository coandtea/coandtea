/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brown-900': '#3d2817',
        'brown-700': '#5d4037',
        'brown-500': '#6b4423',
        'brown-300': '#8b6f47',
        'green-900': '#2d5016',
        'green-700': '#3d6b24',
        'green-500': '#4caf50',
        'green-300': '#6b9b4d',
        'cream-100': '#fdfbf7',
        'cream-300': '#f5efe7',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
