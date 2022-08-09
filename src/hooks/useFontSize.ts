import { ref } from "vue";

/**
 * 通过 css 变量修改字体大小
 * @param variableName - css 变量的名字
 * @param maxVal - 最大值
 * @param minVal - 最小值
 * @returns 操作方法和标志
 */
const useFontSize = (variableName: string, maxVal: number, minVal: number) => {
  const isMax = ref(false);
  const isMin = ref(false);
  let fs = +getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .substring(1, 3);
  const incrementFontSize = () => {
    if (fs < maxVal) {
      document.documentElement.style.setProperty(variableName, ++fs + "px");
    }
    changeFlags();
  };

  const decrementFontSize = () => {
    if (fs > minVal) {
      document.documentElement.style.setProperty(variableName, --fs + "px");
    }
    changeFlags();
  };

  // 每次修改都需要重新判断
  const changeFlags = () => {
    isMin.value = fs === minVal;
    isMax.value = fs === maxVal;
  };
  return {
    isMax,
    isMin,
    incrementFontSize,
    decrementFontSize,
  };
};

export default useFontSize;
