<script setup lang="ts">
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";
import * as echarts from "echarts";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import {
  MatchInfoControllerService,
  Result_Page_MatchInfoVO_,
  Voting,
} from "@/generated";
import { VotingControllerService } from "../../generated";
import access_Enum from "@/access/accessEnum";
// @ts-ignore
import confetti from "canvas-confetti";

const router = useRouter();

const competitionId = router.currentRoute.value.query.competitionId;

const dataList = ref({
  competitionId: "",
  contestant1Id: "",
  contestant1Song: "",
  contestant2Id: "",
  contestant2Song: "",
  contestantName1: "",
  contestantName2: "",
  isMatchOpen: true,
  matchId: null,
  score: 0,
  score2: 0,
  voted: false,
});

const userStore = useUserStore();
// 获取用户信息
const { loginUser } = storeToRefs(userStore);

const loadData = async () => {
  const res = await MatchInfoControllerService.getCurrentMatchUsingPost({
    competitionId: competitionId as any,
  });
  if (res.code === 0) {
    dataList.value = res.data;
  } else {
    message.error("获取数据失败" + res.message);
  }
};

// 定义定时任务的间隔时间（毫秒为单位）
const intervalTime = 2000;

const doVote1 = async (contestantId: any, data: any) => {
  // 先判断是否登录
  if (loginUser.value.userRole == access_Enum.NOT_LOGIN) {
    message.error("请先登录");
    router.push({
      path: "/user/login",
      replace: true,
    });
    return;
  }
  const form = ref({
    contestantId: contestantId as any,
    userId: loginUser.value.id as any,
  });
  const res = await VotingControllerService.addVoteUsingPost(form.value);
  if (res.code === 0) {
    data.voted = true;
    var end = Date.now() + 5 * 1000;
    // go Buckeyes!
    var colors = ["#d41919", "#f0f7f6"];
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
    message.success("投票成功");
  } else {
    message.error("投票失败" + res.message);
  }
};

const doVote2 = async (contestantId: any, data: any) => {
  // 先判断是否登录
  if (loginUser.value.userRole == access_Enum.NOT_LOGIN) {
    message.error("请先登录");
    router.push({
      path: "/user/login",
      replace: true,
    });
    return;
  }
  const form = ref({
    contestantId: contestantId as any,
    userId: loginUser.value.id as any,
  });
  const res = await VotingControllerService.addVoteUsingPost(form.value);
  if (res.code === 0) {
    data.voted = true;
    var end = Date.now() + 5 * 1000;
    // go Buckeyes!
    var colors = ["#d41919", "#f5f1f1"];
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
    message.success("投票成功");
  } else {
    message.error("投票失败" + res.message);
  }
};
const main = ref();

function init() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(main.value);
  // 指定图表的配置项和数据
  var option = {
    tooltip: {},
    legend: {
      data: ["票数"],
    },
    xAxis: {
      data: ["选手1", "选手2"],
    },
    yAxis: {},
    series: [
      {
        name: "票数",
        type: "bar",
        data: [dataList.value.score, dataList.value.score2],
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

onMounted(() => {
  loadData();
  init();
  const timer = setInterval(loadData, intervalTime);
  const timer2 = setInterval(init, intervalTime);
  onUnmounted(() => {
    clearInterval(timer);
    clearInterval(timer2);
  });
});
</script>

<template>
  <div id="matchManage">
    <div class="matchInfo">
      <a-card :style="{ width: '360px' }">
        <template #actions>
          <a-button
            type="text"
            status="success"
            @click="doVote1(dataList.contestant1Id, dataList)"
            :disabled="dataList.voted"
          >
            <template #icon>
              <icon-heart-fill style="font-size: 28px" />
            </template>
            <a style="font-size: 20px; margin-bottom: 5px">投票</a>
          </a-button>
        </template>
        <template #cover>
          <div
            :style="{
              height: '250px',
              overflow: 'hidden',
            }"
          >
            <img
              :style="{
                width: '100%',
                height: '100%',
                transform: 'translateY(-20px)',
              }"
              alt="dessert"
              src="../../assets/t1.png"
            />
          </div>
        </template>
        <a-card-meta :title="'演唱歌曲：' + dataList.contestant1Song">
          <template #avatar>
            <div
              :style="{
                display: 'flex',
                alignItems: 'center',
                color: '#1D2129',
              }"
            >
              <a-avatar :size="64" :style="{ marginRight: '8px' }">
                {{ dataList.contestantName1 }}
              </a-avatar>
              <a-typography-text>
                {{ dataList.contestantName1 }}
              </a-typography-text>
            </div>
          </template>
        </a-card-meta>
      </a-card>
      <div :style="{ width: '360px' }">
        <img
          :style="{ width: '100%' }"
          alt="dessert"
          src="../../assets/icon-vs-red.png"
        />
      </div>
      <a-card :style="{ width: '360px' }">
        <template #actions>
          <a-button
            type="text"
            status="success"
            @click="doVote2(dataList.contestant2Id, dataList)"
            :disabled="dataList.voted"
          >
            <template #icon>
              <icon-heart-fill style="font-size: 28px" />
            </template>
            <a style="font-size: 20px; margin-bottom: 5px">投票</a>
          </a-button>
        </template>
        <template #cover>
          <div
            :style="{
              height: '250px',
              overflow: 'hidden',
            }"
          >
            <img
              :style="{
                width: '100%',
                height: '100%',
                transform: 'translateY(-20px)',
              }"
              alt="dessert"
              src="../../assets/t2.png"
            />
          </div>
        </template>
        <a-card-meta :title="'演唱歌曲：' + dataList.contestant2Song">
          <template #avatar>
            <div
              :style="{
                display: 'flex',
                alignItems: 'center',
                color: '#1D2129',
              }"
            >
              <a-avatar :size="64" :style="{ marginRight: '8px' }">
                {{ dataList.contestantName2 }}
              </a-avatar>
              <a-typography-text>
                {{ dataList.contestantName2 }}
              </a-typography-text>
            </div>
          </template>
        </a-card-meta>
      </a-card>
    </div>
    <div
      ref="main"
      style="height: 350px; max-width: 20%; margin-top: 600px; left: 40%"
    ></div>
  </div>
</template>

<style scoped>
#matchManage {
  background: url("@/assets/bg.png") no-repeat;
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

h1 {
  text-align: center;
  font-size: 50px;
  margin-top: 100px;
  color: #fefefe;
  text-shadow: 0 0 0.5em #189bdf, 0 0 0.2em #5c5c5c;
}

.matchInfo {
  display: flex;
  justify-content: space-between; /* 保持卡片间隔 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1080px; /* 根据卡片宽度和间距调整容器宽度 */
  margin: 0 auto; /* 居中显示 */
  margin-bottom: 25vh;
}
</style>
