<template>
  <div class="home mt-20">
    <!-- 添加骨架组件加载动画！ -->
    <div class="home-subjects">
      <template v-if="objectiveSubject">
        <div class="title pt-20">{{ objectiveSubject?.content }}</div>
        <a-tabs animated centered>
          <a-tab-pane
            v-for="course in objectiveSubject?.children"
            :key="course.id"
            :tab="course.content"
          >
            <div class="random flex-bt">
              <span>随机出题</span>
              <right-outlined />
            </div>
            <div class="chapters">
              <div
                v-for="chapter in course.children"
                :key="chapter.id"
                class="chapter mt-20 mr-20 flex-bt"
                @click="
                  $router.push(
                    `/doOTopic?course=${course.content}&chapterId=${chapter.id}`
                  )
                "
              >
                <span>{{ chapter.content }}</span>
                <span>{{ chapter.doOtopicNum }}/{{ chapter.otopicNum }}</span>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </template>
      <template v-else>
        <home-skeleton />
      </template>
    </div>
    <aside class="ml-20">
      <div class="record br-5">
        <template v-if="records?.length">
          <div class="title flex-bt">
            <span>做题记录</span>
            <router-link to="/record">
              <span>查看全部 <right-outlined /> </span>
            </router-link>
          </div>
          <record-item
            v-for="record in records"
            :id="record.id"
            :key="record.id"
            :total-scores="record.totalScore"
            :scores="record.getScore"
            :total-questions="record.totalOtopic"
            :questions="record.doOtopicNum"
            :course-name="record.secondChapterContent"
            :chapter-name="record.content"
            class="ml-20 mb-20"
          ></record-item>
        </template>
        <template v-else>
          <div class="empty">
            <img src="@/assets/icons/empty.png" alt="" />
            <span
              >{{ userStore.id ? "暂时没有做题记录哦！" : "请登录后查看" }}
            </span>
          </div>
        </template>
      </div>
      <div class="rank br-5 mt-20">
        <template v-if="rankList?.length">
          <div class="title mb-20 pl-20">做题排名</div>
          <div class="rank-list">
            <div
              v-for="rankItem in rankList"
              :key="rankItem.nickname"
              class="rank-item flex-bt mb-20"
            >
              <div class="student">
                <template v-if="rankItem.rank === 3">
                  <img src="@/assets/icons/rank3.png" />
                </template>
                <template v-else-if="rankItem.rank === 2">
                  <img src="@/assets/icons/rank2.png" />
                </template>
                <template v-else-if="rankItem.rank === 1">
                  <img src="@/assets/icons/rank1.png" />
                </template>
                <template v-else>
                  <span>{{ rankItem.rank }}</span>
                </template>
                <span>{{ rankItem.nickname }}</span>
              </div>
              <span>{{ rankItem.doQuestionNum }}</span>
            </div>
          </div>
          <div class="rank-end">- 排名仅展示前50名 -</div>
        </template>
        <template v-else>
          <div class="rank-empty">
            <img src="@/assets/icons/empty.png" />
            <span>暂时没有人做题哦，赶快去做题争夺榜首吧！</span>
          </div>
        </template>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RightOutlined } from "@ant-design/icons-vue";
import {
  getAllSubjects,
  IChapter,
  getRecords,
  IRecord,
  getRankList,
  IRankItem,
} from "@/api";
import HomeSkeleton from "./components/HomeSkeleton.vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const records = ref<IRecord[]>();
const objectiveSubject = ref<IChapter>();
const rankList = ref<IRankItem[]>();
getAllSubjects().then((res) => {
  objectiveSubject.value = res.data.data[0];
});
getRecords(false).then((res) => {
  records.value = res.data.data;
});
getRankList().then((res) => {
  rankList.value = res.data.data;
});
</script>

<style scoped lang="less">
.home {
  display: flex;
  .home-subjects {
    width: 800px;
    padding: 0 25px 50px 15px;
    background-color: #fff;
    border-radius: 5px;
    .title {
      font-weight: 500;
      font-family: PingFangSC-Medium, PingFang SC;
    }
    .random,
    .chapter {
      .hoverShadow();
      padding: 0 20px 0 18px;
      width: 240px;
      height: 44px;
      background-color: @bgColor;
      border-radius: 5px;
      cursor: pointer;
      :deep(.anticon svg) {
        color: @assistTextColor;
      }
    }
    .chapters {
      display: flex;
      flex-wrap: wrap;
      .chapter {
        background-color: #fff;
        border: 1px solid @bgColor;
        span:last-child {
          color: @assistTextColor;
        }
      }
      .chapter:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  aside {
    width: 380px;
    .record {
      background-color: #fff;
      height: 392px;
      .title {
        padding: 19px 20px 19px 20px;
        height: 62px;
        & span:last-child {
          font-size: 14px;
          color: @assistTextColor;
          cursor: pointer;
        }
      }
    }
    .rank {
      display: flex;
      flex-direction: column;
      height: 557px;
      padding: 11px 0 20px 0;
      background-color: #fff;
      .rank-list {
        flex: 1;
        padding: 0 20px;
        overflow-y: auto;
        .rank-item {
          height: 24px;
          .student {
            img {
              margin-right: 20px;
            }
            & span:first-child {
              display: inline-block;
              width: 24px;
              text-align: center;
              color: @assistTextColor;
              margin-right: 20px;
            }
          }
        }
      }
      .rank-end {
        text-align: center;
        font-size: 12px;
        color: @assistTextColor;
      }
      .rank-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: @assistTextColor;
        font-size: 14px;
        span {
          margin-top: 10px;
        }
      }
    }
    .empty {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: @assistTextColor;
      font-size: 14px;
      img {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
