<template>
  <div v-if="resolveData" class="resolve">
    <div class="resolve-wrapper">
      <main-header
        :title="
          route.query.courseName + ' - ' + route.query.chapterName + '批改结果'
        "
      ></main-header>
      <div class="resolve-body">
        <template
          v-for="resolveItems in typeResolveData"
          :key="resolveItems.name"
        >
          <div class="type mt-20">
            {{ resolveItems.name }}：共{{
              resolveItems.resolveItems.length
            }}题，每题{{ resolveItems.score }}分
          </div>
          <div
            v-for="(resolveItem, idx) in resolveItems.resolveItems"
            :key="resolveItem.id"
            class="subject"
          >
            <p class="subject-title mb-20">
              {{ idx + 1 + resolveItems.start }}、{{ resolveItem.title }}
            </p>
            <div
              v-for="(option, oIdx) in resolveItem.options.split(`\n`)"
              :key="oIdx"
              :style="radioStyle"
              :value="option[0]"
              class="options"
            >
              <span
                :class="
                  resolveItems.name === '单选题'
                    ? resolveItem.answer === option[0]
                      ? 'single'
                      : 'single-default'
                    : resolveItem.answer.includes(option[0])
                    ? 'multiply'
                    : 'multiply-default'
                "
              ></span>
              <span>{{ option }}</span>
            </div>
            <div class="resolve-detail-wrapper">
              <div class="correct mb-20 mt-20">
                正确答案：{{ resolveItem.answer }}
                <span
                  :class="
                    resolveItem.answer === resolveItem.selectAnswer
                      ? ''
                      : resolveItem.selectAnswer
                      ? 'answer-wrong'
                      : 'answer-unanswered'
                  "
                  >您的答案：{{
                    resolveItem.selectAnswer
                      ? resolveItem.selectAnswer
                      : "未作答"
                  }}</span
                ><span style="color: #131936"
                  >全站正确率：{{ resolveItem.correctRate }}%</span
                >
                <template v-if="resolveItem.optionSelectVos">
                  <span>各选项选择率：</span>
                  <span
                    v-for="option in resolveItem.optionSelectVos"
                    :key="option.option"
                    style="margin-left: 20px"
                  >
                    <a-progress
                      type="circle"
                      :width="30"
                      :status="
                        !resolveItem.answer.includes(option.option)
                          ? 'exception'
                          : 'success'
                      "
                      :percent="option.optionRate"
                      :format="() => option.option"
                    />
                  </span>
                </template>
              </div>
              <p>文字解析</p>
              <div class="resolve-detail">
                {{ resolveItem.resolve }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
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
      <div
        v-for="(typeItems, typeIdx) in typeResolveData"
        :key="typeItems.name"
        class="type-scores"
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
          >
            {{ idx + 1 + typeItems.start }}
          </span>
        </div>
      </div>
    </aside>
  </div>
  <div v-else class="empty-loading">
    <a-spin tip="加载中，请稍后..."> </a-spin>
  </div>
</template>

<script setup lang="ts">
import { getResolvesById, IResolveData, IResolveItem } from "@/api";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const resolveData = ref<IResolveData>();
const radioStyle = reactive({
  display: "flex",
  lineHeight: "30px",
});
// 根据题目类型分类渲染
const typeResolveData = ref<
  {
    name: string;
    resolveItems: IResolveItem[];
    start: number;
    score: string;
  }[]
>([
  {
    name: "单选题",
    resolveItems: [],
    start: 0,
    score: "一",
  },
  {
    name: "多选题",
    resolveItems: [],
    start: 0,
    score: "二",
  },
  {
    name: "不定项",
    resolveItems: [],
    start: 0,
    score: "二",
  },
]);
// 答案仅作显示，不可更改
// 所以需要冻结
const answers = computed<(string | string[])[]>(() => {
  const ans: (string | string[])[] = [];
  resolveData.value?.markOtopicVos.forEach((resolveItem, idx) => {
    ans[idx] =
      resolveItem.type === 1
        ? resolveItem.answer
        : resolveItem.answer.split(",");
  });
  return ans;
});
getResolvesById(route.query.id as unknown as number).then((res) => {
  resolveData.value = res.data.data;
  resolveData.value.markOtopicVos.forEach((resolveItem, idx) => {
    typeResolveData.value[resolveItem.type - 1].resolveItems.push(resolveItem);
    answers.value![idx] =
      resolveItem.type === 1
        ? resolveItem.answer
        : resolveItem.answer.split(",");
  });
  typeResolveData.value[1].start = typeResolveData.value[0].resolveItems.length;
  typeResolveData.value[2].start =
    typeResolveData.value[1].resolveItems.length +
    typeResolveData.value[0].resolveItems.length;
  console.log(resolveData.value);
});
</script>

<style scoped lang="less">
.empty-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 630px;
}
.resolve {
  display: flex;
  margin-top: 20px;
  .resolve-wrapper {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 20px 0 20px;
    .resolve-body {
      width: 800px;
      .type {
        font-weight: 600;
        & span:last-child {
          display: inline-block;
          height: 20px;
          text-align: center;
          line-height: 20px;
          border-radius: 5px;
          width: 100px;
          color: @assistTextColor;
          border: 1px solid #d8d8d8;
        }
      }
      .subject {
        padding: 20px 0;
        border-bottom: 1px solid #d8d8d8;
        .options {
          display: flex;
          font-size: 14px;
          span:first-child {
            margin-top: 9px;
            width: 14px;
            height: 14px;
            margin-right: 10px;
          }
          span:last-child {
            width: calc(100% - 50px);
          }
          .single {
            border: 4px solid #4379ff;
            border-radius: 7px;
          }
          .multiply {
            position: relative;
            border-radius: 4px;
            background-color: #fff;
            border: 1px solid @assistTextColor;
            &::after {
              position: absolute;
              left: 50%;
              top: 50%;
              content: "";
              width: 5px;
              height: 5px;
              background-color: #4379ff;
              transform: translateX(-50%) translateY(-50%);
            }
          }
          .single-default {
            border: 1px solid @assistTextColor;
            border-radius: 7px;
          }
          .multiply-default {
            border: 1px solid @assistTextColor;
            border-radius: 4px;
          }
          &:hover {
            background-color: @bgColor;
          }
        }
        .subject-title {
          color: #131936;
          line-height: 22px;
        }
        .resolve-detail-wrapper {
          font-size: 14px;
          font-weight: 600;
          .correct {
            font-weight: 500;
            font-size: 14px;
            color: @jxColor;
            span {
              margin-left: 40px;
            }
          }
          .resolve-detail {
            font-weight: 500;
            font-size: 14px;
            color: @assistTextColor;
          }
          .answer-wrong {
            color: @dangerColor;
          }
          .answer-unanswered {
            color: @assistTextColor;
          }
        }
      }
      & .subject:last-child {
        border-bottom: unset;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 2px; /* 纵向滚动条*/
    height: 2px; /* 横向滚动条 */
    background-color: #fff;
  }
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
          display: inline-block;
          line-height: 39px;
          text-align: center;
          color: #fff;
          width: 39px;
          height: 39px;
          margin-right: 25px;
          margin-bottom: 20px;
        }
        & span:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
