import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { normalizePath } from "vite";
import autoprefixer from "autoprefixer";
import path from "path";

const globalStyle = normalizePath(
  path.resolve("./src/assets/styles/global.less")
);

export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${globalStyle}";`,
      },
    },
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
        }),
      ],
    },
  },
});
