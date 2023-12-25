<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" alt="HiCoed" />
            <div class="title">在线投票系统</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="150px" style="margin-right: 20px">
      <div
        v-if="loginUser.userName != '未登录' && loginUser.userName != ''"
        style="min-width: 200px"
      >
        <a-dropdown :trigger="['click', 'hover', 'focus']">
          <div>
            <a-avatar
              :size="36"
              :style="{ marginRight: '8px', cursor: 'pointer' }"
            >
              <img alt="avatar" src="@/assets/fufu.jpg" />
              {{ loginUser?.userName ?? "未登录" }}
            </a-avatar>
            <a>{{ loginUser?.userName }}</a>
            <icon-caret-down />
          </div>
          <template #content>
            <a-doption>
              <a-space @click="$router.push({ name: '用户中心' })">
                <icon-user />
                <span> 用户中心 </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: '用户设置' })">
                <icon-settings />
                <span> 用户设置 </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span> 退出登录 </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </div>
      <div
        v-else
        style="cursor: pointer; display: flex"
        class="text-text-secondary"
      >
        <a @click="doLogin"> 登录</a>
        <span class="mx-3">或</span>
        <a @click="doRegister">注册</a>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import checkAccess from "@/access/checkAccess";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const router = useRouter();
const userStore = useUserStore();
const { loginUser } = storeToRefs(userStore);

// 过滤掉隐藏的菜单项
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    return checkAccess(loginUser.value, item?.meta?.access as string);
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

// 菜单点击事件
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 登录
const doLogin = () => {
  //console.log(store.state.user?.loginUser);
  if (loginUser.value.userName == "未登录") {
    router.push({
      path: "/user/login",
    });
  }
};

// 注册
const doRegister = () => {
  router.push({
    path: "/user/register",
  });
};

// 退出登录
const handleLogout = () => {
  //UserControllerService.userLogoutUsingPost();
  location.reload();
};
</script>

<style scoped lang="less">
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
  border-radius: 25px;
}

.text-text-secondary {
  color: #c1c1c1;
  font-size: 15px;
}

.text-text-secondary a:hover {
  color: black;
}

.mx-3 {
  margin-left: 0.75rem;
  margin-right: 0.75rem;
}
</style>
