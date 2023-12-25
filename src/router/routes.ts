import { RouteRecordRaw } from "vue-router";
import UserLayout from "../layouts/UserLayout.vue";
import BasicLayout from "../layouts/BasicLayout.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    //component: () => import("@/layouts/UserLayout.vue"),
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: () => import("@/views/user/UserLoginView.vue"),
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: () => import("@/views/user/UserRegisterView.vue"),
      },
    ],
    meta: {
      hideInMenu: true,
      layout: UserLayout,
    },
  },
  {
    path: "/",
    name: "主页",
    component: () => import("@/views/FrontHome.vue"),
    meta: {
      layout: BasicLayout,
    },
  },
  // {
  //   path: "/404",
  //   name: "404",
  //   component: () => import("@/views/notFound/NotFoundView.vue"),
  //   meta: {
  //     hideInMenu: true,
  //     layout: BasicLayout,
  //   },
  // },
  // {
  //   path: "/:pathMatch(.*)", // 匹配所有路由
  //   redirect: "/404",
  // },
];
