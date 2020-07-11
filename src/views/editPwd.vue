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
        name="新密码"
        label="新密码"
        placeholder="新密码"
        class="mt-1"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <van-field
        v-model="repeatPassword"
        type="password"
        name="重复新密码"
        label="重复新密码"
        placeholder="重复新密码"
        class="mt-1"
        :rules="[{ required: true, validator: (value, rule)=>value === password, message: '请再次填写密码' }]"
      />

      <div class="flex justify-end">
        <button class="btn btn-link" @click="goto('/login')">去登录</button>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">确定</van-button>
      </div>
    </van-form>
    <flush></flush>
  </div>
</template>

<script>
import { Toast } from "vant";
import flush from "../components/common/flush.vue";

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
  components: {
    flush
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
        code: 40012,
        args: {
          phone: "100001",
          sms: "111111",
          newPassWord: "456789",
          type: "agent"
        }
      }).then(res => {
        if (res.args && res.args.result == 0) {
          Toast.success("修改成功！");
        } else {
          Toast.fail("修改失败！");
        }
      });
    }
  }
};
</script>

<style>
</style>
