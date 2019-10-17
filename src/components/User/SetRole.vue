<template>
  <Modal
    @on-cancel="closeSetRole"
    title="设置角色"
    :value="visible"
    class="setrole"
    @on-ok="handleSetRole"
  >
    给当前： {{ user ? user.name : null }}设置角色
    <hr />
    <Row>
      <Col v-for="item in allRole" :key="item.id" span="8">
        <label>
          {{ item.name }}
          <input
            :checked="getCheckedStatus(item.id)"
            :value="item.id"
            type="checkbox"
          />
        </label>
      </Col>
    </Row>
  </Modal>
</template>

<script>
import service from "../../service";
export default {
  name: "SetRole",
  props: ["visible", "close", "user"],
  data() {
    return {
      allRole: [],
      userRole: []
    };
  },
  created() {
    // 加载所有的角色信息
    service.loadAllRole().then(res => (this.allRole = res.data));
  },
  methods: {
    getCheckedStatus(roleId) {
      return this.userRole.findIndex(ur => ur.roleId === roleId) >= 0;
    },
    closeSetRole() {
      this.close();
    },
    handleSetRole() {
      this.close();
    }
  },
  watch: {
    user() {
      // this.$Message.info({ content: "s" });
      // 重新加载  选中框的数据
      // 加所有的当前用户已经关联的角色信息
      if (!this.user) {
        return;
      }

      // this.user.id  // 给用户设置角色的id
      service.loadUserRole(this.user.id).then(res => {
        this.userRole = res.data;
        console.log(this.userRole);
      });
    }
  }
};
</script>

<style scoped></style>
