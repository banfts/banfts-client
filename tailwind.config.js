import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [forms, typography, daisyui]
};
