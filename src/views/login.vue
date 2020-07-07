<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        class="mt-1"
        :rules="[{ required: true, message: '请填写密码' }]"
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
        <div id="picyzm" class="mt-1 ml-1" @click.stop="refeshCode"></div>
      </div>

      <div class="flex justify-end">
        <button class="btn btn-link" @click="goto('/register')">注册</button>
        <div class="btn btn-link" @click="goto('/editPwd')">忘记密码</div>
      </div>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <van-popup v-model="show">
      <div class="py-1 px-2 around">{{msg}}</div>
    </van-popup>
  </div>
</template>

<script>
import "../../public/gVerify/gVerify";
import { Toast } from "vant";

export default {
  data() {
    return {
      msg: "",
      show: false,
      phone: "",
      password: "",
      Vcode: "",
      verifyCode: null
    };
  },
  methods: {
    goto(path) {
      this.$router.push({ path });
    },
    refeshCode(e) {
      this.verifyCode.options.code = "1234";
      this.verifyCode.refresh();
      return false;
    },
    onSubmit() {
      let res = this.verifyCode.validate(this.Vcode);

      if (res) {
        this.WS.sendMsg({
          code: 40018,
          args: {
            phone: this.customTrim(this.phone.toString()),
            password: this.password,
            type: "agent"
          }
        }).then(res => {
          console.log("登录信息:", res);
          if (res.args.uid) {
            // this.msg = "";
            // this.show = true;
            Toast("登录成功！");
            localStorage.setItem("Uid", JSON.stringify(res.args.uid));
            localStorage.setItem("loginInfo", JSON.stringify(res.args));
            localStorage.setItem("userPhone", this.phone);
            localStorage.setItem("userPWD", this.password);

            //保存一下账号
            localStorage.setItem("phone", this.phone);
            setTimeout(() => {
              this.$router.push("/home");
            }, 500);
          } else {
            if (res.args.result == 401) {
              Toast("账户不存在！");
              return;
            }
            if (res.args.result == 402) {
              Toast("密码错误！");
              return;
            }
            // this.msg = "";
            Toast("登录失败！");
            // this.show = true;
          }
        });
      } else {
        // this.msg = "";
        // this.show = true;
        Toast("验证码错误！");
        return;
      }
    },
    customTrim(strSource) {
      return strSource.replace(/\s+/g, "");
    }
  },
  mounted() {
    let verifyCode;
    this.$nextTick(() => {
      this.verifyCode = new GVerify({
        id: "picyzm",
        type: "number"
      });
    });
    try {
      let phone = localStorage.getItem("phone");
      this.phone = phone;
    } catch ($e) {}
  }
};
</script>

<style lang="less" scoped>
.login {
  padding: 20px;
}
</style>
