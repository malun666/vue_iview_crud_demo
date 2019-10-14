<template>
  <div class="adduser">
    <Modal
      :value="value"
      title="Common Modal dialog box title"
      @on-ok="addUser"
      @on-cancel="closeAddUser"
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
  </div>
</template>

<script>
import service from "../../service";
export default {
  name: "AddUser",
  props: ["value"],
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
  methods: {
    addUser() {
      console.log(this.user);
      this.$refs["userfrm"].validate(v => {
        if (v) {
          service
            .addUser(this.user)
            .then(() => {
              this.$emit("add");
              this.closeAddUser();
            })
            .catch(err => {
              console.log("errr:", err);
              this.$Message.error({ content: "添加失败" });
            });
        }
        this.$Message.info({ content: "校验成功后再提交" });
        return;
      });
    },
    closeAddUser() {
      console.log(22);
      this.$emit("input", false);
    }
  }
};
</script>

<style lang="scss" scoped></style>
