<template>
  <div class="record mt-20">
    <div class="record-title pt-20 pb-20 flex-bt">
      <span>做题记录</span>
      <router-link to="/">
        <span>&nbsp;返回题库&nbsp;</span>
      </router-link>
    </div>
    <DateRecord />
    <DateRecord />
    <DateRecord />
  </div>
</template>

<script setup lang="ts">
import DateRecord from "./components/DateRecord.vue";
</script>

<style scoped lang="less">
.record {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  min-height: 500px;
  .record-title {
    & span:last-child {
      font-size: 12px;
      color: @jxColor;
      border: 1px solid @jxColor;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
