<template>
  <div class="resolve">
    <div class="resolve-wrapper">
      <main-header
        :title="
          route.query.courseName + ' - ' + route.query.chapterName + '批改结果'
        "
      ></main-header>
      <div class="resolve-body">
        <div class="type">单选题：共4题，每题一分</div>
        <div class="subject">
          <p class="subject-title mb-20">
            1、甲为勒索财物，打算绑架富商之子吴某（5岁）。甲欺骗乙、丙说："富商欠我100万元不还，你们帮我扣押其子，成功后给你们每人10万元。"乙、丙将吴某扣押，但甲无法联系上富商，未能进行勒索。三天后，甲让乙、丙将吴某释放。吴某一人在回家路上溺水身亡。关于本案，下列哪一项选项是正确的？
          </p>
          <a-radio-group v-model:value="value">
            <a-radio :style="radioStyle" :value="1"
              >Option AOption AOption AOption AOption AOption AOption AOption
              AOption AOption AOption AOption AOptionOption AOption AOption
              AOption AOption AOption AOption AOption AOption AOption AOption
              AOption AOpOption AOption AOption AOption AOption AOption AOption
              AOption AOption AOption AOption AOption AOption AOption Ation
              AOption A AOption A</a-radio
            >
            <a-radio :style="radioStyle" :value="2">Option B</a-radio>
            <a-radio :style="radioStyle" :value="3">Option C</a-radio>
            <a-radio :style="radioStyle" :value="4"> Option D </a-radio>
          </a-radio-group>
          <div class="resolve-detail-wrapper">
            <div class="correct mb-20 mt-20">
              正确答案：C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 您的答案：C
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: #131936"
                >全站正确率：39%</span
              >
            </div>
            <p>文字解析</p>
            <div class="resolve-detail">
              根据《刑法》第117条规定：“破坏轨道、桥梁、隧道、公路、机场、航道、灯塔、标志或者进行其他破坏活动，足以使火车、汽车、电车、船只、航空器发生倾覆、毁坏危险，尚未造成严重后果的，处三年以上十年以下有期徒刑。”
              <br />
              AD项：本罪是危险犯，客体是交通运输安全，陈某破坏轨道的行为足以导致火车发生倾覆、毁坏的危险，所以构成破坏交通设施罪，因及时发现，未造成火车倾覆、毁坏的事故，不构成本罪的结果加重犯。因此，AD项错误。<br />
              BC项：陈某只是欲制造火车出轨事故，故意范围中并不包括
            </div>
          </div>
        </div>
        <div class="subject">
          <p class="subject-title mb-20">
            1、甲为勒索财物，打算绑架富商之子吴某（5岁）。甲欺骗乙、丙说："富商欠我100万元不还，你们帮我扣押其子，成功后给你们每人10万元。"乙、丙将吴某扣押，但甲无法联系上富商，未能进行勒索。三天后，甲让乙、丙将吴某释放。吴某一人在回家路上溺水身亡。关于本案，下列哪一项选项是正确的？
          </p>
          <a-radio-group v-model:value="value">
            <a-radio :style="radioStyle" :value="1"
              >Option AOption AOption AOption AOption AOption AOption AOption
              AOption AOption AOption AOption AOptionOption AOption AOption
              AOption AOption AOption AOption AOption AOption AOption AOption
              AOption AOpOption AOption AOption AOption AOption AOption AOption
              AOption AOption AOption AOption AOption AOption AOption Ation
              AOption A AOption A</a-radio
            >
            <a-radio :style="radioStyle" :value="2">Option B</a-radio>
            <a-radio :style="radioStyle" :value="3">Option C</a-radio>
            <a-radio :style="radioStyle" :value="4"> Option D </a-radio>
          </a-radio-group>
          <div class="resolve-detail-wrapper">
            <div class="correct mb-20 mt-20">
              正确答案：C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 您的答案：C
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                style="color: #131936"
                >全站正确率：39%</span
              >
            </div>
            <p>文字解析</p>
            <div class="resolve-detail">
              根据《刑法》第117条规定：“破坏轨道、桥梁、隧道、公路、机场、航道、灯塔、标志或者进行其他破坏活动，足以使火车、汽车、电车、船只、航空器发生倾覆、毁坏危险，尚未造成严重后果的，处三年以上十年以下有期徒刑。”
              <br />
              AD项：本罪是危险犯，客体是交通运输安全，陈某破坏轨道的行为足以导致火车发生倾覆、毁坏的危险，所以构成破坏交通设施罪，因及时发现，未造成火车倾覆、毁坏的事故，不构成本罪的结果加重犯。因此，AD项错误。<br />
              BC项：陈某只是欲制造火车出轨事故，故意范围中并不包括
            </div>
          </div>
        </div>
      </div>
    </div>
    <aside>
      <p>题号卡</p>
      <div class="scores-wrapper">
        <div class="scores">得分：<span>3</span>/15</div>
        <div class="correct-subjects">答对题数：<span>3</span>/15</div>
      </div>
      <div class="type-scores">
        <p>单选题</p>
        <div class="idx-list">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
      </div>
      <div class="type-scores">
        <p>单选题</p>
        <div class="idx-list">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
      </div>
      <div class="type-scores">
        <p>单选题</p>
        <div class="idx-list">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { getResolvesById } from "@/api";
import { reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const radioStyle = reactive({
  display: "flex",
  lineHeight: "30px",
});
getResolvesById(route.query.id as unknown as number).then((res) => {
  console.log(res.data);
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
          }
          .resolve-detail {
            font-weight: 500;
            font-size: 14px;
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
        span {
          display: inline-block;
          line-height: 39px;
          text-align: center;
          color: #fff;
          width: 39px;
          height: 39px;
          border-radius: 20px;
          background-color: #4379ff;
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
