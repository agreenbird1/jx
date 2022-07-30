<template>
  <div class="home-skeleton">
    <h6><skeleton class="mt-20" width="60px" height="24px" /></h6>
    <div>
      <skeleton class="mt-20" width="500px" height="24px" />
    </div>
    <div>
      <skeleton class="mt-20" width="240px" height="44px" />
    </div>
    <div class="main">
      <skeleton
        v-for="i in 9"
        :key="i"
        class="mt-20 mr-20"
        width="240px"
        height="44px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from "@juexiao/juexiao-AFanTi-UI";
</script>

<style scoped lang="less">
.main {
  .skeleton:nth-child(3n) {
    margin-right: 0px;
  }
}
</style>
