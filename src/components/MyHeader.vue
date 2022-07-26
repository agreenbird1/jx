<template>
  <header>
    <div class="header-container">
      <div class="left">
        <router-link to="/">
          <img src="../assets/logo.png" />
        </router-link>
        <div class="search-bar">
          <a-input
            v-model="searchWords"
            placeholder="搜索题目名称"
            :bordered="false"
            allow-clear
          >
            <template #prefix>
              <search-outlined />
            </template>
          </a-input>
        </div>
      </div>
      <div class="user">
        <a-avatar src="https://joeschmoe.io/api/v1/random" />
        <a-dropdown>
          <a @click.prevent> 觉晓学员 </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";

const searchWords = ref("");
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
      .ant-dropdown-trigger {
        color: @titleColor;
      }
    }
  }
}
</style>
