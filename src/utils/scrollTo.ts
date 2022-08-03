let timer: NodeJS.Timer | null = null;

/**
 * @param scrollTop - 需要滚动到的位置
 * @param animated - 是否需要缓动效果，不需要则会直接定位到滚动位置
 */
export default (scrollTop: number, animated = true) => {
  clearInterval(timer as NodeJS.Timer);
  const app = document.querySelector("#app")!;
  if (animated) {
    let step = (scrollTop - app.scrollTop) / 10;
    // 总是向上取整  所以负数时候就是取floor
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    timer = setInterval(() => {
      step = (scrollTop - app.scrollTop) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (Math.abs(app.scrollTop - scrollTop) > 1) {
        app.scrollTop += step;
      } else clearInterval(timer as NodeJS.Timer);
    });
  } else app.scrollTop = scrollTop;
};
