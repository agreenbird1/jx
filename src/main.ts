import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router/index";
// import "@/test/testAxios";
// import "@/test/testStorage";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
console.log(import.meta.env);
