<template>
  <div>
    <div class="btn-group">
      <Button class="btn" type="error" @click="handleDelete">删除</Button>
      <Button class="btn" type="primary" @click="handleAdd">添加</Button>
      <Button class="btn" type="error" @click="handleSetRole">设置角色</Button>
      <Input
        style="display: inline-table;width: 300px;margin: 0 5px;"
        v-model="params.q"
        search
        enter-button
        placeholder="搜索"
        @on-search="loadData"
      />
    </div>

    <Table
      :columns="columns"
      stripe
      border
      :data="data"
      @on-selection-change="changeSelect"
    >
      <template slot-scope="{ row }" slot="option">
        <Poptip
          confirm
          title="你确定要删除此数据吗?"
          @on-ok="deleteUser(row.id)"
        >
          <Button type="error" size="small" style="margin-right: 5px">
            删除
          </Button>
        </Poptip>
        <Button size="small" @click="editUserRow(row)" type="primary"
          >修改
        </Button>
      </template>
      <template slot-scope="{ row }" slot="url">
        <img class="imgt" :src="row.avatar" alt="" />
      </template>
    </Table>
    <Page
      @on-change="changePage"
      :total="total"
      :current="params._page"
      :page-size="params._limit"
    ></Page>
    <AddUser @add="loadData" v-model="showAddDialog"></AddUser>
    <EditUser
      :editUser="editUser"
      @edit="loadData"
      v-model="showEditDialog"
    ></EditUser>
    <SetRole
      :close="() => (this.showSetRoleDialog = false)"
      :visible="showSetRoleDialog"
      :user="setUserRole"
    >
    </SetRole>
  </div>
</template>

<script>
import service from "../service";
import AddUser from "../components/User/AddUser";
import EditUser from "../components/User/EditUser";
import SetRole from "../components/User/SetRole";

export default {
  data() {
    return {
      showSetRoleDialog: false,
      showAddDialog: false,
      showEditDialog: false,
      editUser: null,
      setUserRole: null,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          key: "id",
          title: "编号"
        },
        {
          key: "name",
          title: "名字"
        },
        {
          key: "mail",
          title: "邮箱"
        },
        {
          key: "url",
          title: "头像",
          slot: "url"
        },
        {
          key: "del",
          title: "编辑",
          slot: "option"
        }
      ],
      params: {
        _limit: 6,
        _page: 1,
        q: "",
        _sort: "id",
        _order: "desc"
      },
      total: 0,
      data: [
        {
          id: 1,
          name: "国庆睡着了"
        },
        {
          id: 2,
          name: "国庆醒了"
        }
      ],
      selectRows: []
    };
  },
  name: "home",
  created() {
    this.loadData();
  },
  methods: {
    handleSetRole() {
      // 拿到所有选中的row
      // console.log(this.selectRows);
      if (this.selectRows.length !== 1) {
        this.$Message.error({ content: "只能选中一" });
        return;
      }
      console.log("222");
      // 线上设置队徽狂
      this.setUserRole = this.selectRows[0];
      this.showSetRoleDialog = true;
    },
    editUserRow(row) {
      this.editUser = row;
      this.showEditDialog = true;
    },
    handleAdd() {
      this.showAddDialog = true;
    },
    changeSelect(selection) {
      // console.log(selection);
      this.selectRows = selection;
    },
    handleDelete() {
      if (this.selectRows.length <= 0) {
        this.$Message.error({ content: "请先选择数据！" });
        return;
      }
      this.$Modal.confirm({
        title: "您确认要删除吗？",
        okText: "确认",
        onOk: () => {
          this.submitDeleteUserArr(this.selectRows.map(item => item.id));
        }
      });
    },
    submitDeleteUserArr(arr) {
      service
        .deleteUser(arr)
        .then(() => {
          this.$Message.info({ content: "删除成功！" });
          this.selectRows = this.selectRows.filter(row => {
            return arr.findIndex(userId => row.id === userId) < 0;
          });
          this.loadData();
        })
        .catch(err => {
          console.log(err);
          this.$Message.error({ content: "删除失败！" });
        });
    },
    deleteUser(userId) {
      console.log(userId);
      this.submitDeleteUserArr([userId]);
    },
    changePage(page) {
      // this.$Message.info({ content: page });
      this.params._page = page;
      this.loadData();
    },
    loadData() {
      service.loadUser(this.params).then(res => {
        this.data = res.data;
        this.total = parseInt(res.headers["x-total-count"]);
        console.log(this.total);
      });
    }
  },
  components: {
    AddUser,
    EditUser,
    SetRole
  }
};
</script>

<style lang="scss">
.btn-group {
  height: 50px;
  padding: 8px;
}
.btn {
  margin: 0 5px;
}
.imgt {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
</style>
