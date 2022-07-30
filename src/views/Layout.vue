<template>
  <div class="layout">
    <home-header />
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeHeader from "../components/HomeHeader.vue";
</script>

<style scoped lang="less">
.layout {
  background-color: @bgColor;
  width: 100%;
  padding-bottom: 100px;
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
          height: 40px;
          width: 343px;
          margin-left: 53px;
          border: 1px solid #a7b0bd;
          border-radius: 5px;
        }
      }
    }
  }
  .main {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
