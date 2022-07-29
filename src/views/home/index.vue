<template>
  <div class="home mt-20">
    <div class="home-subjects">
      <div class="title pt-20">客观题</div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="刑法">
          <div class="random flex-bt">
            <span>随机出题</span>
            <right-outlined />
          </div>
          <div class="chapters">
            <div v-for="i in 40" :key="i" class="chapter mt-20 mr-20 flex-bt">
              <span>刑法的解释</span>
              <span>0/4</span>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="民法" force-render
          >Content of Tab Pane 2</a-tab-pane
        >
        <a-tab-pane key="3" tab="诉讼法">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </div>
    <aside class="ml-20">
      <div class="record br-5">
        <div class="title flex-bt">
          <span>做题记录</span>
          <router-link to="/record">
            <span>查看全部 <right-outlined /> </span>
          </router-link>
        </div>
        <record-item
          v-for="i in 4"
          :key="i"
          :total-scores="10"
          :scores="2"
          :total-questions="10"
          :questions="2"
          course-name="刑法"
          chapter-name="刑法的解释"
          class="ml-20 mb-20"
        ></record-item>
      </div>
      <div class="rank br-5 mt-20">
        <div class="title mb-20">做题排名</div>
        <div v-for="idx in 50" :key="idx" class="rank-item flex-bt mb-20">
          <div class="student">
            <template v-if="idx === 3">
              <img src="../../assets/icons/rank3.png" />
            </template>
            <template v-else-if="idx === 2">
              <img src="../../assets/icons/rank2.png" />
            </template>
            <template v-else-if="idx === 1">
              <img src="../../assets/icons/rank1.png" />
            </template>
            <template v-else>
              <span>{{ idx }}</span>
            </template>
            <span>觉晓学员</span>
          </div>
          <span>1000</span>
        </div>
        <div class="rank-end">- 排名仅展示前50名 -</div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RightOutlined } from "@ant-design/icons-vue";

const activeKey = ref("1");
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
      height: 557px;
      padding: 11px 20px 20px 20px;
      background-color: #fff;
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
      .rank-end {
        text-align: center;
        font-size: 12px;
        color: @assistTextColor;
      }
    }
  }
}
</style>
