<template>
  <div class="home mt-20">
    <div class="home-subjects">
      <div class="title pt-20">客观题</div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="刑法">
          <div class="random">
            <span>随机出题</span>
            <right-outlined />
          </div>
          <div class="chapters">
            <div v-for="i in 40" :key="i" class="chapter mt-20 mr-20">
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
        <div class="title">
          <span>做题记录</span>
          <span>查看全部 <right-outlined /> </span>
        </div>
        <div class="record-item br-5 ml-20 mb-20">
          <div class="chapter">
            <span>chapter name</span>
            <span>得分: 0/10 &nbsp;&nbsp;&nbsp;&nbsp; 做题数: 0/10</span>
          </div>
          <div class="view br-5">查看</div>
        </div>
        <div class="record-item br-5 ml-20 mb-20">
          <div class="chapter">
            <span>chapter name</span>
            <span>得分: 0/10 &nbsp;&nbsp;&nbsp;&nbsp; 做题数: 0/10</span>
          </div>
          <div class="view br-5">查看</div>
        </div>
        <div class="record-item br-5 ml-20 mb-20">
          <div class="chapter">
            <span>chapter name</span>
            <span>得分: 0/10 &nbsp;&nbsp;&nbsp;&nbsp; 做题数: 0/10</span>
          </div>
          <div class="view br-5">查看</div>
        </div>
        <div class="record-item br-5 ml-20 mb-20">
          <div class="chapter">
            <span>chapter name</span>
            <span>得分: 0/10 &nbsp;&nbsp;&nbsp;&nbsp; 做题数: 0/10</span>
          </div>
          <div class="view br-5">查看</div>
        </div>
      </div>
      <div class="rank br-5 mt-20">
        <div class="title mb-20">做题排名</div>
        <div v-for="(stu, idx) in rankList" :key="idx" class="rank-item mb-20">
          <div class="student">
            <template v-if="idx < 3">
              <img :src="`../../../src/assets/icons/rank${idx + 1}.png`" />
            </template>
            <template v-else>
              <span>{{ idx + 1 }}</span>
            </template>
            <span>{{ stu.name }}</span>
          </div>
          <span>{{ stu.scores }}</span>
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
const rankList = ref([
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
  {
    name: "觉晓学员",
    scores: 1000,
  },
]);
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
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      .title,
      .record-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .title {
        padding: 19px 20px 19px 20px;
        height: 62px;
        & span:last-child {
          font-size: 14px;
          color: @assistTextColor;
          cursor: pointer;
        }
      }
      .record-item {
        .hoverShadow();
        padding: 12px;
        width: 340px;
        height: 62px;
        border: 1px solid @bgColor;
        .chapter {
          span {
            display: block;
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
    }
    .rank {
      height: 557px;
      padding: 11px 20px 20px 20px;
      background-color: #fff;
      overflow-y: auto;
      .rank-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
