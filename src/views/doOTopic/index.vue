<template>
  <!-- 加载提示 -->
  <empty-loading
    v-if="!currentSubject?.body || isSubmit"
    :tip="
      isSubmit
        ? '正在批改中，请稍后。如长时间未跳转，请刷新页面...'
        : '题目加载中...'
    "
  />
  <div v-else class="do-o-topic">
    <header class="flex-bt">
      <div class="user pl-20">
        <img :src="userStore.avatar" />
        <span>昵称：{{ userStore.nickname }}</span>
      </div>
      <div class="info flex-bt">
        <span
          >首页/{{ route.query.course
          }}{{ route.query.chapterId ? `（${route.query.chapterName}）` : "" }}
          <a-switch v-model:checked="isDark" size="small">
            <template #checkedChildren><smile-filled /></template>
            <template #unCheckedChildren><meh-filled /></template>
          </a-switch>
        </span>
        <div class="time">
          <span class="font-control">
            字体大小：
            <plus-square-outlined
              :class="{ disabled: isMax }"
              @click="incrementFontSize"
            />
            <minus-square-outlined
              :class="{ disabled: isMin }"
              @click="decrementFontSize"
            />
          </span>
          <span
            style="color: #fff; cursor: pointer; margin-right: 20px"
            @click="toggleFullScreen()"
          >
            全屏：
            <component
              :is="isFullScreen ? FullscreenExitOutlined : FullscreenOutlined"
            />
          </span>
          <span
            >已答题时间：{{ currentTimes.hours }}:{{ currentTimes.minutes }}:{{
              currentTimes.seconds
            }}</span
          >
          <span class="hand-in-button" @click="submitChapterBtn">交卷</span>
        </div>
      </div>
    </header>
    <div class="do-o-topic-main">
      <aside>
        <div
          v-for="title in subjectTypeNumber"
          :key="title.name"
          class="titles"
        >
          <div class="titles-type">{{ title.name }}</div>
          <div class="titles-idx" @click="changeSubject">
            <div
              v-for="i in title.count"
              :key="i"
              :data-idx="i + title.start - 1"
            >
              {{ i + title.start
              }}<span
                :class="{ answered: answers[i - 1 + title.start].length }"
                :data-idx="i + title.start - 1"
                >{{
                  marks![i - 1 + title.start]
                    ? "?"
                    : answers[i - 1 + title.start].length
                    ? ""
                    : "*"
                }}
              </span>
            </div>
          </div>
        </div>
        <div class="explain">
          说明：<br />
          1.题号右方的“*”符号代表该小题尚未选择答案<br />
          2.题号右方的“？”符号代表该小题做过标记。<br />
          3.选择选项的同时自动保存答案
        </div>
      </aside>
      <section>
        <div class="title-wrapper">
          <p><span>试卷</span></p>
          <p class="type-title">{{ subjectType }}</p>
          <div class="title-detail">
            <p>第{{ currentSubject?.idx + 1 }}题、</p>
            <div class="resolve">
              <div class="option-wrapper mb-10">
                {{ currentSubject?.body.title }}
              </div>
              <div
                v-for="(option, i) in currentSubject?.body.options.split(`\n`)"
                :key="i"
                class="option-wrapper"
              >
                <span class="option">
                  {{ option.split(".")[0] + "." }}&nbsp;
                </span>
                <span class="option-detail">
                  {{ option.split(".")[1] }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="controller-bar">
          <a-checkbox v-model:checked="marks![currentSubject?.idx!]"
            >标记</a-checkbox
          >
          <span
            class="control-btn"
            :class="{ disabled: currentSubject?.idx === 0 }"
            :data-idx="currentSubject?.idx! - 1"
            @click="changeSubject"
            >上一题</span
          >
          <span class="ml-20 mr-20">第{{ currentSubject?.idx! + 1 }}题</span>
          <template v-if="currentSubject?.idx! >= subjectTypeNumber[0].count">
            <a-checkbox-group v-model:value="answers[currentSubject?.idx!]">
              <a-checkbox value="A">A</a-checkbox>
              <a-checkbox value="B">B</a-checkbox>
              <a-checkbox value="C">C</a-checkbox>
              <a-checkbox value="D">D</a-checkbox>
            </a-checkbox-group>
          </template>
          <template v-else>
            <a-radio-group
              v-model:value="answers[currentSubject?.idx!]"
              size="small"
              name="radioGroup"
            >
              <a-radio value="A">A</a-radio>
              <a-radio value="B">B</a-radio>
              <a-radio value="C">C</a-radio>
              <a-radio value="D">D</a-radio>
            </a-radio-group>
          </template>
          <span
            class="control-btn"
            :class="{
              disabled:
                currentSubject?.idx === chapter!.otopicFrontVos.length - 1,
            }"
            :data-idx="currentSubject?.idx! + 1"
            @click="changeSubject"
            >下一题</span
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, createVNode, onBeforeUnmount, ref } from "vue";
import { notification, Modal, message } from "ant-design-vue";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  MehFilled,
  SmileFilled,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/user";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import useFullScreen from "@/hooks/useFullScreen";
import useDark from "@/hooks/useDark";
import useFontSize from "@/hooks/useFontSize";
import router from "@/router";
import { getSubjectsAtRandom } from "@/api/home";
import { submitChapter, getSubjectsByChapterId } from "@/api/subject";
import type {
  IChapterSubjectDetails,
  IChapterSubject,
  ISubmitSubject,
} from "@/api/subject/types";

const route = useRoute();
const userStore = useUserStore();
const isSubmit = ref(false);
const isRandom = ref("");
const { isDark } = useDark();
const { isFullScreen, toggleFullScreen } = useFullScreen();
const { isMax, isMin, incrementFontSize, decrementFontSize } = useFontSize(
  "--aft-do-main-fs",
  18,
  12
);
// 保存当前正在做的题目、以及index，用于保存答案和标记
const currentSubject = ref<{
  idx: number;
  body: IChapterSubjectDetails;
}>();
// 当前章节内容，所有题目
const chapter = ref<IChapterSubject>();
const answers = ref<string[] & string[][]>([]); // 答案信息
const marks = ref<boolean[]>([]); // 标记信息
// 记录每一种类型的题目数量以及下标，控制侧边栏的渲染
const subjectTypeNumber = ref([
  {
    count: 0,
    name: "一、单选题",
    start: 0,
  },
  {
    count: 0,
    name: "二、多选题",
    start: 0,
  },
  {
    count: 0,
    name: "三、不定项",
    start: 0,
  },
]);
// type类型的不同返回，用于大标题显示
const subjectType = computed(() => {
  if (currentSubject.value!.idx < subjectTypeNumber.value[0].count) {
    return `一、单选题。每题所设选项中只有一个正确答案，多选、错选活不选均不得分。每题1分，共${subjectTypeNumber.value[0].count}分`;
  } else if (
    currentSubject.value!.idx <
    subjectTypeNumber.value[1].count + subjectTypeNumber.value[1].start
  )
    return `二、多选题。每题所设选项中有多个正确答案，多选、错选活不选均不得分。每题2分，共${
      subjectTypeNumber.value[1].count * 2
    }分`;
  else
    return `三、不定项。每题所设选项中有一个或多个正确答案，多选、错选活不选均不得分。每题2分，共${
      subjectTypeNumber.value[2].count * 2
    }分`;
});
// 总分
const totalScore = ref(0);
const totalSeconds = ref(0); // 总时间：s
const currentSeconds = ref(0); // 当前时间：s
const currentTimes = computed(() => {
  const h = Math.floor(currentSeconds.value / 3600);
  const m = Math.floor(currentSeconds.value / 60) % 60;
  const s = currentSeconds.value % 60;
  return {
    hours: h < 10 ? "0" + h : h,
    minutes: m < 10 ? "0" + m : m,
    seconds: s < 10 ? "0" + s : s,
  };
});
// 计时控制
let timer: NodeJS.Timer | null = null;

// 使用事件委托，而非多个绑定
const changeSubject = (e: Event) => {
  const idx = (e.target as HTMLDivElement).dataset.idx;
  if (idx && +idx >= 0 && +idx < chapter.value!.otopicFrontVos.length) {
    // 多选题要么不选，选则至少两个
    if (
      currentSubject.value?.body.type === 2 &&
      answers.value[currentSubject.value.idx].length === 1
    ) {
      message.warning("多选题至少选择两个答案！");
    } else {
      currentSubject.value!.body = chapter.value!.otopicFrontVos[+idx];
      currentSubject.value!.idx = +idx;
    }
  }
};
const sendChapter = async (submitType: 0 | 1 = 0) => {
  const subjects = chapter.value?.otopicFrontVos;
  const userOtopicRecords: ISubmitSubject[] = answers.value.map(
    (answer: any, idx) => {
      return {
        id: subjects![idx].id,
        oid: subjects![idx].oid,
        chapterId: chapter.value!.otopicFrontVos[idx].chapterId,
        isMark: marks.value![idx] ? 1 : 0,
        selectAnswer:
          typeof answer === "string" ? answer : answer.sort().join(","),
        otopicScore: subjects![idx].score,
      };
    }
  );

  return submitChapter(
    {
      nickname: userStore.nickname,
      totalScore: totalScore.value,
      userOtopicRecords,
      eid: chapter.value!.eid!,
    },
    submitType
  );
};
const handSendChapter = async () => {
  handleClosePage();
  const res = await sendChapter(1);
  router.replace(
    `/resolve?id=${res.data.data}&courseName=${route.query.course}&chapterName=${route.query.chapterName}`
  );
};
const submitChapterBtn = async () => {
  const isFinished = answers.value.every((answer) => answer.length > 0);
  // 存在有题目未作答！
  if (!isFinished) {
    Modal.confirm({
      title: "注意！",
      icon: createVNode(ExclamationCircleOutlined),
      content: "您当前还有题目未作答！确定要交卷吗？",
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        //交卷
        handSendChapter();
      },
    });
  } else handSendChapter();
};
const startTimer = () => {
  notification.info({
    duration: null,
    description: () =>
      `当前章节答题剩余时长为${Math.ceil(
        (totalSeconds.value - currentSeconds.value) / 60
      )}分钟，到时将自动交卷！请注意把握时间！`,
    message: "注意！",
    style: {
      backgroundColor: "#ddebf6",
    },
    key: "notification",
  });
  timer = setInterval(async () => {
    // 到时自动交卷
    if (!(++currentSeconds.value < totalSeconds.value)) {
      clearInterval(timer as NodeJS.Timer);
      // 交卷逻辑
      handSendChapter();
    }
    if (currentSeconds.value % 120 === 0 && !isRandom.value) {
      sendChapter();
    }
    if (totalSeconds.value - currentSeconds.value === 10) {
      notification.info({
        duration: null,
        description: () =>
          `${totalSeconds.value - currentSeconds.value}秒后将自动交卷！`,
        message: "注意！",
        style: {
          backgroundColor: "#ddebf6",
        },
        key: "handlePage",
      });
    }
  }, 1000);
};
const initSubjects = (data: IChapterSubject[]) => {
  const tempChapter = data[0];
  // 按照单选 => 多选 => 不定项排序
  tempChapter.otopicFrontVos.sort((a, b) => a.type - b.type);
  tempChapter.otopicFrontVos.forEach((subject, idx) => {
    subjectTypeNumber.value[subject.type - 1].count++;
    // 初始化标记信息
    if (isRandom.value) {
      marks.value[idx] = false;
      answers.value[idx] = (subject.type === 1 ? "" : []) as string & string[];
    } else {
      marks.value[idx] = subject.isMark === 1;
      // 初始化答案数据，单选为string 多选为 string[]
      answers.value[idx] = (
        subject.type === 1
          ? subject.selectAnswer
          : subject.selectAnswer.length
          ? subject.selectAnswer.split(",")
          : []
      ) as string & string[];
    }
  });
  // 获取不同数据的类型题目数
  subjectTypeNumber.value[1].start = subjectTypeNumber.value[0].count;
  subjectTypeNumber.value[2].start =
    subjectTypeNumber.value[1].count + subjectTypeNumber.value[0].count;
  chapter.value = tempChapter;
  currentSubject.value = {
    idx: 0,
    body: chapter.value.otopicFrontVos[0],
  };
  // 总分数
  totalScore.value =
    subjectTypeNumber.value[0].count +
    2 * (subjectTypeNumber.value[1].count + subjectTypeNumber.value[2].count);
  totalSeconds.value =
    (subjectTypeNumber.value[0].count +
      3 *
        (subjectTypeNumber.value[1].count + subjectTypeNumber.value[2].count)) *
    60; // 单位：s
  currentSeconds.value = isRandom.value
    ? 0
    : Math.floor((new Date().getTime() - tempChapter.firstTime) / 1000);
  startTimer();
};
if (!route.query.isRandom) {
  getSubjectsByChapterId(route.query.chapterId as string).then((res) => {
    initSubjects(res.data.data);
  });
} else {
  isRandom.value = route.query.isRandom as string;
  getSubjectsAtRandom(route.query.chapterId as string).then((res) => {
    console.log(res.data.data);
    initSubjects(res.data.data);
  });
}

// 刷新！离开当前页所作处理
const handleClosePage = () => {
  isSubmit.value = true;
  // 可能存在未点击确定退出的情况
  Modal.destroyAll();
  // 退出做题界面时退出全屏
  isFullScreen.value && toggleFullScreen();
  clearInterval(timer as NodeJS.Timer);
  // 清除遗留的提醒框
  notification.close("notification");
  notification.close("handlePage");
};
onBeforeUnmount(() => {
  handleClosePage();
});
</script>

<style scoped lang="less">
.do-o-topic {
  user-select: none;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 630px;
  font-size: 14px;
  transition: all 0.5s ease-in;
  header {
    height: 70px;
    background: var(--aft-do-header-bgcolor);
    .user {
      display: flex;
      align-items: center;
      width: 250px;
      color: var(--aft-do-info-color);
      img {
        width: 48px;
        border-radius: 24px;
        margin-right: 10px;
      }
    }
    .info {
      padding: 0 10px;
      width: calc(100% - 250px);
      color: var(--aft-do-info-color);
      .time {
        color: var(--aft-do-time-color);
        .font-control {
          color: #fff;
          margin-right: 10px;
          span {
            cursor: pointer;
            margin-right: 10px;
          }
          .disabled {
            cursor: not-allowed;
            color: @assistTextColor;
          }
        }
        .hand-in-button {
          display: inline-block;
          width: 53px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          margin: 0 20px;
          background: var(--aft-do-hand-in-bgcolor);
          border: 1px solid var(--aft-do-hand-in-bdcolor);
          color: var(--aft-do-hand-in-color);
          cursor: pointer;
        }
      }
    }
  }
  .do-o-topic-main {
    display: flex;
    height: calc(100% - 70px);
    background-color: var(--aft-do-main-bgcolor);
    ::-webkit-scrollbar {
      width: 2px; /* 纵向滚动条*/
      height: 6px; /* 横向滚动条 */
      background-color: #fff;
    }
    aside {
      height: 100%;
      width: 252px;
      border-right: 1px solid var(--aft-do-aside-bdcolor);
      overflow-y: auto;
      .titles {
        .titles-type {
          padding-left: 10px;
          font-size: 16px;
          color: var(--aft-do-aside-title-color);
          line-height: 30px;
          background: var(--aft-do-aside-title-bgcolor);
        }
        .titles-idx {
          display: flex;
          flex-wrap: wrap;
          & > div {
            width: 31px;
            height: 31px;
            text-align: center;
            // 下划线的颜色是与文字颜色一致，但需要设置到同一处
            text-decoration: underline;
            line-height: 30px;
            background: var(--aft-do-aside-item-bgcolor);
            color: var(--aft-do-aside-item-color);
            border: 1px solid var(--aft-do-aside-item-bdcolor);
            cursor: pointer;
            & > span {
              color: var(--aft-do-aside-mark-bdcolor);
            }
          }
          .answered {
            color: var(--aft-do-aside-answered-bdcolor);
          }
        }
      }
      .explain {
        color: var(--aft-do-aside-explain-bdcolor);
        padding: 7px;
        font-size: 12px;
      }
    }
    section {
      height: 100%;
      width: calc(100% - 252px);
      padding: 20px;
      .title-wrapper {
        height: calc(100% - 80px);
        color: var(--aft-do-main-title-color);
        font-size: var(--aft-do-main-fs);
        & > p {
          margin: 0;
          border-bottom: 1px solid var(--aft-do-main-titlewp-bdcolor);
        }
        & > p:first-child {
          span {
            display: inline-block;
            width: 80px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            background: var(--aft-do-main-title-bgcolor);
            border-radius: 3px 3px 0px 0px;
          }
        }
        .type-title {
          height: 50px;
          line-height: 50px;
        }
        .title-detail {
          height: calc(100% - 60px);
          p {
            margin: 0;
            line-height: 30px;
          }
          .resolve {
            height: calc(100% - 50px);
            overflow-y: auto;
            .option-wrapper {
              display: flex;
              margin-left: 50px;
            }
          }
        }
      }
      .controller-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        height: 80px;
        span {
          color: var(--aft-do-main-btn-color);
        }

        .control-btn {
          width: 56px;
          height: 20px;
          text-align: center;
          color: var(--aft-do-main-btn-color);
          line-height: 20px;
          background: var(--aft-do-main-btn-bgcolor);
          border: 1px solid var(--aft-do-main-btn-bdcolor);
          cursor: pointer;
        }
        .disabled {
          cursor: not-allowed;
          color: @assistTextColor;
        }
      }
    }
  }
}
</style>
