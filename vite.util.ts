import { loadEnv } from "vite";

interface IExternalConfig {
  name: string;
  scope: string;
  js?: string[];
  css?: string[];
}

console.log(import.meta);

/**
 * 需要使用cdn的库
 * 当前使用的是 BootCDN
 **/
export const externalConfig: IExternalConfig[] = [
  {
    name: "vue",
    scope: "Vue",
    js: ["https://cdn.bootcdn.net/ajax/libs/vue/3.2.25/vue.global.prod.min.js"],
  },
  {
    name: "vue-router",
    scope: "VueRouter",
    js: [
      "https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.16/vue-router.global.min.js",
    ],
  },
  {
    name: "pinia",
    scope: "Pinia",
    js: [
      "https://cdn.bootcdn.net/ajax/libs/vue-demi/0.13.1/index.iife.js",
      "https://cdn.bootcdn.net/ajax/libs/pinia/2.0.14/pinia.iife.min.js",
    ],
  },
  {
    name: "axios",
    scope: "axios",
    js: ["https://cdn.bootcdn.net/ajax/libs/axios/0.27.2/axios.min.js"],
  },
];

/**
 * 生成external对应脚本
 *
 * @returns {Record<string, string>}
 */
export const externalInject = (): Record<string, string> => {
  const jsLink: string[] = externalConfig
    .map((i) => i.js)
    .filter((i) => i)
    .flat();
  const cssLink = externalConfig
    .map((i) => i.css)
    .filter((i) => i)
    .flat();

  const injectCdnScript = jsLink
    .map((i) => `<script src="${i}"></script>`)
    .join("");
  const injectCdnStyle = cssLink
    .map((i) => `<link rel="stylesheet" href="${i}">`)
    .join("");
  return {
    injectCdnScript,
    injectCdnStyle,
  };
};

/**
 * 将external封装提供给rollup插件
 * */
export const getExternalConfigGlobals = (): Record<string, string> => {
  const externalGlobalsConfig = {};
  externalConfig.forEach((i) => {
    externalGlobalsConfig[i.name] = i.scope;
  });
  return externalGlobalsConfig;
};
