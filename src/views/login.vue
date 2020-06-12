<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "18112312313",
      password: "123456"
    };
  },
  methods: {
    onSubmit() {
      this.WS.sendMsg({
        code: 1200,
        args: {
          phone: this.phone,
          password: this.password
        }
      }).then(res => {
        console.log(111, res);
        if (true) {
          this.$router.push("/");
        }
      });
    }
  },
  beforeMount() {}
};
</script>

<style lang="less" scoped>
.login {
  padding: 20px;
}
</style>