import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

/* Arco组件库 */
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

createApp(App).use(ArcoVue).use(createPinia()).use(router).mount("#app");
