import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    id: 0,
    nickname: "",
    avatar: "",
  }),
  actions: {},
});
