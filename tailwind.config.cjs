/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,svelte,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
}

