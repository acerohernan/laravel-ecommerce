import { createApp } from "vue";
import Toast, { POSITION, type PluginOptions } from "vue-toastification";

import store from "./store";
import router from "./router";

import App from "./App.vue";

import "vue-toastification/dist/index.css";
import "./style.css";

createApp(App)
    .use(store)
    .use(router)
    .use(Toast, {
        maxToasts: 3,
        position: POSITION.BOTTOM_RIGHT,
    } satisfies PluginOptions)
    .mount("#app");
