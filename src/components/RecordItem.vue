<template>
  <div class="record-item br-5 flex-bt">
    <div class="chapter">
      <span>{{ courseName }} {{ chapterName }}</span>
      <span
        >得分: {{ scores }}/{{ totalScores }} &nbsp;&nbsp;&nbsp;&nbsp; 做题数:
        {{ questions }}/{{ totalQuestions }}</span
      >
    </div>
    <div
      class="view br-5"
      @click="
        $router.push(
          `/resolve?id=${id}&courseName=${courseName}&chapterName=${chapterName}`
        )
      "
    >
      查看
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  courseName: {
    type: String,
    required: false,
    default: "",
  },
  chapterName: {
    type: String,
    required: true,
  },
  totalScores: {
    type: Number,
    required: true,
  },
  scores: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  questions: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped lang="less">
.record-item {
  .hoverShadow();
  padding: 12px;
  width: 340px;
  height: 62px;
  border: 1px solid @bgColor;
  .chapter {
    span {
      display: block;
      font-size: 14px;
    }
    & span:last-child {
      font-size: 12px;
      color: @assistTextColor;
    }
  }
  .view {
    width: 44px;
    height: 20px;
    font-size: 11px;
    background-color: #d9e4ff;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    color: @jxColor;
  }
}
</style>
