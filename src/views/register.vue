<template>
  <div class="register p-2">
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />

      <div class="flex">
        <van-field
          v-model="Vcode"
          type="text"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          class="mt-1"
          :rules="[{ required: true, message: '请填写验证码' }]"
        />
        <button class="btn btn-info mx-1 mt-1 vertical-middle" @click="getCode">发送</button>
      </div>

      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        class="mt-1"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <van-field
        v-model="repeatPassword"
        type="password"
        name="重复密码"
        label="重复密码"
        placeholder="重复密码"
        class="mt-1"
        :rules="[{ required: true, message: '请再次填写密码' }]"
      />

      <div class="flex justify-end">
        <button class="btn btn-link" @click="goto('/login')">去登录</button>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <van-popup v-model="show">
      <div class="py-1 px-2 around">{{msg}}</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      show: false,
      phone: "",
      Vcode: "",
      password: "",
      repeatPassword: ""
    };
  },
  methods: {
    getCode() {
      this.WS.sendMsg({ code: 1354, args: { phone: this.phone } }).then(res => {
        console.log(11111, res);
      });
    },
    goto(path) {
      this.$router.push(path);
    },
    onSubmit() {
      console.log("登录");
    }
  }
};
</script>

<style>
</style>
