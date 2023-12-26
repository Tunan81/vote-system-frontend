<template>
  <div class="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 400px; margin: 0 auto"
      auto-label-width
      label-align="left"
      :model="form"
      @submit="handleSubmit"
      size="large"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码长度大于6" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" long>登录</a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          type="text"
          long
          class="login-form-register-btn"
          style="background: #eeeeee"
          href="/user/register"
          >注册账号
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const router = useRouter();
const userStore = useUserStore();
const getUser = userStore.getLoginUser;

/**
 * 表单数据
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    console.log(3);
    await getUser();
    // 登录成功，跳转到首页
    await router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败" + res.message);
  }
};
</script>
<style scoped>
.login-form-register-btn {
  color: var(--color-text-3) !important;
}
</style>
