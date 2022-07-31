import type { App } from "vue";
import RecordItem from "./RecordItem.vue";
import MainHeader from "./MainHeader.vue";
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
  Radio,
  RadioGroup,
  Spin,
  CheckboxGroup,
} from "ant-design-vue";

RecordItem.name = "record-item";
MainHeader.name = "main-header";
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
  MainHeader,
  Radio,
  RadioGroup,
  Spin,
  CheckboxGroup,
];

export default {
  install(app: App) {
    components.forEach((c) => {
      app.component(c.name, c);
    });
  },
};
