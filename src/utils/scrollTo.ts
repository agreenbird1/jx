let timer: NodeJS.Timer | null = null;

export default (scrollTop: number) => {
  clearInterval(timer as NodeJS.Timer);
  const app = document.querySelector("#app")!;
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
};
