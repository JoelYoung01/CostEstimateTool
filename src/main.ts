import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import vuetify from "@/plugins/vuetify";

createApp(App).use(vuetify).mount("#cost-estimation-tool-mount-point");
