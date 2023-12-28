import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

/* Arco组件库 */
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";

//const pinia = createPinia();

createApp(App)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(createPinia())
  .use(router)
  .mount("#app");
