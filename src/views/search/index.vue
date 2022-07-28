<template>
  <div class="search mt-20">
    <main-header title="搜索作答"></main-header>
    <div class="search-body br-5">
      <div class="type mb-20">
        <span class="type-button mr-20">单选</span>
        <span>题号1202020</span>
      </div>
      <p class="subject-title mb-20">
        <span class="type-button">单选</span>
        1、甲为勒索财物，打算绑架富商之子吴某（5岁）。甲欺骗乙、丙说："富商欠我100万元不还，你们帮我扣押其子，成功后给你们每人10万元。"乙、丙将吴某扣押，但甲无法联系上富商，未能进行勒索。三天后，甲让乙、丙将吴某释放。吴某一人在回家路上溺水身亡。关于本案，下列哪一项选项是正确的？
      </p>
      <a-radio-group v-model:value="value">
        <a-radio :style="radioStyle" :value="1"
          >Option AOption AOption AOption AOption AOption AOption AOption
          AOption AOption AOption AOption AOptionOption AOption AOption AOption
          AOption AOption AOption AOption AOption AOption AOption AOption
          AOpOption AOption AOption AOption AOption AOption AOption AOption
          AOption AOption AOption AOption AOption AOption Ation AOption A
          AOption A</a-radio
        >
        <a-radio :style="radioStyle" :value="2">Option B</a-radio>
        <a-radio :style="radioStyle" :value="3">Option C</a-radio>
        <a-radio :style="radioStyle" :value="4"> Option D </a-radio>
      </a-radio-group>
      <div class="confirm">
        <span>确认作答</span>
      </div>
      <div class="resolve mt-20">
        <div class="correct mb-20">
          正确答案：C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 您的答案：C
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #131936"
            >全站正确率：39%</span
          >
        </div>
        <p>文字解析</p>
        <div class="resolve-body">
          根据《刑法》第117条规定：“破坏轨道、桥梁、隧道、公路、机场、航道、灯塔、标志或者进行其他破坏活动，足以使火车、汽车、电车、船只、航空器发生倾覆、毁坏危险，尚未造成严重后果的，处三年以上十年以下有期徒刑。”
          <br />
          AD项：本罪是危险犯，客体是交通运输安全，陈某破坏轨道的行为足以导致火车发生倾覆、毁坏的危险，所以构成破坏交通设施罪，因及时发现，未造成火车倾覆、毁坏的事故，不构成本罪的结果加重犯。因此，AD项错误。<br />
          BC项：陈某只是欲制造火车出轨事故，故意范围中并不包括
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
const radioStyle = ref({
  display: "flex",
  fontSize: "14px",
  fontFamily: "PingFangSC",
  lineHeight: "30px",
});
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
    .hoverShadow();
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
}
</style>
