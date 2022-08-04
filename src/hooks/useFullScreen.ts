import { ref } from "vue";

const useFullScreen = () => {
  const isFullScreen = ref(false);
  function toggleFullScreen(open: boolean) {
    if (open) {
      if (!document.fullscreenElement) {
        isFullScreen.value = true;
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen && isFullScreen.value) {
        document.exitFullscreen();
        isFullScreen.value = false;
      }
    }
  }

  return {
    isFullScreen,
    toggleFullScreen,
  };
};

export default useFullScreen;
