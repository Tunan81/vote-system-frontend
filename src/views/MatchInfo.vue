<script setup lang="ts">
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";
import { computed, onMounted, ref, watch } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import {
  MatchInfoControllerService,
  Result_Page_MatchInfoVO_,
  Voting,
} from "@/generated";
import { VotingControllerService } from "../generated";
import access_Enum from "@/access/accessEnum";
// @ts-ignore
import confetti from "canvas-confetti";

const router = useRouter();

const competitionId = router.currentRoute.value.query.competitionId;

const dataList = ref<Result_Page_MatchInfoVO_[]>([]);

const userStore = useUserStore();
// 获取用户信息
const { loginUser } = storeToRefs(userStore);
const loadData = async () => {
  const res = await MatchInfoControllerService.listMatchInfoPageUsingPost({
    competitionId: competitionId as any,
  });
  if (res.code === 0) {
    dataList.value = res.data.records.map((data: any) => ({
      ...data,
      // todo 如果用户刷新页面按钮状态禁用状态消失，不能限制只能给一个人投票（bug）但是能跑 dog
      voted: false, // 添加一个字段标识用户是否已经投过票，默认为 false
    }));
  } else {
    message.error("获取数据失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});

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
</script>

<template>
  <div id="matchManage">
    <h1>交响入梦 尘世华章</h1>
    <a-scrollbar style="height: 800px; overflow: auto">
      <div class="matchInfo">
        <template v-if="dataList && dataList.length > 0">
          <div
            v-for="(data, index) in dataList"
            :key="index"
            class="cards-container"
          >
            <a-card :style="{ width: '360px' }">
              <template #actions>
                <a-button
                  type="text"
                  status="success"
                  @click="doVote1(data.contestant1Id, data)"
                  :disabled="data.voted"
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
                    src="@/assets/t1.png"
                  />
                </div>
              </template>
              <a-card-meta :title="'演唱歌曲：' + data.contestant1Song">
                <template #avatar>
                  <div
                    :style="{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#1D2129',
                    }"
                  >
                    <a-avatar :size="64" :style="{ marginRight: '8px' }">
                      {{ data.contestantName1 }}
                    </a-avatar>
                    <a-typography-text>
                      {{ data.contestantName1 }}
                    </a-typography-text>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
            <div :style="{ width: '360px' }">
              <img
                :style="{ width: '100%' }"
                alt="dessert"
                src="@/assets/icon-vs-red.png"
              />
            </div>
            <a-card :style="{ width: '360px' }">
              <template #actions>
                <a-button
                  type="text"
                  status="success"
                  @click="doVote2(data.contestant2Id, data)"
                  :disabled="data.voted"
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
                    src="@/assets/t2.png"
                  />
                </div>
              </template>
              <a-card-meta :title="'演唱歌曲：' + data.contestant2Song">
                <template #avatar>
                  <div
                    :style="{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#1D2129',
                    }"
                  >
                    <a-avatar :size="64" :style="{ marginRight: '8px' }">
                      {{ data.contestantName2 }}
                    </a-avatar>
                    <a-typography-text>
                      {{ data.contestantName2 }}
                    </a-typography-text>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </template>
      </div>
    </a-scrollbar>
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
  position: absolute;
  top: 1025vh;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cards-container {
  display: flex;
  justify-content: space-between; /* 保持卡片间隔 */
  width: 1080px; /* 根据卡片宽度和间距调整容器宽度 */
  margin: 0 auto; /* 居中显示 */
  margin-bottom: 25vh;
}
</style>
