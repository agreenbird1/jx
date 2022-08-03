import type { App } from "vue";
import RecordItem from "./RecordItem.vue";
import MainHeader from "./MainHeader.vue";
import EmptyLoading from "./EmptyLoading.vue";
import BackToTop from "./BackToTop.vue";
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
  Progress,
  Row,
  Switch,
} from "ant-design-vue";

RecordItem.name = "record-item";
MainHeader.name = "main-header";
EmptyLoading.name = "empty-loading";
BackToTop.name = "back-to-top";
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
  Progress,
  EmptyLoading,
  Row,
  BackToTop,
  Switch,
];

export default {
  install(app: App) {
    components.forEach((c) => {
      app.component(c.name, c);
    });
  },
};
