<script setup lang="ts">
import { ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import {
  ContestantInfoControllerService,
  User,
  UserControllerService,
} from "@/generated";
import { Message } from "@arco-design/web-vue";

const dataList = ref([]);
const total = ref(0);
const router = useRouter();

const competitionId = router.currentRoute.value.query.competitionId;

/**
 * 查询参数
 */
const searchParams = ref({
  pageSize: 10,
  pageNumber: 1,
  contestantName: "",
  competitionId: competitionId,
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
    contestantName: "",
    competitionId: competitionId,
  };
};

/**
 * 加载数据
 */
const loadData = async () => {
  const res =
    await ContestantInfoControllerService.listContestantInfoPageUsingPost(
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
    title: "选手姓名",
    dataIndex: "contestantName",
  },
  {
    title: "歌曲名称",
    dataIndex: "songName",
  },
  {
    title: "得票数",
    dataIndex: "score",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const visible = ref(false);
const isAdding = ref(true); // 默认为新增操作
const value = ref();
const form = ref({
  contestantName: "",
  songName: "",
  competitionId: competitionId as any,
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
    const res =
      await ContestantInfoControllerService.addContestantInfoUsingPost(
        form.value
      );
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
    contestantName: "",
    songName: "",
    competitionId: competitionId as any,
  };
  visible.value = false;
};

const handleCancel = () => {
  // 清空表单
  form.value = {
    contestantName: "",
    songName: "",
    competitionId: competitionId as any,
  };
  visible.value = false;
};

const doDelete = async (record: any) => {
  const res =
    await ContestantInfoControllerService.deleteContestantInfoUsingPost({
      id: record.contestantId,
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
  <div id="contestantManage">
    <a-card title="选手管理">
      <template #extra>
        <a-input-search
          :style="{ width: '300px' }"
          placeholder="请输入选手名称"
          search-button
          v-model="searchParams.contestantName"
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
          >添加选手
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
    <template #title>{{ isAdding ? "添加" : "修改" }}选手信息</template>
    <a-form :model="form">
      <a-form-item label="选手姓名" field="contestantName">
        <a-input
          v-model="form.contestantName"
          placeholder="请输入选手名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="歌曲名称" field="songName">
        <a-input
          v-model="form.songName"
          placeholder="请输入选手选择的歌曲"
        ></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
#contestantManage {
  margin: 10px 10px 10px 10px;
}
</style>
