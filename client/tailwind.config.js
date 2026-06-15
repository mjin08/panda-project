/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      /* Museum Earth/Forest Palette */
      colors: {
        bamboo: {
          50:  '#faf6ee',
          100: '#efe6d5',
          200: '#e8dfd0',
          300: '#c4b99a',
          400: '#6b8f71',
          500: '#5a8a74',
          600: '#3e6b5a',
          700: '#2d4a3e',
          800: '#1e352b',
          900: '#1a1a1a',
        },
        gold: {
          leaf:     '#c9a84c',
          dim:      '#a08838',
          bright:   '#d4b85c',
        },
        museum: {
          parchment: '#f5f0e8',
          aged:      '#efe6d5',
          sienna:    '#a0522d',
          rust:      '#8b4513',
          placard:   '#3a3a3a',
          label:     '#555555',
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Lora"', 'Georgia', 'serif'],
        placard: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      boxShadow: {
        exhibit:  '0 4px 12px rgba(30, 53, 43, 0.15)',
        placard:  '0 2px 6px rgba(0, 0, 0, 0.1)',
      }
    }
  },
  plugins: []
};