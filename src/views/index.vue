<template>
  <div class="index">
    <div>
      <div class="flex justify-between align-center border-bottom px-1 py-2" @click="show">
        <div class="flex justify-around align-center">
          <span class="iconfont icon-RectangleCopy around font-xl"></span>
          <span class="mr-1">可结算</span>
          <span class="bg-danger font-sm px-1 py-05 around">￥{{ bean }}</span>
        </div>
        <div class="text-gray">
          点击进行结算
          <span class="iconfont icon-jiantou"></span>
        </div>
      </div>
      <div class="flex justify-between align-center border-bottom px-1 py-2" @click="jump">
        <div class="flex justify-around align-center">
          <span class="iconfont icon-chongzhi around font-xl"></span>
          <span class="mr-1">今日充值</span>
          <span class="bg-danger font-sm px-1 py-05 around">￥{{ allMoney }}</span>
        </div>
        <div class="text-gray">
          <span class="iconfont icon-jiantou"></span>
        </div>
      </div>
      <div class="flex justify-between align-center border-bottom px-1 py-2" @click="rechargeRe">
        <div class="flex justify-around align-center">
          <span class="iconfont icon-yue around font-lg mx-05"></span>
          <span class="mr-1">余额充值</span>
          <!-- <span class="bg-danger font-sm px-1 py-05 around">￥0</span> -->
        </div>
        <div class="text-gray">
          <span class="iconfont icon-jiantou"></span>
        </div>
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
      timer: null,
      allMoney: 0,
      bean: 0,
      result: 0,
      myID: 0,
      nickname: "",
      notice: "",
      headPic: ""
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
      let that = this;
      Dialog.confirm({
        title: "操作确认",
        message: "确认结算当前余额"
      })
        .then(() => {
          that.WS.sendMsg({
            type: 1,
            num: that.bean
          }).then(res => {});
        })
        .catch(() => {
          // on cancel
        });
    },
    //初始化页面
    async init() {
      let that = this;
      this.WS.sendMsg({
        code: 40004,
        args: {}
      }).then(res => {
        console.log(111, res);
        that.allMoney = res.args.allMoney;
        that.bean = res.args.bean;
        that.result = res.args.result;
      });
    }
  },
  beforeMount() {
    let info = JSON.parse(localStorage.getItem("loginInfo"));
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.index {
  .inline-flex {
    display: inline-flex;
  }
}
</style>
