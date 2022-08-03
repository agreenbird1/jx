<template>
  <div v-show="top >= showTop" class="back-to-top" @click="scrollTo(0, false)">
    <arrow-up-outlined />
  </div>
</template>

<script setup lang="ts">
import { ArrowUpOutlined } from "@ant-design/icons-vue";
import useScroll from "@/hooks/useScroll";
import scrollTo from "@/utils/scrollTo";

withDefaults(
  defineProps<{
    showTop?: number;
  }>(),
  {
    showTop: 200,
  }
);
const { top } = useScroll(null, {});
</script>

<style scoped lang="less">
.back-to-top {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: @jxColor;
  position: fixed;
  right: 3vw;
  bottom: 60px;
  z-index: 9999;
  font-size: 20px;
  cursor: pointer;
  span {
    color: #fff;
  }
}
</style>
