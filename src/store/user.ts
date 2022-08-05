import { defineStore } from "pinia";
import storage from "@/utils/storage";
import { IUser } from "@/api/login/types";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return (
      storage.getStorage<IUser>("user") || {
        id: 0,
        nickname: "",
        avatar: "",
        phone: "",
      }
    );
  },
  actions: {},
});
