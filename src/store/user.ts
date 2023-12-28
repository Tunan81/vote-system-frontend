import { defineStore } from "pinia";
import AccessEnum from "@/access/accessEnum";
import { UserControllerService } from "@/generated";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const loginUser = ref({
    userName: "未登录",
  }) as any;

  const getLoginUser = async () => {
    // 从后端获取登录用户信息
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code === 0) {
      loginUser.value = res.data;
    } else {
      loginUser.value = {
        ...loginUser.value,
        userRole: AccessEnum.NOT_LOGIN,
      };
    }
  };

  return {
    loginUser,
    getLoginUser,
  };
});
