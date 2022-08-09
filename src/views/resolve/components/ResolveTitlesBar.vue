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
    <section>
      <template
        v-for="(typeItems, typeIdx) in typeResolveData"
        :key="typeItems.name"
      >
        <div
          v-if="typeItems.resolveItems.length"
          class="type-scores"
          @click="scrollToTitle"
        >
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
              :data-idx="idx + typeItems.start"
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
    </section>
    <div class="type-mark">
      <span><i style="background-color: #eeeef4"></i> 未作答 </span>
      <span><i style="background-color: #4379ff"></i> 答对 </span>
      <span><i style="background-color: #f5312b"></i> 答错 </span>
    </div>
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
const scrollToTitle = (e: Event) => {
  const idx = (e.target as HTMLElement).dataset.idx;
  idx && emits("scrollToTitle", +idx);
};
</script>

<style scoped lang="less">
aside {
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 20px;
  padding: 20px;
  margin-left: 20px;
  border-radius: 10px;
  width: 380px;
  max-height: 500px;
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
  section {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
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
          width: 38px;
          height: 38px;
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
  .type-mark {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 40px;
    span {
      line-height: 16px;
      height: 16px;
    }
    i {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 3px;
      vertical-align: top;
      border-radius: 8px;
    }
  }
}

::-webkit-scrollbar {
  width: 2px; /* 纵向滚动条*/
  height: 2px; /* 横向滚动条 */
  background-color: #fff;
}
</style>
