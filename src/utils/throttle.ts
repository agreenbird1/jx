const throttle = function <
  T extends Function = (...args: unknown[]) => unknown
>(fn: T, delay: number) {
  let timer: NodeJS.Timer | null = null;
  return function (...args: unknown[]) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        clearTimeout(timer as NodeJS.Timer);
        timer = null;
      }, delay);
    }
  };
};

export default throttle;
