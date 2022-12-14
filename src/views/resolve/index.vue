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
          <div v-if="resolveItems.resolveItems.length" class="type mt-20">
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
              </div>
              <template v-if="resolveItem.optionSelectVos">
                <span style="color: #4379ff; font-weight: normal"
                  >各选项选择率：</span
                >
                <span
                  v-for="option in resolveItem.optionSelectVos"
                  :key="option.option"
                  style="margin-left: 20px; font-weight: 400"
                  :style="{
                    color: resolveItem.answer.includes(option.option)
                      ? '#4379ff'
                      : '#f5312b',
                  }"
                >
                  <a-progress
                    type="circle"
                    :width="30"
                    :status="
                      !resolveItem.answer.includes(option.option)
                        ? 'exception'
                        : 'normal'
                    "
                    :percent="option.optionRate"
                    :format="() => option.option"
                  />
                  {{ option.optionRate }}%
                </span>
              </template>
              <p class="mt-10">文字解析</p>
              <!-- 
                请只对可信内容使用 HTML 插值，绝不要将用户提供的内容作为插值
                但不能解决表格
                管理后台配置，安全
              -->
              <div class="resolve-detail" v-html="resolveItem.resolve"></div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <resolve-titles-bar
      :resolve-data="resolveData"
      :type-resolve-data="typeResolveData"
      @scroll-to-title="scrollToTitle"
    />
  </div>
  <empty-loading v-else />
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import scrollTo from "@/utils/scrollTo";
import ResolveTitlesBar from "./components/ResolveTitlesBar.vue";
import type { IResolveData, IResolveItem } from "@/api/resolve/types";
import { getResolvesById } from "@/api/resolve";

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
const scrollToTitle = (idx: number) => {
  const subjects = document.querySelectorAll(
    ".subject"
  ) as unknown as HTMLDivElement[];
  const layout = document.querySelector(".layout") as HTMLDivElement;
  // 说明是最后一个子元素，存在达不到顶部的可能
  // 它能达到的最高的位置在 总高度减去 当前屏幕的高度的位置

  // 但是！不能只判断最后一个元素，比如在屏幕高度比较大的时候，有可能显示多个子类
  // 所以，需要通过判断当前的子元素的 offsetTop 是否大于整个列表能够达到的最高的高度
  // 比如 app 最大能卷曲的（scroll）的高度只为 offsetHeight - documentElement.clientHeight
  // 所以只需要判断底部的高度即可！
  const lastScrollTop =
    layout.offsetHeight - document.documentElement.clientHeight;
  if (lastScrollTop > 0)
    if (
      layout.offsetHeight - document.documentElement.clientHeight <
      subjects[idx].offsetTop
    )
      scrollTo(layout.offsetHeight - document.documentElement.clientHeight);
    else scrollTo(subjects[idx].offsetTop);
};
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
});
</script>

<style scoped lang="less">
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
          :deep(.ant-progress) {
            .ant-progress-text {
              color: @jxColor;
            }
            svg {
              width: 30px;
            }
          }
        }
      }
      & .subject:last-child {
        border-bottom: unset;
      }
    }
  }
}
</style>
