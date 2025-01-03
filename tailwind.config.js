/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html","./public/about.html", "./public/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
      'custom-inset': 'inset 2px 2px rgb(206, 206, 206), inset -2px -2px gray',
      'custom-inset-type' : "inset 2px 2px rgb(40, 40, 40),inset -2px -2px rgb(226, 226, 226)",
      'custom-inset-button' : "inset 2px 2px rgb(236, 236, 236),inset -2px -2px rgb(0, 0, 0)"
    },
    },
    fontFamily : {
      "pixelify" : "Pixelify Sans",
    },
    colors: {
        "plante": "#004407",
        "poison": "#72259e",
        "feu": "#de1b27",
        "vol": "#063944",
        "eau": "#2e259e",
        "insecte": "#103100",
        "normal": "#2F2F2F",
        "electrik": "#e4ef3e",
        "sol": "#38351B",
        "fee": "#550058",
        "combat": "#ad4716",
        "psy": "#a116ad",
        "roche": "#c75923",
        "acier": "#737373",
        "glace": "#25c4d4",
        "spectre": "#562f56",
        "dragon": "#be8c25",
        "tenebres": "#070548",
        "azure" : "azure",
        "buttonColor" : "rgb(172, 172, 172)",
        "black" : "black",
        "white" : "white"
    },    
  },
  plugins: [],
}

