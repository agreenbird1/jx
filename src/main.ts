import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router/index";
import "@/assets/styles/normalize.less";
import "ant-design-vue/dist/antd.css";
import components from "./components";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(components);
app.mount("#app");
