<template>
  <div class="index">
    <div class="head">
      <div class="top">
        <div class="img">
          <!-- <img src="../assets/images/head.png" /> -->
          <img :src="headPic" />
        </div>
        <div class="text">
          <div>昵称：{{ nickname }}</div>
          <div>我的ID：{{ myID }}</div>
        </div>
      </div>
    </div>
    <div>
      <van-notice-bar left-icon="volume-o" :scrollable="true" :text="notice" @click="Jump" />
    </div>
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
    <flush></flush>
  </div>
</template>

<script>
import bottomBar from "../components/common/bottomBar.vue";
import flush from "../components/common/flush.vue";
import { Dialog } from "vant";
import { NoticeBar } from "vant";
import { Toast } from "vant";

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
      headPic: require("../assets/images/head.png"),
      weChat: ""
    };
  },

  components: {
    bottomBar,
    flush
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
          if (that.bean < 100) {
            Toast("您还没有可结算的现金");
            return;
          }
          if (!that.weChat) {
            Toast("您还未绑定提现微信");
            return;
          }
          that.WS.sendMsg({
            type: 1,
            num: that.bean
          }).then(res => {
            console.log(res);
          });
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
        args: { uid: this.Uid }
      }).then(res => {
        console.log(111, res);
        that.allMoney = res.args.allMoney || 0;
        that.bean = res.args.bean || 0;
        that.result = res.args.result;
      });
    },
    Jump(){
      this.$router.push("/notice");;
    }
  },
  beforeMount() {
    let info = JSON.parse(localStorage.getItem("loginInfo"));
    this.nickname = info.user.info.name;
    this.myID = info.uid;
    this.notice = info.content.notice;
    this.weChat = info.content.wechat;
    if (info.user.info.headPic) {
      this.headPic = info.user.info.headPic;
    }
    this.WS.bind("1313", function(message) {
      console.log(message);
    });
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.head {
  width: 90%;
  margin: 10px;
  .top {
    display: flex;
    width: 100%;
    height: 100px;
    .img {
      width: 100px;
      height: 100px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
    }
    .text {
      width: 100%;
      height: 100px;
      margin: 10px;
      div {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
      }
    }
  }
}
.index {
  .inline-flex {
    display: inline-flex;
  }
}
</style>
