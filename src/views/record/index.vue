<template>
  <div v-if="dateRecords.length" class="record mt-20">
    <main-header title="做题记录"></main-header>
    <DateRecord
      v-for="dateRecord in dateRecords"
      :key="dateRecord.date"
      :date="dateRecord.date"
      :records="dateRecord.records"
      class="mt-20"
    />
  </div>
  <empty-loading v-else />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getRecords, IRecord } from "@/api";
import DateRecord from "./components/DateRecord.vue";

interface IDateRecord {
  date: string;
  records: IRecord[];
}

const dateRecords = ref<IDateRecord[]>([]);
getRecords().then((res) => {
  const temp: Record<string, IRecord[]> = {};
  res.data.data.forEach((recordItem) => {
    const key = recordItem.createTime.split("T")[0];
    if (!temp[key]) temp[key] = [];
    temp[key].push(recordItem);
  });
  for (const iterator in temp) {
    dateRecords.value.push({
      date: iterator,
      records: temp[iterator],
    });
  }
  // 日期当前格式为 2022-07-12 格式，直接去除 - 符号，再用一元运算符转换即可
  dateRecords.value.sort(
    (a, b) => +a.date.replaceAll("-", "") - +b.date.replaceAll("-", "")
  );
});
</script>

<style scoped lang="less">
.record {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  min-height: 500px;
}
</style>
