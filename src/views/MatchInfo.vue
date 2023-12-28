<script setup lang="ts">
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { MatchInfoControllerService, Voting } from "@/generated";
import { VotingControllerService } from "../../generated";
import access_Enum from "@/access/accessEnum";

const router = useRouter();

const competitionId = router.currentRoute.value.query.competitionId;

const dataList = ref([]);

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
      voted: false, // 添加一个 voted 属性，默认为 false
    }));
  } else {
    message.error("获取数据失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});

const doVote1 = async (contestantId: any, index: number) => {
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
    (dataList.value as any[])[index].voted = true;
    message.success("投票成功");
  } else {
    message.error("投票失败" + res.message);
  }
};

const doVote2 = async (contestantId: any, index: number) => {
  const form = {
    competitionId: competitionId as any,
    contestantId: contestantId as any,
    userId: loginUser.value.userId as any,
  } as Voting;
  const res = await VotingControllerService.addVoteUsingPost({
    voting: form,
  });
  if (res.code === 0) {
    (dataList.value as any[])[index].voted = true;
    message.success("投票成功");
  } else {
    message.error("投票失败" + res.message);
  }
};
</script>

<template>
  <div id="matchManage">
    <h1>无际之旅的旋律</h1>
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
                  @click="doVote1(data.contestant1Id)"
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
                  @click="doVote2(data.contestant2Id)"
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
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cards-container {
  display: flex;
  justify-content: space-between; /* 保持卡片间隔 */
  width: 1080px; /* 根据卡片宽度和间距调整容器宽度 */
  margin: 0 auto; /* 居中显示 */
  margin-bottom: 30vh;
}
</style>
