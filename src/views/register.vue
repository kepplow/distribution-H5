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
        :rules="[{ required: true, validator: (value, rule)=>value === password, message: '请再次填写密码' }]"
      />

      <div class="flex justify-end">
        <button class="btn btn-link" @click="goto('/login')">去登录</button>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
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
        if (res.args && res.args.result == 0) {
          Toast.success("发送成功！");
        } else {
          Toast.fail("发送失败，请稍后重试！");
        }
      });
    },
    goto(path) {
      this.$router.push(path);
    },
    onSubmit() {
      this.WS.sendMsg({
        code: 40017,
        args: {
          phone: this.phone,
          sms: this.Vcode,
          pwd: this.password,
          type: "agent"
        }
      }).then(res => {
        if (res.args && res.args.result == 0) {
          Toast.success("注册成功！");
        } else {
          try {
            if (res.args.result == 46) {
              throw new Error("手机号不合法");
            }
            if (res.args.result == 48) {
              throw new Error("验证码错误");
            }
            if (res.args.result == 55) {
              throw new Error("该手机未绑定");
            }
            if (res.args.result == 205) {
              throw new Error("代理等级不足");
            }
            Toast.fail("注册失败！");
          } catch (e) {
            Toast.fail(e.message);
          }
        }
      });
    }
  }
};
</script>

<style>
</style>
