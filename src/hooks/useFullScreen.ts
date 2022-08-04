import { ref } from "vue";

const useFullScreen = () => {
  const isFullScreen = ref();
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      isFullScreen.value = true;
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        isFullScreen.value = false;
      }

      document.addEventListener("fullscreenchange", (e) => {
        isFullScreen.value = !isFullScreen.value;
      });
    }
  }
  return {
    isFullScreen,
    toggleFullScreen,
  };
};

export default useFullScreen;
