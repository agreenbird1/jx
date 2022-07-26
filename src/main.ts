import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router/index";
import "@/assets/styles/normalize.less";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
