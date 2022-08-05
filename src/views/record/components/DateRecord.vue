<template>
  <div class="date-record mb-20">
    <div class="title">
      <img src="../../../assets/icons/date.png" />
      <span
        >{{ date.split("-")[0] }}/{{ date.split("-")[1] }}/{{
          date.split("-")[2]
        }}</span
      >
    </div>
    <div class="record-list">
      <record-item
        v-for="record in records"
        :id="record.id"
        :key="record.id"
        :total-scores="record.totalScore"
        :scores="record.getScore"
        :total-questions="record.totalOtopic"
        :questions="record.doOtopicNum"
        :chapter-name="record.content"
        :course-name="record.secondChapterContent"
        :is-show-course-name="false"
        class="mt-20"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRecord } from "@/api/home/types";

interface IDateRecord {
  date: string;
  records: IRecord[];
}
defineProps<IDateRecord>();
</script>

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
