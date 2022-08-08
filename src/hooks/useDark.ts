import { ref, watch } from "vue";

const useDark = () => {
  // 暴露一个控制开关
  const isDark = ref(false);
  watch(
    () => isDark.value,
    () => {
      const theme = isDark.value ? "dark" : "";
      document.body.setAttribute("data-theme", theme);
      if (isDark.value) document.body.setAttribute("class", "dark");
      else document.body.removeAttribute("class");
    },
    { immediate: true }
  );
  return {
    isDark,
  };
};

export default useDark;
