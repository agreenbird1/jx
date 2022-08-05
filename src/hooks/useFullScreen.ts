import { ref } from "vue";

const useFullScreen = () => {
  const isFullScreen = ref(false);
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  document.addEventListener("fullscreenchange", (e) => {
    isFullScreen.value = !isFullScreen.value;
  });
  return {
    isFullScreen,
    toggleFullScreen,
  };
};

export default useFullScreen;
