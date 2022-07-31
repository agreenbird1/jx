import { createRouter, createWebHashHistory } from "vue-router";

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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, left: 0 };
  },
});

export default router;
