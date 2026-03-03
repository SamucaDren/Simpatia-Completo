/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#4904C8',     // cor do botão principal
        secondary: '#646cff',   // links, hover e destaques
        'custom-purple': 'rgb(73, 3, 199)', // para "IA"
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          500: '#6B7280',
          600: '#4B5563',
          800: '#1F2937',
          900: '#242424',       // fundo escuro
        },
      },
    },
  },
  plugins: [],
};
