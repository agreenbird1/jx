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
        <span>首页/{{ route.query.course }}（{{ chapter?.content }}）</span>
        <div class="time">
          <span
            style="color: #fff; cursor: pointer; margin-right: 20px"
            @click="toggleFullScreen"
          >
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
          <div class="titles-idx">
            <div
              v-for="i in title.count"
              :key="i"
              @click="changeSubject(i + title.start - 1)"
            >
              {{ i + title.start
              }}<span
                class="punctuation"
                :class="{ answered: answers[i - 1 + title.start].length }"
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
          <p class="type-title">{{ subjectType }}共{{ totalScore }}分。</p>
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
            @click="changeSubject(currentSubject?.idx! - 1)"
            >上一题</span
          >
          <span class="ml-20 mr-20">第1题</span>
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
            @click="changeSubject(currentSubject?.idx! + 1)"
            >下一题</span
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, createVNode, onBeforeUnmount, ref, watch } from "vue";
import { notification, Modal } from "ant-design-vue";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/user";
import {
  getSubjectsByChapterId,
  IChapterSubject,
  IChapterSubjectDetails,
  ISubmitSubject,
} from "@/api";
import storage from "@/utils/storage";
import { submitChapter } from "@/api";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import router from "@/router";

const route = useRoute();
const userStore = useUserStore();
const storage_key = (userStore.id + "" + route.query.chapterId) as string;
let isSubmit = ref(false);
const isFullScreen = ref(false);
// 保存当前正在做的题目、以及index，用于保存答案和标记
const currentSubject = ref<{
  idx: number;
  body: IChapterSubjectDetails;
}>();
// 当前章节内容，所有题目
const chapter = ref<IChapterSubject>();
const answers = ref<string[] & string[][]>([]); // 答案信息
const marks = ref<boolean[]>(); // 标记信息
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
    return "一、单选题。每题所设选项中只有一个正确答案，多选、错选活不选均不得分。每题1分，";
  } else if (
    currentSubject.value!.idx <
    subjectTypeNumber.value[1].count + subjectTypeNumber.value[1].start
  )
    return "二、多选题。每题所设选项中有多个正确答案，多选、错选活不选均不得分。每题2分，";
  else
    return "三、不定项。每题所设选项中有一个或多个正确答案，多选、错选活不选均不得分。每题2分，";
});
// 总分
const totalScore = ref(0);
const totalSeconds = ref(0); // 总时间：s
const currentSeconds = ref(
  storage.getStorage<number>("time" + route.query.chapterId) || 0
); // 当前时间：s
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
// 按钮跳转、点击跳转
const changeSubject = (idx: number) => {
  if (idx >= 0 && idx < chapter.value!.otopicFrontVos.length) {
    currentSubject.value!.body = chapter.value!.otopicFrontVos[idx];
    currentSubject.value!.idx = idx;
  }
};
const sendChapter = () => {
  handleClosePage();
  storage.deleteSession(storage_key);
  isSubmit.value = true;
  const userOtopicRecords: ISubmitSubject[] = [];
  const subjects = chapter.value?.otopicFrontVos;
  const handTime = Math.round(currentSeconds.value / 60);
  answers.value.forEach((answer: any, idx) => {
    userOtopicRecords.push({
      uid: userStore.id,
      oid: subjects![idx].id,
      chapterId: chapter.value!.chapterId,
      selectAnswer: typeof answer === "string" ? answer : answer.join(","),
      otopicScore: subjects![idx].score,
    });
  });
  submitChapter({
    uid: userStore.id,
    nickname: userStore.nickname,
    totalScore: totalScore.value,
    totalOtopic: marks.value!.length,
    handTime,
    userOtopicRecords,
  }).then((res) => {
    router.replace(
      `/resolve?id=${res.data.data}&courseName=${route.query.course}&chapterName=${chapter.value?.content}`
    );
  });
};
const submitChapterBtn = () => {
  const isFinished = answers.value.every((answer) => answer.length > 0);
  // 存在有题目未作答！
  if (!isFinished) {
    Modal.confirm({
      title: "注意！",
      icon: createVNode(ExclamationCircleOutlined),
      content: "您当前还有题目未作答！确定要交卷吗？",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        //交卷
        sendChapter();
      },
    });
  } else sendChapter();
};
const startTimer = () => {
  notification.info({
    duration: null,
    description: () =>
      `当前章节答题总时长为${totalScore.value}分钟，到时将自动交卷！请注意把握时间！`,
    message: "注意！",
    style: {
      backgroundColor: "#ddebf6",
    },
    key: "notification",
  });
  timer = setInterval(() => {
    if (!(++currentSeconds.value < totalSeconds.value)) {
      clearInterval(timer as NodeJS.Timer);
      // 交卷逻辑
      isSubmit.value = true;
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
// 初始化获取数据
getSubjectsByChapterId(route.query.chapterId as string).then((res) => {
  const tempChapter = res.data.data[0];
  // 按照单选 => 多选 => 不定项排序
  tempChapter.otopicFrontVos.sort((a, b) => a.type - b.type);
  tempChapter.otopicFrontVos.forEach(
    (subject) => subjectTypeNumber.value[subject.type - 1].count++
  );
  // 获取不同数据的类型题目数
  subjectTypeNumber.value[1].start = subjectTypeNumber.value[0].count;
  subjectTypeNumber.value[2].start =
    subjectTypeNumber.value[1].count + subjectTypeNumber.value[0].count;
  chapter.value = tempChapter;
  // 初始化 marks 全部为 false
  marks.value = new Array(tempChapter.otopicFrontVos.length).fill(false);
  // 初始化答案数据，单选为string 多选为 string[]
  answers.value = [
    ...new Array(subjectTypeNumber.value[0].count).fill(""),
    ...new Array(
      subjectTypeNumber.value[1].count + subjectTypeNumber.value[2].count
    ).fill([]),
  ];
  currentSubject.value = {
    idx: 0,
    body: chapter.value.otopicFrontVos[0],
  };
  // 总分数
  totalScore.value =
    subjectTypeNumber.value[0].count +
    2 * (subjectTypeNumber.value[1].count + subjectTypeNumber.value[2].count);
  totalSeconds.value = totalScore.value * 60; // 单位：s
  const previous = storage.getSession<{
    time: number;
    marks: boolean[];
    answers: string[] & string[][];
  }>(storage_key);
  if (previous)
    Modal.confirm({
      title: "注意！",
      icon: createVNode(ExclamationCircleOutlined),
      content: "查询到当前章节您有未完成的记录，是否继续做题？",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        answers.value = previous.answers;
        marks.value ??= previous.marks;
        currentSeconds.value = previous.time;
        startTimer();
      },
      onCancel() {
        startTimer();
      },
    });
  else startTimer();
});

// 刷新！离开当前页所作处理
const handleClosePage = () => {
  if (!isSubmit.value) {
    storage.setSession(storage_key, {
      time: currentSeconds.value,
      marks: marks.value,
      answers: answers.value,
    });
  }
  clearInterval(timer as NodeJS.Timer);
  // 清除遗留的提醒框
  notification.close("notification");
  notification.close("handlePage");
  if (isFullScreen.value && document.exitFullscreen) {
    document.exitFullscreen();
    isFullScreen.value = false;
  }
};
onBeforeUnmount(handleClosePage);
// 页面刷新需要刷新
window.onbeforeunload = handleClosePage;
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    isFullScreen.value = true;
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      isFullScreen.value = false;
    }
  }
}
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
.do-o-topic {
  user-select: none;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 630px;
  font-size: 14px;
  header {
    height: 70px;
    background: linear-gradient(180deg, #a9d9f7 0%, #77bafd 5%, #70b2ed 100%);
    .user {
      display: flex;
      align-items: center;
      color: #fff;
      width: 250px;
      img {
        width: 48px;
        margin-right: 10px;
      }
    }
    .info {
      padding: 0 10px;
      width: calc(100% - 250px);
      color: #fff;
      .time {
        color: #fafe0d;
        .hand-in-button {
          display: inline-block;
          width: 53px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          margin: 0 20px;
          background: linear-gradient(180deg, #f8e699 0%, #f8ac30 100%);
          border: 1px solid #ea5e45;
          color: #000;
          cursor: pointer;
        }
      }
    }
  }
  .do-o-topic-main {
    display: flex;
    height: calc(100% - 70px);
    background-color: #ddebf6;
    ::-webkit-scrollbar {
      width: 2px; /* 纵向滚动条*/
      height: 6px; /* 横向滚动条 */
      background-color: #fff;
    }
    aside {
      height: 100%;
      width: 252px;
      border-right: 1px solid #2b84cf;
      overflow-y: auto;
      .titles {
        .titles-type {
          padding-left: 10px;
          font-size: 16px;
          color: #000;
          line-height: 30px;
          background: linear-gradient(
            180deg,
            #eeeeee 0%,
            #7abbf3 0%,
            #4b8fc5 100%
          );
        }
        .titles-idx {
          display: flex;
          flex-wrap: wrap;
          text-decoration: underline;
          & > div {
            width: 31px;
            height: 31px;
            text-align: center;
            line-height: 30px;
            background: #ddebf6;
            color: #3937fe;
            border: 1px solid #ffffff;
            cursor: pointer;
            & > span {
              color: #f5312b;
            }
          }
          .answered {
            color: #567722;
          }
        }
      }
      .explain {
        color: #f5312b;
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
        & > p {
          margin: 0;
          border-bottom: 1px solid #2b84cf;
          font-size: 13px;
          color: #1c1e23;
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
            background: linear-gradient(
              180deg,
              #eeeeee 0%,
              #7abbf3 0%,
              #4b8fc5 100%
            );
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
        .control-btn {
          width: 56px;
          height: 20px;
          text-align: center;
          background: linear-gradient(180deg, #ffffff 0%, #abc6ed 100%);
          border: 1px solid #9cafee;
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
