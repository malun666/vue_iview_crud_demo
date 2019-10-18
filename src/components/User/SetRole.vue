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
    <CheckboxGroup v-model="checkedRoleArr">
      <Row>
        <Col v-for="item in allRole" :key="item.id" span="8">
          <Checkbox :label="item.id">
            {{ item.name }}
          </Checkbox>
        </Col>
      </Row>
    </CheckboxGroup>
  </Modal>
</template>

<script>
import service from "../../service";
export default {
  name: "SetRole",
  props: ["visible", "close", "user"],
  data() {
    return {
      allRole: [], // 所有角色
      userRole: [], // 要设用户 的 角色（中间表）
      checkedRoleArr: [1, 4]
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
      let promiseArr = [];
      // 第一种： 添加
      // 最终所有选中的roleId 到  userRole查一下，存在：不是添加已有的。
      // 如果不存在， 新增加的。
      this.checkedRoleArr.forEach(roleId => {
        if (this.userRole.findIndex(ur => ur.roleId === roleId) < 0) {
          // 新增加
          let p1 = service.addUserRole({
            del: 0,
            subon: new Date().toString(),
            roleId,
            userId: this.user.id
          });
          promiseArr.push(p1);
        }
      });
      // 第二种： 删除
      this.userRole.forEach(ur => {
        // ur.roleId
        // this.checkedRoleArr.findIndex(r => r === ur.roleId)
        if (!this.checkedRoleArr.includes(ur.roleId)) {
          let p2 = service.deleteUserRole(ur.id);
          promiseArr.push(p2);
        }
      });
      Promise.all(promiseArr)
        .then(() => {
          this.$Message.info({ content: "设置成功！" });
          this.close();
        })
        .catch(err => {
          console.log(err);
          this.$Message.info({ content: "设置失败！" });
        });
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
        this.checkedRoleArr = res.data.map(item => item.roleId);
        console.log(this.userRole);
      });
    }
  }
};
</script>

<style scoped></style>
