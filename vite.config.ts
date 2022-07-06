import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { normalizePath } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import autoprefixer from "autoprefixer";
import viteCompression from "vite-plugin-compression";
import externalGlobals from "rollup-plugin-external-globals";
import {
  externalConfig,
  externalInject,
  getExternalConfigGlobals,
} from "./vite.util";
import path from "path";

const globalStyle = normalizePath(
  path.resolve("./src/assets/styles/global.less")
);

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    // gzip
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    // 将cdn注入到index.html
    createHtmlPlugin({
      minify: true,
      inject: {
        data: externalInject(),
      },
    }),
  ],
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
  // 生产环境打包配置
  build: {
    assetsDir: "static/img",
    // 取消计算文件大小，加快打包速度
    reportCompressedSize: false,
    // chunk拆分文件最大限制
    chunkSizeWarningLimit: 200,
    sourcemap: false,
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        // 拆包策略，可以传递一个对象，也可以配置一个函数
        manualChunks(id) {
          // 拆分Chunks
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[1]
              .toString();
          }
        },
      },
      external: externalConfig.map((c) => c.name),
      plugins: [externalGlobals(getExternalConfigGlobals())],
    },
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_debugger: true,
        drop_console: true,
      },
    },
  },
});
