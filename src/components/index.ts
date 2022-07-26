import type { App } from "vue";
import { Input, Dropdown, Menu, MenuItem, Avatar } from "ant-design-vue";

const components = [Input, Dropdown, Menu, MenuItem, Avatar];

export default {
  install(app: App) {
    components.forEach((c) => {
      app.component(c.name, c);
    });
  },
};
