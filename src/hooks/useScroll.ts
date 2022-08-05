import { ref } from "vue";
import throttle from "@/utils/throttle";

export interface IUseScrollOptions {
  throttleTime?: number; // scroll 滚动事件的节流控制
  onScroll?: (e: Event) => void; // 滚动事件时候触发的事件
}

const useScroll = (
  element: HTMLElement | SVGElement | Window | Document | null | undefined,
  options: IUseScrollOptions = {}
) => {
  const top = ref(0);
  const left = ref(0);
  const { onScroll, throttleTime = 100 } = options;
  element ??= document.querySelector("#app") as HTMLElement;
  element.addEventListener(
    "scroll",
    throttle<(e: Event) => void>((e: Event) => {
      const target = e.target as HTMLElement;
      top.value = target.scrollTop;
      left.value = target.scrollLeft;
      // 触发滚动回调，如果有的话
      onScroll && onScroll(e);
    }, throttleTime)
  );
  return {
    top,
    left,
  };
};

export default useScroll;
