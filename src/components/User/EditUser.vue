<template>
  <Modal
    @on-cancel="closeEdit"
    title="修改用户"
    class="editUser"
    @on-ok="handleEdit"
    :value="value"
  >
    <Form ref="userfrm" :model="user" :rules="ruleInline">
      <FormItem label="用户名" :label-width="80" prop="username">
        <Input type="text" v-model="user.username" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="密码" :label-width="80" prop="password">
        <Input type="password" v-model="user.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="电话" :label-width="80" prop="phone">
        <Input type="text" v-model="user.phone" placeholder="phone">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="邮箱" :label-width="80" prop="mail">
        <Input type="text" v-model="user.mail" placeholder="mail">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="姓名" :label-width="80" prop="name">
        <Input type="text" v-model="user.name" placeholder="name">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
export default {
  name: "EditUser",
  props: ["value", "editUser"],
  data() {
    return {
      user: {
        username: "",
        password: "222222",
        mail: "",
        phone: "198228323232"
      },
      ruleInline: {
        username: [
          { required: true, message: "必填" },
          {
            min: 6,
            max: 12,
            message: "6-12",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "*必填",
            trigger: "blur"
          },
          {
            pattern: /\d{7}/gi,
            message: "输入正确的phone"
          }
        ]
      }
    };
  },
  watch: {
    editUser() {
      Object.assign(this.user, this.editUser);
    }
  },
  methods: {
    handleEdit() {
      console.log("修改：", this.user);
      this.$emit("edit");
      this.closeEdit();
    },
    closeEdit() {
      console.log("close");
      this.$emit("input", false);
    }
  }
};
</script>

<style scoped></style>
