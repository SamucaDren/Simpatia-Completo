import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#006FFF',
        'primary-purple': '#370199',
        'blue-dark-1': '#001839',
        'blue-dark-2': '#002861',
        'blue-dark-3': ' #003785',
        'blue-1': '#0051C2',
        'blue-2': '#226DD6',
        'blue-light-1': '#4485DB',
        'blue-light-2': '#88B3EE',
        'blue-light-3': '#DBE9FC',
        'neutral': {
          '700': '#0C0C12',
          '600': '#4C4B67',
          '500': '#7A7A99',
          '400': '#ADADCC',
          '300': '#C3C3D9',
          '200': '#E4E4F2',
          '100': '#F8F8FC',
          '000': '#FEFEFF',
        },
      },
      fontSize: {
        'heading-64': ['64px', { lineHeight: '1.2', fontWeight: '500' }],
        'heading-40': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-24': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-18': ['18px', { lineHeight: '1.2', fontWeight: '600' }],
        'body-18-medium': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-16-semibold': ['16px', { lineHeight: '1.6', fontWeight: '600' }],
        'body-16-medium': ['16px', { lineHeight: '1.6', fontWeight: '500' }],
        'body-14-semibold': ['14px', { lineHeight: '1.6', fontWeight: '600' }],
        'body-14-medium': ['14px', { lineHeight: '1.6', fontWeight: '500' }],
      }
    },
  },
  plugins: [],
}
export default config