<template>
  <div class="index">
    <div class="flex align-center m-1">
      <img
        class="around border"
        src="../assets/images/logo.png"
        width="100"
        height="100"
        alt="avatar"
      />
      <div class="flex justify-around flex-column ml-2" style="height: 100px;">
        <div class="font-weight-bold">
          昵称：
          <span>你高兴就好</span>
        </div>
        <div class="font-weight-bold">
          我的ID：
          <span>1256639</span>
        </div>
      </div>
    </div>
    <div class="w-100 bg-warning relative p-2 overflow-hidden">
      <div
        class="flex relative w-auto inline-flex text-dark-second-1"
        :style="`left: ${scrollBarLeft}px`"
        ref="scrollBar"
      >
        <span class="text-danger">喇叭icon</span>
        <div>小贤在线发奖！！！！！！</div>
      </div>
    </div>

    <div>
      <div class="flex justify-between align-center border-bottom px-1 py-2" @click="show">
        <div class="flex justify-around align-center">
          <span class="icon around mr-1">icon</span>
          <span class="mr-1">可结算</span>
          <span class="bg-danger font-sm px-1 py-05 around">￥0</span>
        </div>
        <div class="text-gray">点击进行结算 &gt;</div>
      </div>
      <div class="flex justify-between align-center border-bottom px-1 py-2" @click="jump">
        <div class="flex justify-around align-center">
          <span class="icon around mr-1">icon</span>
          <span class="mr-1">今日充值</span>
          <span class="bg-danger font-sm px-1 py-05 around">￥0</span>
        </div>
        <div class="text-gray">&gt;</div>
      </div>
      <div class="flex justify-between align-center border-bottom px-1 py-2" @click="rechargeRe">
        <div class="flex justify-around align-center">
          <span class="icon around mr-1">icon</span>
          <span class="mr-1">余额充值</span>
          <!-- <span class="bg-danger font-sm px-1 py-05 around">￥0</span> -->
        </div>
        <div class="text-gray">&gt;</div>
      </div>
    </div>

    <!-- bottomBar -->
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import bottomBar from "../components/common/bottomBar.vue";
import { Dialog } from "vant";

export default {
  name: "index",
  data() {
    return {
      scrollBarLeft: 0,
      timer: null
    };
  },
  components: {
    bottomBar
  },
  methods: {
    /**
     * 解密
     */
    dec(hex) {
      let str = this.hexToString(hex);
      let c = String.fromCharCode(str.charCodeAt(0) - str.length);
      for (let i = 1; i < str.length; i++) {
        c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1));
      }
      return c;
    },
    /**
     * 十六进制转化为字符串
     * @param str
     * @returns {string}
     */
    hexToString(str) {
      let val = "";
      let arr = str.split(",");
      for (let i = 0; i < arr.length; i++) {
        val += String.fromCharCode(parseInt(arr[i], 16));
      }
      return val;
    },
    async init() {
      this.WS.sendMsg({
        code: 40000,
        args: {
          day: 1
        }
      }).then(res => {
        console.log(1111111111, this.dec(res));
      });
    },
    msg() {
      return () => {};
    },
    jump() {
      this.$router.push({ name: "todayRefall" });
    },
    rechargeRe() {
      this.$router.push({ name: "recharge" });
    },
    show() {
      Dialog.confirm({
        title: "操作确认",
        message: "确认结算当前余额"
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  mounted() {
    this.init();
    let scrollBarWidth = this.$refs["scrollBar"].clientWidth;
    let fooBarWidth = this.$refs["scrollBar"].parentNode.clientWidth;
    this.timer = setInterval(() => {
      if (this.scrollBarLeft + scrollBarWidth <= 0) {
        this.scrollBarLeft = fooBarWidth;
      }
      this.scrollBarLeft = this.scrollBarLeft - 1;
    }, 18);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less" scoped>
.index {
  .inline-flex {
    display: inline-flex;
  }
}
</style>
