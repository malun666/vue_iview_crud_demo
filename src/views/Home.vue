<template>
  <div>
    <div class="btn-group">
      <Button class="btn" type="primary" @click="handleDelete">删除</Button>
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
          @on-ok="
            () => {
              deletUser(row.id);
            }
          "
        >
          <Button type="primary" size="small" style="margin-right: 5px">
            删除
          </Button>
        </Poptip>
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
  </div>
</template>

<script>
import service from "../service";

export default {
  data() {
    return {
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
        q: ""
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
    changeSelect(selection) {
      // console.log(selection);
      this.selectRows = selection;
    },
    handleDelete() {
      this.$Modal.confirm({
        title: "您确认要删除吗？",
        okText: "确认",
        onOk: () => {
          console.log(this.selectRows);
        }
      });
    },
    deletUser(userId) {
      console.log(userId);
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
  components: {}
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
