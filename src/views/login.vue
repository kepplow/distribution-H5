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
        <button class="btn btn-link">忘记密码</button>
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
export default {
  data() {
    return {
      msg: "",
      show: false,
      phone: "18379460084",
      password: "123456",
      Vcode: "",
      TCode: "123456",
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
          code: 1200,
          args: {
            phone: this.phone,
            password: this.password,
            type: "agent"
          }
        }).then(res => {
          console.log("登录信息:", res);
          if (res.args.uid) {
            this.msg = "登录成功！";
            this.show = true;
            localStorage.setItem("Uid", JSON.stringify(res.args.uid));
            localStorage.setItem("loginInfo", JSON.stringify(res.args));
            localStorage.setItem("userPhone", this.phone);
            localStorage.setItem("userPWD", this.password);
            setTimeout(() => {
              this.$router.push("/home");
            }, 500);
          }
        });
      } else {
        this.msg = "验证码错误！";
        this.show = true;
        return;
      }
    }
  },
  mounted() {
    let verifyCode;
    this.$nextTick(() => {
      this.verifyCode = new GVerify({
        id: "picyzm",
        type: "blend",
        code: this.TCode
      });
    });
  }
};
</script>

<style lang="less" scoped>
.login {
  padding: 20px;
}
</style>
