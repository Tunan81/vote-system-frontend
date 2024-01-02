<script setup lang="ts">
import { ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { MatchInfoControllerService } from "@/generated";

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
  };
};

/**
 * 加载数据
 */
const loadData = async () => {
  const res = await MatchInfoControllerService.listMatchInfoPageUsingPost({
    competitionId: competitionId as any,
  });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.totalRow;
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
    title: "选手1姓名",
    dataIndex: "contestantName1",
  },
  {
    title: "歌曲1名称",
    dataIndex: "contestant1Song",
  },
  {
    title: "选手1成绩",
    dataIndex: "score",
  },
  {
    title: "选手2姓名",
    dataIndex: "contestantName2",
  },
  {
    title: "歌曲2名称",
    dataIndex: "contestant2Song",
  },
  {
    title: "选手2成绩",
    dataIndex: "score2",
  },
  {
    title: "开启对战",
    slotName: "optional",
  },
];

const doDelete = async (record: any) => {
  // const res =
  //   await ContestantInfoControllerService.deleteContestantInfoUsingPost({
  //     id: record.contestantId,
  //   });
  // if (res.code === 0) {
  //   message.success("删除成功");
  //   loadData();
  // } else {
  //   message.error("删除失败" + res.message);
  // }
};

const doChange = async (record: any) => {
  console.log(record);
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageNumber: page,
  };
};
</script>

<template>
  <div id="MatchManage">
    <a-card title="对战管理">
      <!--      <template #extra>-->
      <!--        <a-input-search-->
      <!--          :style="{ width: '300px' }"-->
      <!--          placeholder="请输入选手名称"-->
      <!--          search-button-->
      <!--          v-model="searchParams"-->
      <!--          @search="doSubmit"-->
      <!--        >-->
      <!--          <template #button-icon>-->
      <!--            <icon-search />-->
      <!--          </template>-->
      <!--          <template #button-default>搜索</template>-->
      <!--        </a-input-search>-->
      <!--        <a-button type="primary" @click="doReset" style="margin-left: 10px"-->
      <!--          >重置-->
      <!--        </a-button>-->
      <!--      </template>-->
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
            <a-switch
              v-model="record.isMatchOpen"
              @click="doChange(record)"
            ></a-switch>
            <!--            <a-popconfirm-->
            <!--              content="确认删除吗?"-->
            <!--              type="error"-->
            <!--              @ok="doDelete(record)"-->
            <!--            >-->
            <!--              <a-button status="danger">删除</a-button>-->
            <!--            </a-popconfirm>-->
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<style scoped>
#MatchManage {
  margin: 10px 10px 10px 10px;
}
</style>
