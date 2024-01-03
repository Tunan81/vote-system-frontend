<script setup lang="ts">
import { ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { User, UserControllerService } from "@/generated";
import { Message } from "@arco-design/web-vue";

const dataList = ref([]);
const total = ref(0);

/**
 * 查询参数
 */
const searchParams = ref({
  pageSize: 10,
  pageNumber: 1,
  userAccount: "",
});

const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    pageNumber: 1,
  };
};

const doReset = () => {
  searchParams.value = {
    pageSize: 10,
    pageNumber: 1,
    userAccount: "",
  };
};

/**
 * 加载数据
 */
const loadData = async () => {
  const res = await UserControllerService.listUserByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = parseInt(res.data.totalRow);
  } else {
    message.error("获取数据失败" + res.message);
  }
};

/**
 * 监听查询参数变化
 */
watchEffect(() => {
  loadData();
});

const columns = [
  {
    title: "用户账号",
    dataIndex: "userAccount",
  },
  {
    title: "用户昵称",
    dataIndex: "userName",
  },
  {
    title: "用户简介",
    dataIndex: "userProfile",
  },
  {
    title: "用户角色",
    dataIndex: "userRole",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const router = useRouter();

const visible = ref(false);
const isAdding = ref(true); // 默认为新增操作
const value = ref();
const roleList = [
  {
    label: "管理员",
    value: "admin",
  },
  {
    label: "普通用户",
    value: "user",
  },
];
const form = ref({
  userName: "",
  userAccount: "",
  userRole: "",
});

const doAdd = () => {
  isAdding.value = true; // 将操作类型设置为新增
  visible.value = true; // 显示弹框
};

const doUpdate = (record: any) => {
  form.value = { ...record };
  isAdding.value = false;
  visible.value = true;
};

const handleOk = async () => {
  if (isAdding.value) {
    const res = await UserControllerService.addUserUsingPost(form.value);
    if (res.code === 0) {
      Message.success("添加成功");
      loadData();
    } else {
      Message.error("添加失败" + res.message);
    }
  } else {
    console.log(1);
  }

  // 清空表单
  form.value = {
    userName: "",
    userAccount: "",
    userRole: "",
  };
  visible.value = false;
};

const handleCancel = () => {
  // 清空表单
  form.value = {
    userName: "",
    userAccount: "",
    userRole: "",
  };
  visible.value = false;
};

const doDelete = async (user: User) => {
  const res = await UserControllerService.deleteUserUsingPost({
    id: user.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败" + res.message);
  }
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageNumber: page,
  };
};
</script>

<template>
  <div id="userMangeView">
    <a-card title="用户管理">
      <template #extra>
        <a-input-search
          :style="{ width: '300px' }"
          placeholder="请输入用户账号"
          search-button
          v-model="searchParams.userAccount"
          @search="doSubmit"
        >
          <template #button-icon>
            <icon-search />
          </template>
          <template #button-default>搜索</template>
        </a-input-search>
        <a-button type="primary" @click="doReset" style="margin-left: 10px"
          >重置
        </a-button>
        <a-button
          type="dashed"
          status="success"
          @click="doAdd"
          style="margin-left: 10px"
          >新增
        </a-button>
      </template>
      <a-table
        :columns="columns"
        :data="dataList"
        :pagination="{
          showTotal: true,
          pageSize: searchParams.pageSize,
          current: searchParams.pageNumber,
          total,
        }"
        @page-change="onPageChange"
      >
        <template #optional="{ record }">
          <a-space>
            <a-button type="primary" @click="doUpdate(record)">修改</a-button>
            <a-popconfirm
              content="确认删除吗?"
              type="error"
              @ok="doDelete(record)"
            >
              <a-button status="danger">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>{{ isAdding ? "添加" : "修改" }}用户</template>
    <a-form :model="form">
      <a-form-item label="用户昵称" field="userName">
        <a-input v-model="form.userName" placeholder="请输入用户名"></a-input>
      </a-form-item>
      <a-form-item label="用户账号" field="userAccount">
        <a-input
          v-model="form.userAccount"
          placeholder="请输入用户账号"
          class="input-demo"
        />
      </a-form-item>
      <a-form-item label="角色" field="userRole">
        <a-select v-model="form.userRole" placeholder="请选择角色">
          <a-option
            v-for="item of roleList"
            :value="item.value"
            :label="item.label"
            :key="item.value"
          />
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
#userMangeView {
  margin: 10px 10px 10px 10px;
}
</style>
