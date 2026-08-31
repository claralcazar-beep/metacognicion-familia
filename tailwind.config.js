/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B2A4A",
        azul: "#2F5BEA",
        cielo: "#E4ECFF",
        menta: "#1FA36B",
        mentaSuave: "#DDF5E9",
        ambar: "#F0A424",
        ambarSuave: "#FFF1D6",
        rosa: "#E4536B",
        rosaSuave: "#FDE4E8",
        linea: "#D9DEE9",
        gris: "#6B7590",
        lila: "#7C4DFF",
        lilaSuave: "#EEE8FF",
      },
      fontFamily: { sans: ["'Avenir Next'", "Nunito", "'Segoe UI'", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
