/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        red: {
          3: 'hsl(var(--red-3))',
          10: 'hsl(var(--red-10))',
          11: 'hsl(var(--red-11))'
        },
        green: {
          1: 'hsl(var(--green-1))',
          2: 'hsl(var(--green-2))',
          3: 'hsl(var(--green-3))',
          4: 'hsl(var(--green-4))',
          5: 'hsl(var(--green-5))',
          6: 'hsl(var(--green-6))',
          7: 'hsl(var(--green-7))',
          8: 'hsl(var(--green-8))',
          9: 'hsl(var(--green-9))',
          10: 'hsl(var(--green-10))',
          11: 'hsl(var(--green-11))',
          12: 'hsl(var(--green-12))'
        },
        neutral: {
          1: 'hsl(var(--neutral-1))',
          2: 'hsl(var(--neutral-2))',
          3: 'hsl(var(--neutral-3))',
          4: 'hsl(var(--neutral-4))',
          5: 'hsl(var(--neutral-5))',
          6: 'hsl(var(--neutral-6))',
          7: 'hsl(var(--neutral-7))',
          8: 'hsl(var(--neutral-8))',
          9: 'hsl(var(--neutral-9))',
          10: 'hsl(var(--neutral-10))',
          11: 'hsl(var(--neutral-11))',
          12: 'hsl(var(--neutral-12))'
        },
        ring: 'hsl(var(--ring))'
      }
    }
  },
  plugins: []
};
