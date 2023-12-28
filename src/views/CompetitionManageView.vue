<script setup lang="ts">
import { ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { CompetitionControllerService, CompetitionReq } from "@/generated";
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
  const res = await CompetitionControllerService.pageUsingPost(
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
    title: "比赛名称",
    dataIndex: "competitionName",
  },
  {
    title: "比赛阶段",
    dataIndex: "competitionStage",
  },
  {
    title: "比赛简介",
    dataIndex: "competitionInfo",
  },
  {
    title: "比赛开始时间",
    dataIndex: "startTime",
  },
  {
    title: "比赛结束时间",
    dataIndex: "endTime",
  },
  {
    title: "是否开始投票",
    dataIndex: "isVotingOpen",
  },
  {
    title: "是否开始比赛对战",
    slotName: "isMatchOpen",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const router = useRouter();

const visible = ref(false);
const uploadVisible = ref(false);
const isAdding = ref(true); // 默认为新增操作
const form = ref({
  competitionInfo: "",
  competitionName: "",
  competitionStage: "",
  startTime: "",
  endTime: "",
  isVotingOpen: false,
  isMatchOpen: false,
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
    const res = await CompetitionControllerService.addCompetitionUsingPost(
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
    competitionInfo: "",
    competitionName: "",
    competitionStage: "",
    startTime: "",
    endTime: "",
    isVotingOpen: false,
    isMatchOpen: false,
  };
  visible.value = false;
};

const onTimeSelect = (dateString: any, date: any) => {
  form.value = {
    ...form.value,
    startTime: dateString[0],
    endTime: dateString[1],
  };
};

const onTimeChange = (dateString: any, date: any) => {
  form.value = {
    ...form.value,
    startTime: dateString[0],
    endTime: dateString[1],
  };
};

const handleCancel = () => {
  // 清空表单
  form.value = {
    competitionInfo: "",
    competitionName: "",
    competitionStage: "",
    startTime: "",
    endTime: "",
    isVotingOpen: false,
    isMatchOpen: false,
  };
  visible.value = false;
};

const doDelete = async (record: any) => {
  const res = await CompetitionControllerService.deleteCompetitionUsingPost({
    id: record.competitionId,
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

const doSelectContestant = (competition: any) => {
  console.log(competition);
  router.push({
    path: "/contestantManage",
    query: {
      competitionId: competition.competitionId,
    },
  });
};

// region 文件上传
const competitionId = ref() as any;
const doUpload = (record: any) => {
  uploadVisible.value = true;
  competitionId.value = record.competitionId;
};
const customRequest = (option: {
  onProgress: any;
  onError: any;
  onSuccess: any;
  fileItem: any;
  name: any;
}) => {
  const { onProgress, onError, onSuccess, fileItem, name } = option;
  const xhr = new XMLHttpRequest();
  if (xhr.upload) {
    xhr.upload.onprogress = function (event) {
      let percent;
      if (event.total > 0) {
        // 0 ~ 1
        percent = event.loaded / event.total;
      }
      onProgress(percent, event);
    };
  }
  xhr.onerror = function error(e) {
    onError(e);
  };
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError(xhr.responseText);
    }
    onSuccess(xhr.response);
  };
  const formData = new FormData();
  formData.append(name || "file", fileItem.file);
  formData.append("competitionId", competitionId.value);
  xhr.open("post", "http://localhost:8101/api/competition/upload", true);
  xhr.send(formData);
};
// endregion

const doChangeMatch = (record: any) => {
  const req: CompetitionReq = {
    ...record,
  };
  console.log(req);
  CompetitionControllerService.updateCompetitionUsingPost(req).then((res) => {
    if (res.code === 0) {
      message.success("更新成功");
      loadData();
    } else {
      message.error("更新失败" + res.message);
    }
  });
};

const doSelectMatch = (record: any) => {
  router.push({
    path: "/matchInfo",
    query: {
      competitionId: record.competitionId,
    },
  });
};
</script>

<template>
  <div id="competitionManage">
    <a-card title="比赛管理">
      <template #extra>
        <a-input-search
          :style="{ width: '300px' }"
          placeholder="请输入比赛名称"
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
          >新增比赛
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
        <template #isMatchOpen="{ record }">
          <a-switch
            v-model="record.isMatchOpen"
            @click="doChangeMatch(record)"
          />
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button type="dashed" status="success" @click="doUpload(record)"
              >导入选手信息
            </a-button>
            <a-button
              type="dashed"
              status="success"
              @click="doSelectContestant(record)"
              >查看选手列表
            </a-button>
            <a-button type="primary" @click="doUpdate(record)"
              >修改比赛信息
            </a-button>
            <a-button type="primary" @click="doSelectMatch(record)"
              >查看对战信息
            </a-button>
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
    <template #title>{{ isAdding ? "新增" : "修改" }}比赛</template>
    <a-form :model="form">
      <a-form-item label="比赛名称" field="competitionName">
        <a-input
          v-model="form.competitionName"
          placeholder="请输入比赛名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="比赛阶段" field="competitionStage">
        <a-input
          v-model="form.competitionStage"
          placeholder="请输入比赛阶段"
          class="input-demo"
        />
      </a-form-item>
      <a-form-item label="比赛简介" field="competitionInfo">
        <a-textarea
          v-model="form.competitionInfo"
          placeholder="请输入比赛简介"
          :max-length="{ length: 256, errorOnly: true }"
          allow-clear
          show-word-limit
        />
      </a-form-item>
      <a-form-item label="起止时间" field="startTime">
        <a-range-picker @change="onTimeChange" @select="onTimeSelect" />
      </a-form-item>
    </a-form>
  </a-modal>
  <a-modal v-model:visible="uploadVisible">
    <template #title>导入选手信息</template>
    <a-upload ref="upload" draggable :custom-request="customRequest" />
  </a-modal>
</template>

<style scoped>
#competitionManage {
  margin: 10px 10px 10px 10px;
}
</style>
