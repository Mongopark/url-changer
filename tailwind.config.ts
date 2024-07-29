import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Poppins"', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        primary: '#3976E8',
        secondary: '#00a859',
        other: '#5B94FE',
        primarylight: 'lightblue',
      },
      borderRadius: {
        large: '1.5rem'
      },
      width: {
        max: '70%',
        min: '35%'
      },
      spacing: {
        small: '1.5rem',
        medium: '2.5rem',
        large: '3.5rem'
      },
      fontFamily: {
        poppins: ['"Raleway"', ...defaultTheme.fontFamily.sans],
        cursive: ['"Satisfy"', 'cursive']
      },
      fontSize: {
        '2xs': '0.625rem'
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...themes['light'],
          primary: '#3976E8',
          secondary: '#00a859',
          other: '#5B94FE',
          primarylight: 'lightblue',
        }
      }
    ]
  }
} satisfies Config;
