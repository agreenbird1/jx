<template>
  <div class="do-o-topic">
    <header class="flex-bt">
      <div class="user pl-20">
        <img :src="userStore.avatar" />
        <span>昵称：{{ userStore.nickname }}</span>
      </div>
      <div class="info flex-bt">
        <span>首页/刑法（刑法的解释）</span>
        <div class="time">
          <span>已答题时间：00:00:04</span>
          <span class="hand-in-button">交卷</span>
        </div>
      </div>
    </header>
    <div class="do-o-topic-main">
      <aside>
        <div class="titles">
          <div class="titles-type">一、单选题</div>
          <div class="titles-idx">
            <div v-for="i in 12" :key="i">
              1<span class="punctuation">*</span>
            </div>
          </div>
        </div>
        <div class="titles">
          <div class="titles-type">一、单选题</div>
          <div class="titles-idx">
            <div v-for="i in 12" :key="i">
              1<span class="punctuation">*</span>
            </div>
          </div>
        </div>
        <div class="titles">
          <div class="titles-type">一、单选题</div>
          <div class="titles-idx">
            <div v-for="i in 12" :key="i">
              1<span class="punctuation">*</span>
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
          <p class="type-title">
            一、单选题。每题所设选项中只有一个正确答案，多选、错选活不选均不得分。每题1分，共6分。
          </p>
          <div class="title-detail">
            <p>第一题、</p>
            <div class="resolve">
              <div class="option-wrapper">
                <span class="option">A.</span>
                <span class="option-detail">
                  被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑
                </span>
              </div>
              <div class="option-wrapper">
                <span class="option">A.</span>
                <span class="option-detail">
                  被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑
                  被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑
                  被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑
                </span>
              </div>
              <div class="option-wrapper">
                <span class="option">A.</span>
                <span class="option-detail">
                  被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑
                  被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑
                  被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑
                </span>
              </div>
              <div class="option-wrapper">
                <span class="option">A.</span>
                <span class="option-detail">
                  被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑
                  被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑
                  被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑被宣告缓刑的犯罪份子，在考验期内再犯罪的，应当数罪并罚，且不得再次宣告缓刑
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="controller-bar">
          <a-checkbox>标记</a-checkbox>
          <span class="control-btn">上一题</span>
          <span class="ml-20 mr-20">第1题</span>
          <a-radio-group size="small" name="radioGroup">
            <a-radio value="1">A</a-radio>
            <a-radio value="2">B</a-radio>
            <a-radio value="3">C</a-radio>
            <a-radio value="4">D</a-radio>
          </a-radio-group>
          <span class="control-btn">下一题</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
</script>

<style scoped lang="less">
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
    aside {
      height: 100%;
      width: 250px;
      border-right: 1px solid #2b84cf;
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
      width: calc(100% - 250px);
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
      }
    }
  }
}
</style>
