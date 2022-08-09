<template>
  <header>
    <div class="header-container">
      <div class="left">
        <router-link to="/">
          <img src="../assets/logo.png" />
        </router-link>
        <div class="search-bar">
          <a-input
            v-model:value="searchWords"
            placeholder="搜索题目名称"
            :bordered="false"
            allow-clear
            @press-enter="searchSubjects"
          >
            <template #prefix>
              <search-outlined />
            </template>
          </a-input>
        </div>
      </div>
      <div class="user">
        <template v-if="userStore.nickname">
          <img :src="userStore.avatar" />
          <a-dropdown>
            <a @click.prevent> {{ userStore.nickname }} </a>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="logout">
                  <a href="javascript:;">退出登录</a>
                </a-menu-item>
                <a-menu-item>
                  <router-link to="/studyCalendar">学习日历</router-link>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
        <template v-else>
          <img src="../assets/icons/avatar.png" />
          <span @click="isLogin = true">立即登录</span>
        </template>
      </div>
    </div>

    <a-modal
      v-model:visible="isLogin"
      destroy-on-close
      :footer="null"
      :closable="false"
      width="460px"
    >
      <div style="padding: 0 40px">
        <div style="font-size: 24px; margin-bottom: 37px">
          {{
            isWeChatLogin
              ? "微信登录"
              : isRegistered
              ? "登录/注册"
              : "绑定手机号"
          }}
        </div>
        <template v-if="isWeChatLogin">
          <div style="text-align: center">
            <iframe
              sandbox="allow-scripts allow-top-navigation allow-same-origin"
              :src="wechatUrl"
              frameborder="0"
              scrolling="no"
              width="300px"
              height="310px"
            ></iframe>
            <p
              class="mt-20"
              :style="{ cursor: 'pointer', color: '#a1a4b3', marginBottom: 0 }"
            >
              <span @click="isWeChatLogin = false">
                <img style="margin-right: 5px" src="../assets/icons/lock.png" />
                验证码登录
              </span>
            </p>
          </div>
        </template>
        <template v-else>
          <a-form
            :model="loginForm"
            name="basic"
            destroy-on-close
            autocomplete="off"
            @finish="loginByCode"
          >
            <a-form-item name="phone" :rules="phoneRules">
              <a-input
                v-model:value="loginForm.phone"
                style="
                  border-bottom: 1px solid #eee;
                  width: 327px;
                  margin-top: 14px;
                "
                placeholder="请输入手机号"
                :bordered="false"
              />
            </a-form-item>

            <a-form-item name="code" :rules="codeRules">
              <a-input
                v-model:value="loginForm.code"
                style="
                  border-bottom: 1px solid #eee;
                  width: 327px;
                  margin-top: 15px;
                "
                placeholder="请输入验证码"
                :bordered="false"
              >
                <template #suffix>
                  <span :style="codeStyle" @click="getCode">{{
                    isSendCode ? `重新获取(${Countdown})` : "获取验证码"
                  }}</span>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              name="isAgree"
              :rules="[
                {
                  validator: agreeValidator,
                },
              ]"
            >
              <a-checkbox
                v-model:checked="loginForm.isAgree"
                style="border-radius: 5px; width: 327px"
                >我已阅读并同意<span style="color: #4379ff">《用户协议》</span
                >和<span style="color: #4379ff">《隐私协议》</span></a-checkbox
              >
            </a-form-item>
            <a-form-item>
              <a-button
                :type="isQualify ? 'primary' : 'ghost'"
                style="width: 327px; height: 44px; border-radius: 22px"
                html-type="submit"
                >即刻登录</a-button
              >
            </a-form-item>
          </a-form>
          <div
            v-show="isRegistered"
            style="text-align: center; line-height: 24px; font-size: 12px"
          >
            <span
              style="cursor: pointer; color: #a1a4b3"
              @click="isWeChatLogin = true"
              ><img
                src="../assets/icons/wechat.png"
                style="margin-right: 10px"
              />微信登录</span
            >
          </div>
        </template>
      </div>
    </a-modal>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { useUserStore } from "@/store/user";
import storage from "@/utils/storage";
import router from "@/router";
import {
  sendCode,
  getWxUserInfo,
  loginByCode as loginByCodeApi,
} from "@/api/login";
import type { IWxUserInfo } from "@/api/login/types";

const searchWords = ref(""); // 搜索框内容
let Countdown = ref(60);
let timer: NodeJS.Timer | null;
const isLogin = ref(false); // 区分 两个登录面板及逻辑
const isSendCode = ref(false); // 标识当前是否发送了验证码
const isWeChatLogin = ref(false);
const isRegistered = ref(true); // 控制是否是微信登陆未注册
let wxUser: Pick<IWxUserInfo, "avatar" | "openid">;
const appid = "wx1280daa4951e6a86";
const wechatUrl = `https://img.juexiaotime.com/userAdmin/wechat_login.html?appid=${appid}&redirect_uri=${encodeURIComponent(
  location.href
)}&scope=snsapi_login&state=STATE&isIframe=true`;
const userStore = useUserStore();
const phoneReg = /^1[3-9]\d{9}$/;
const loginForm = ref({
  phone: "",
  code: "",
  isAgree: false,
});
// 登录按钮颜色控制，未全部填写时置灰
const isQualify = computed(() => {
  return (
    phoneReg.test(loginForm.value.phone) &&
    loginForm.value.code.length === 6 &&
    loginForm.value.isAgree
  );
});

const agreeValidator = (_rule: Rule, value: boolean) => {
  if (!value) return Promise.reject("请勾选用户协议!");
  return Promise.resolve();
};
const codeRules: Rule[] = [
  {
    required: true,
    message: "验证码不能为空",
    trigger: ["change", "blur"],
  },
  {
    len: 6,
    message: "验证码格式不正确!",
    trigger: ["change", "blur"],
  },
];
const phoneRules: Rule[] = [
  {
    required: true,
    message: "手机号不能为空",
    trigger: ["change", "blur"],
  },
  {
    pattern: phoneReg,
    message: "手机号格式错误",
    trigger: ["change", "blur"],
  },
];
// 使用 finish 事件：需要验证通过才回调
const loginByCode = async () => {
  const { data } = await loginByCodeApi(
    loginForm.value.phone,
    loginForm.value.code,
    wxUser
  );
  if (data.code >= 2000 && data.code < 3000) {
    userStore.$patch(data.data);
    storage.setStorage("user", data.data);
    isLogin.value = false;
    loginForm.value = { phone: "", code: "", isAgree: false };
    message.success("登陆成功！");
  } else {
    message.error(data.msg);
  }
};
// 三种状态
// 1. 为填手机号
// 2. 已填手机号但未发验证码
// 3. 已填手机号且已发验证码
const codeStyle = computed(() => {
  if (!phoneReg.test(loginForm.value.phone) || isSendCode.value) {
    return {
      color: "#a1a4b3",
      cursor: "not-allowed",
    };
  }
  return {
    cursor: "pointer",
    color: "#4379ff",
  };
});
const getCode = async () => {
  // 验证通过才可以发送请求
  if (phoneReg.test(loginForm.value.phone) && !isSendCode.value) {
    isSendCode.value = true;
    timer = setInterval(() => {
      isSendCode.value = true;
      if (--Countdown.value === 0) {
        clearInterval(timer as NodeJS.Timer);
        Countdown.value = 60;
        isSendCode.value = false;
      }
    }, 1000);
    await sendCode(loginForm.value.phone);
    message.success("验证码已发送，请注意查收！");
  }
};

const logout = () => {
  // 传递空键值对
  // 如果使用 {} 是合并
  userStore.$patch({
    id: 0,
    nickname: "",
    avatar: "",
  });
  storage.deleteStorage("user");
  message.success("退出成功！");
};
const searchSubjects = () => {
  if (!searchWords.value.trim()) message.warning("搜索内容不能为空！");
  else {
    router.push(`/search?searchWords=${searchWords.value}`);
    searchWords.value = "";
  }
};
// 清除可能遗漏的定时器
onBeforeUnmount(() => clearInterval(timer as NodeJS.Timer));
window.addEventListener(
  "message",
  (e) => {
    const { code, wechatCode } = e.data;
    if (wechatCode) {
      getWxUserInfo(code).then((res) => {
        const { avatar, openid, id, nickname, phone } = res.data.data;
        if (res.data.code === 5010) {
          message.warning("扫码成功！请绑定手机号后登录！");
          isWeChatLogin.value = false;
          isRegistered.value = false;
          wxUser = { avatar, openid };
        } else {
          isLogin.value = false;
          message.success("微信登陆成功！");
          userStore.$patch({ avatar, id, nickname, phone });
          storage.setStorage("user", { avatar, id, nickname, phone });
        }
      });
    }
  },
  false
);
</script>

<style scoped lang="less">
header {
  width: 100%;
  background-color: #fff;
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
    height: 72px;
    margin: 0 auto;
    img {
      height: 45px;
      margin-right: 10px;
    }
    .left {
      display: flex;
      .search-bar {
        display: flex;
        align-items: center;
        height: 40px;
        width: 343px;
        margin-left: 53px;
        border: 1px solid #a7b0bd;
        border-radius: 10px;

        :deep(.anticon svg) {
          color: #a7b0bd;
          font-size: 16px;
        }
      }
    }
    .user {
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
      .ant-dropdown-trigger {
        color: @titleColor;
      }
      span {
        cursor: pointer;
        &:hover {
          color: @jxColor;
        }
      }
    }
  }
}
</style>
