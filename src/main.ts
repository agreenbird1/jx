import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router/index";
import "@/assets/styles/normalize.less";
import "@/assets/styles/theme-dark.less";
import "ant-design-vue/dist/antd.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import VueVirtualScroller from "vue-virtual-scroller";
import components from "./components";

const app = createApp(App);
app.use(store);
app.use(VueVirtualScroller);
app.use(router);
app.use(components);
app.mount("#app");
