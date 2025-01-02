/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
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
        "plante": "#259e32",
        "poison": "#72259e",
        "feu": "#de1b27",
        "vol": "#258a9e",
        "eau": "#2e259e",
        "insecte": "#4b9e25",
        "normal": "#bfbfbe",
        "electrik": "#e4ef3e",
        "sol": "#828728",
        "fee": "#d935e0",
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

