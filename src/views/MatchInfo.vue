<script setup lang="ts">
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";
import { ref } from "vue";

const router = useRouter();

const competitionId = router.currentRoute.value.query.competitionId;

const dataList = ref();

const loadData = async () => {
  // const res = await CompetitionControllerService.pageUsingPost({
  //   pageSize: 10,
  //   pageNumber: 1,
  //   competitionId: competitionId,
  // });
  // if (res.code === 0) {
  //   dataList.value = res.data.records;
  // } else {
  //   message.error("获取数据失败" + res.message);
  // }
};
</script>

<template>
  <div id="matchManage">
    <h1>无际之旅的旋律</h1>
    <div class="matchInfo">
      <div class="cards-container">
        <a-card :style="{ width: '360px' }">
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
          <a-card-meta title="演唱歌曲：南">
            <template #avatar>
              <div
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#1D2129',
                }"
              >
                <a-avatar :size="40" :style="{ marginRight: '8px' }">
                  芙芙
                </a-avatar>
                <a-typography-text>芙芙</a-typography-text>
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
          <a-card-meta title="演唱歌曲：成都">
            <template #avatar>
              <div
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#1D2129',
                }"
              >
                <a-avatar :size="40" :style="{ marginRight: '8px' }">
                  心海
                </a-avatar>
                <a-typography-text>心海</a-typography-text>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </div>
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cards-container {
  display: flex;
  justify-content: space-between; /* 保持卡片间隔 */
  width: 1080px; /* 根据卡片宽度和间距调整容器宽度 */
  margin: 0 auto; /* 居中显示 */
}
</style>
