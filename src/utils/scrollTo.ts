export default (scrollTop: number) => {
  const app = document.querySelector("#app")!;
  const step = scrollTop - app.scrollTop;
};
