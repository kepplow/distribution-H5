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
    <div class="w-100 bg-warning relative p-1 overflow-hidden">
      <div
        class="flex relative w-auto inline-flex font text-dark-second-1"
        :style="`left: ${scrollBarLeft}px`"
        ref="scrollBar"
      >
        <span class="text-danger">喇叭icon</span>
        <div>小贤在线发奖！！！！！！</div>
      </div>
    </div>

    <div>
      <div class="flex justify-between align-center border-bottom px-1 py-2">
        <div class="flex justify-around align-center">
          <span class="icon around mr-1">icon</span>
          <span class="mr-1">可结算</span>
          <span class="bg-danger font-sm px-1 py-05 around">￥0</span>
        </div>
        <div class="text-gray">点击进行结算 &gt;</div>
      </div>
      <div class="flex justify-between align-center border-bottom px-1 py-2">
        <div class="flex justify-around align-center">
          <span class="icon around mr-1">icon</span>
          <span class="mr-1">今日充值</span>
          <span class="bg-danger font-sm px-1 py-05 around">￥0</span>
        </div>
        <div class="text-gray">&gt;</div>
      </div>
      <div class="flex justify-between align-center border-bottom px-1 py-2">
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
    msg() {
      return () => {};
    }
  },
  mounted() {
    let scrollBarWidth = this.$refs["scrollBar"].clientWidth;
    let fooBarWidth = this.$refs["scrollBar"].parentNode.clientWidth;
    console.log(this.scrollBarWidth);
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
