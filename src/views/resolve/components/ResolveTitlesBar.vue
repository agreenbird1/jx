<template>
  <aside>
    <p>题号卡</p>
    <div class="scores-wrapper">
      <div class="scores">
        得分：<span>{{ resolveData?.getScore }}</span
        >/{{ resolveData?.totalScore }}
      </div>
      <div class="correct-subjects">
        答对题数：<span>{{ resolveData?.correctNum }}</span
        >/{{ resolveData?.totalOtopic }}
      </div>
    </div>
    <template
      v-for="(typeItems, typeIdx) in typeResolveData"
      :key="typeItems.name"
    >
      <div v-if="typeItems.resolveItems.length" class="type-scores">
        <p>{{ typeItems.name }}</p>
        <div class="idx-list">
          <span
            v-for="(idxItem, idx) in typeItems.resolveItems"
            :key="idxItem.id"
            :class="
              idxItem.selectAnswer
                ? idxItem.answer === idxItem.selectAnswer
                  ? 'correct'
                  : 'wrong'
                : 'unanswered'
            "
            :style="{ borderRadius: typeIdx > 0 ? '5px' : '20px' }"
            @click="scrollToTitle(idx + typeItems.start)"
          >
            {{ idx + 1 + typeItems.start }}
            <img
              v-if="idxItem.isMark"
              src="@/assets/icons/mark.png"
              class="mark"
            />
          </span>
        </div>
      </div>
    </template>
  </aside>
</template>

<script setup lang="ts">
import { IResolveData, IResolveItem } from "@/api/resolve/types";

defineProps<{
  resolveData: IResolveData;
  typeResolveData: {
    name: string;
    resolveItems: IResolveItem[];
    start: number;
    score: string;
  }[];
}>();
const emits = defineEmits(["scrollToTitle"]);
const scrollToTitle = (idx: number) => emits("scrollToTitle", idx);
</script>

<style scoped lang="less">
aside {
  position: sticky;
  top: 0;
  padding: 20px;
  margin-left: 20px;
  border-radius: 10px;
  width: 380px;
  max-height: 500px;
  overflow-y: auto;
  background-color: #fff;
  p {
    margin: 0;
  }
  .scores-wrapper {
    display: flex;
    .scores {
      span {
        font-size: 24px;
        color: @dangerColor;
      }
    }
    .correct-subjects {
      margin-left: 30px;
      span {
        font-size: 24px;
        color: #4379ff;
      }
    }
  }
  .type-scores {
    p {
      margin: 10px 0;
    }
    .idx-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .correct {
        background-color: #4379ff;
      }
      .wrong {
        background-color: #f5312b;
      }
      .unanswered {
        background-color: #eeeef4;
      }
      span {
        position: relative;
        display: inline-block;
        line-height: 39px;
        text-align: center;
        color: #fff;
        width: 39px;
        height: 39px;
        margin-right: 25px;
        margin-bottom: 20px;
        cursor: pointer;
        .mark {
          position: absolute;
          top: -2px;
          right: -12px;
        }
      }
      & span:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}

::-webkit-scrollbar {
  width: 2px; /* 纵向滚动条*/
  height: 2px; /* 横向滚动条 */
  background-color: #fff;
}
</style>
