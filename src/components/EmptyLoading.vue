<template>
  <div class="empty-loading">
    <a-spin tip="加载中，请稍后..."> </a-spin>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.empty-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 630px;
}
</style>
