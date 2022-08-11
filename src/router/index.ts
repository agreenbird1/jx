import { createRouter, createWebHashHistory } from "vue-router";
import scrollTo from "@/utils/scrollTo";
import { useUserStore } from "@/store/user";
import pinia from "@/store";
import { message } from "ant-design-vue";

const userStore = useUserStore(pinia);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "layout",
      component: () => import("@/views/Layout.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/home/index.vue"),
        },
        {
          path: "/record",
          name: "record",
          component: () => import("@/views/record/index.vue"),
        },
        {
          path: "/search",
          name: "search",
          component: () => import("@/views/search/index.vue"),
        },
        {
          path: "/resolve",
          name: "resolve",
          component: () => import("@/views/resolve/index.vue"),
        },
      ],
    },
    {
      path: "/doOTopic",
      name: "doOTopic",
      component: () => import("@/views/doOTopic/index.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      name: "404",
      redirect: "/",
    },
  ],
  scrollBehavior() {
    scrollTo(0);
  },
});
router.beforeEach((to, from) => {
  if (to.path !== "/" && !userStore.nickname) {
    message.warning("请登录后再试！");
    return false;
  }
});

export default router;
