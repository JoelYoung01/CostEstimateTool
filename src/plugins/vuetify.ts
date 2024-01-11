// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";

const sodSmithGreen = "#16441C";
const sodSmithGray = "#2a2e32";
const sodSmithLightGreen = "#53a22f";
const sodSmithOffWhite = "#E2DDCE";
const sodSmithWhite = "#eef0f2";

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: sodSmithGreen,
          background: sodSmithWhite,
          surface: sodSmithWhite,
          "on-surface": sodSmithGreen,
          secondary: sodSmithLightGreen,
          gray: sodSmithGray,
          offWhite: sodSmithOffWhite
        }
      }
    }
  }
});

export default vuetify;
