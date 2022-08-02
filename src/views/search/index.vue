<template>
  <template v-if="isLoading">
    <empty-loading tip="搜索中，请稍后..." />
  </template>
  <template v-else-if="!searchSubjects.length">
    <div class="empty">
      <img src="@/assets/icons/empty.png" />
      <span class="mt-20"
        >对不起，没有您想要搜索的结果，换个关键词试试吧？</span
      >
    </div>
  </template>
  <div v-else class="search mt-20">
    <main-header title="搜索作答"></main-header>
    <DynamicScroller
      :items="searchSubjects"
      :min-item-size="265"
      class="scroller"
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.isSubmit]"
          :data-index="index"
        >
          <div class="search-body mt-20 br-5">
            <div class="type mb-20">
              <span class="type-button mr-20">
                {{
                  item.type === 1 ? "单选" : item.type === 2 ? "多选" : "不定项"
                }}
              </span>
              <span>题号{{ item.topicNumber }}</span>
            </div>
            <p class="subject-title mb-20">{{ index + 1 }}、{{ item.title }}</p>
            <a-radio-group
              v-if="item.type === 1"
              v-model:value="item.answer"
              :disabled="item.isSubmit"
            >
              <a-radio
                v-for="(option, oIdx) in item.options.split(`\n`)"
                :key="oIdx"
                :style="radioStyle"
                :value="option[0]"
                >{{ option }}</a-radio
              >
            </a-radio-group>
            <a-checkbox-group
              v-else
              v-model:value="item.answer"
              style="width: 100%"
              :disabled="item.isSubmit"
            >
              <a-row
                v-for="(option, oIdx) in item.options.split(`\n`)"
                :key="oIdx"
              >
                <a-checkbox :value="option[0]">{{ option }}</a-checkbox>
              </a-row>
            </a-checkbox-group>
            <div v-if="!item.isSubmit" class="confirm">
              <span @click="submitSubject(item)">确认作答</span>
            </div>
            <div v-else class="resolve mt-20">
              <div class="correct mb-20">
                正确答案：{{ item.rightAnswer }}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  :style="{
                    color: item.otopicStatus === 1 ? '#4379ff' : '#f5312b',
                  }"
                  >您的答案：{{
                    item.type === 1 ? item.answer : item.answer.join(",")
                  }}</span
                >
              </div>
              <p>文字解析</p>
              <div class="resolve-body">
                {{ item.resolve }}
              </div>
            </div>
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script setup lang="ts">
import {
  ISearchSubject,
  searchSubjectByKeyWords,
  searchSubjectResult,
} from "@/api";
import { useUserStore } from "@/store/user";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userStore = useUserStore();
const searchSubjects = ref<ISearchSubject[]>([]);
const isLoading = ref(false);
const radioStyle = ref({
  display: "flex",
  fontSize: "14px",
  fontFamily: "PingFangSC",
  lineHeight: "30px",
});
const submitSubject = async (subject: ISearchSubject) => {
  const selectAnswer =
    typeof subject.answer === "string"
      ? subject.answer
      : subject.answer!.sort().join(",");
  const { data } = await searchSubjectResult({
    uid: userStore.id,
    oid: subject.id,
    chapterId: subject.chapterId,
    selectAnswer,
    otopicScore: subject.type === 1 ? 1 : 2,
  });
  subject.isSubmit = true;
  const { answer, resolve, otopicStatus } = data.data;
  subject.rightAnswer = answer;
  subject.resolve = resolve;
  subject.otopicStatus = otopicStatus;
};
watch(
  () => route.query.searchWords,
  () => {
    isLoading.value = true;
    searchSubjectByKeyWords(route.query.searchWords as string).then((res) => {
      isLoading.value = false;
      searchSubjects.value = res.data.data;
      searchSubjects.value.forEach((subject) => {
        subject.isSubmit = false;
        subject.answer = subject.type === 1 ? "" : [];
      });
    });
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="less">
.type-button {
  display: inline-block;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 5px;
  width: 48px;
  color: @jxColor;
  background-color: #e0e9ff;
}
.search {
  padding: 20px;
  background-color: #fff;
  .search-body {
    padding: 20px;
    border: 1px solid #d8d8d8;
    .type {
      font-size: 12px;
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
    .subject-title {
      font-size: 14px;
      color: #131936;
      line-height: 22px;
    }
    .confirm {
      text-align: right;
      font-size: 12px;
      color: #fff;
      span {
        display: inline-block;
        width: 56px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background-color: @jxColor;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .resolve {
      .correct {
        font-size: 14px;
        color: @jxColor;
      }
      .resolve-body {
        font-size: 14px;
        color: @assistTextColor;
      }
    }
  }
  .scroller {
    height: 100%;
  }
}
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: @assistTextColor;
  height: 100vh;
  margin-top: 20px;
  background-color: #fff;
}
</style>
