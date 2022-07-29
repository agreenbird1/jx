<template>
  <div class="record mt-20">
    <main-header title="做题记录"></main-header>
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
}
</style>
