<template>
  <div id="home">
    <div style="margin-top: 150px">
      <div class="typewriter">
        <h1 class="typing">
          Enjoy the music and support your favorite players
        </h1>
        <ul>
          <li v-if="data == ''">暂无进行中的比赛</li>
          <li
            v-for="(item, index) in data"
            :key="index"
            @click="toMatchInfo(item.competitionId)"
          >
            <a-button type="text"> {{ item.competitionName }}</a-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { CompetitionControllerService, CompetitionDTO } from "@/generated";

const router = useRouter();

const data = ref([]);

const loadData = async () => {
  const res = await CompetitionControllerService.listUsingPost();
  if (res.code === 0) {
    data.value = res.data;
  }
};

onMounted(() => {
  loadData();
});

const toMatchInfo = (id: number) => {
  router.push({
    path: "/matchInfo",
    query: {
      competitionId: id,
    },
  });
};
</script>
<style scoped>
#home {
  background: linear-gradient(#c4eac4, transparent),
    linear-gradient(90deg, #a1cade, transparent),
    linear-gradient(-90deg, #d7afa1, transparent);
  background-blend-mode: screen;
  width: 97.5%;
  height: 79%;
  position: fixed;
}

ul {
  list-style-type: none;
  min-width: 300px;
}

li {
  min-width: 100px;
  font-size: 16px;
  margin-top: 30px;
  margin-bottom: 20px;
  color: #189bdf;
  text-align: center;
}
</style>
<style>
/* 打字机动画 */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 60%;
  }
}

/* 光标动画 */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #0a65cc;
  }
}

/* 按钮动画 */
@keyframes slidein {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100% {
    opacity: 1;
    pointer-events: auto; /*当按钮出现时才可以点击*/
    transform: translateY(0%);
  }
}

.typewriter {
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.typewriter .typing {
  color: var(--color-text-1);
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  overflow: hidden; /* 保证文字在动画之前隐藏 */
  border-right: 0.15em solid #0a65cc; /* 使用边框实现光标 */
  white-space: nowrap;
  margin-bottom: 32px;
  letter-spacing: 0.15em;
  animation: typing 4s steps(32, end), blink-caret 0.5s step-end infinite;
}

.typewriter .button {
  opacity: 0;
  pointer-events: none; /*当按钮未出现时不可以点击*/
  color: #0a65cc;
  animation: slidein 1s ease-in 4s forwards;
}
</style>
