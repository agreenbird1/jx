import type { App } from "vue";
import RecordItem from "./RecordItem.vue";
import {
  Input,
  Dropdown,
  Menu,
  MenuItem,
  Avatar,
  Tabs,
  TabPane,
  Modal,
  Form,
  FormItem,
  Button,
  Checkbox,
} from "ant-design-vue";

RecordItem.name = "record-item";
const components = [
  Input,
  Dropdown,
  Menu,
  MenuItem,
  Avatar,
  Tabs,
  TabPane,
  RecordItem,
  Modal,
  Form,
  FormItem,
  Button,
  Checkbox,
];

export default {
  install(app: App) {
    components.forEach((c) => {
      app.component(c.name, c);
    });
  },
};
