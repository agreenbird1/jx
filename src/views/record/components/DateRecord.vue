<template>
  <div class="date-record mb-20">
    <div class="title">
      <img src="../../../assets/icons/date.png" />
      <span>2022/06/20</span>
    </div>
    <div class="record-list">
      <record-item
        v-for="i in 7"
        :key="i"
        :total-scores="10"
        :scores="2"
        :total-questions="10"
        :questions="2"
        chapter-name="刑法的解释"
        class="mt-20"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.date-record {
  .title {
    height: 24px;
    line-height: 24px;
    img {
      margin-right: 6px;
    }
    span {
      font-weight: bold;
    }
  }
  .record-list {
    display: flex;
    flex-wrap: wrap;
    .record-item {
      width: 280px;
      height: 80px;
      margin-right: 13px;
    }
    & .record-item:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>
