import { defineConfig, loadEnv } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { normalizePath } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import autoprefixer from "autoprefixer";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
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

// vite 默认不加载 .env 文件，通过 loadEnv 函数加载
// 同时需要注意 .env.xxx xxx应该对应 script 脚本传入的 mode值
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
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
      // 图片压缩
      viteImagemin({
        // 无损压缩配置，无损压缩下图片质量不会变差
        optipng: {
          optimizationLevel: 7,
        },
        // 有损压缩配置，有损压缩下图片质量可能会变差
        pngquant: {
          quality: [0.8, 0.9],
        },
        // svg 优化
        svgo: {
          plugins: [
            {
              name: "removeViewBox",
            },
            {
              name: "removeEmptyAttrs",
              active: false,
            },
          ],
        },
      }),
      // 浏览器兼容
      legacy({
        targets: [
          "> 2%",
          "last 2 versions",
          "Firefox >= 50",
          "Chrome >= 60",
          "not ie <= 11",
          "Android 4.1",
          "iOS 7.1",
        ],
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
          target: "http://124.220.203.140",
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
  };
});
