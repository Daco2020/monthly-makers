/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        mainBlue: "#03a9f4",
        mainPurple: "#673ab7",
        blackPurple: "#090510",
        oxfordblue: "#011638",
        charcoal: "#364156",
        silver: "#CDCDCD",
        honeydew: "#DFF8EB",
        calpolygreen: "#214e34",
        cinnabar: "#E94F37",
      }
    }
  },
  plugins: []
};