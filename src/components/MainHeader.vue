<template>
  <div class="main-header pb-20 flex-bt">
    <span>{{ title }}</span>
    <router-link to="/">
      <span>&nbsp;返回题库&nbsp;</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped lang="less">
.main-header {
  & span:last-child {
    font-size: 12px;
    color: @jxColor;
    border: 1px solid @jxColor;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
