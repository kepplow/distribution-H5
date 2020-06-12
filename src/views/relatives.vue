<template>
  <div class="relatives">
    <div class="flex justify-between align-center ml-2 py-1 border-bottom" @click="goto('bindID')">
      <div class>
        <span class="iconfont icon-IDcard font-xl vertical-middle mr-1"></span>
        <span>绑定圈主id</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div
      class="flex justify-between align-center ml-2 py-1 border-bottom"
      @click="goto('/chargeCard')"
    >
      <div class>
        <span class="iconfont icon-kaichongqia font-xl vertical-middle mr-1"></span>
        <span>充卡</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div
      class="flex justify-between align-center ml-2 py-1 border-bottom"
      @click="goto('cardReffRecord')"
    >
      <div class>
        <span class="iconfont icon-xiaotubiao- font-lg vertical-middle mr-2"></span>
        <span>充卡记录</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div
      class="flex justify-between align-center ml-2 py-1 border-bottom"
      @click="goto('/tableList')"
    >
      <div class>
        <span class="iconfont icon-zhuozi font-lg vertical-middle mr-2"></span>

        <span>桌子列表</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div class="flex justify-between align-center ml-2 py-1 border-bottom" @click="goto('apply')">
      <div class>
        <span class="iconfont icon-shenqingliebiao font-lg vertical-middle mr-2"></span>

        <span>申请列表</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div
      class="flex justify-between align-center ml-2 py-1 border-bottom"
      @click="goto('memberList')"
    >
      <div class>
        <span class="iconfont icon-chengyuanliebiao font-lg vertical-middle mr-2"></span>

        <span>成员列表</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div
      class="flex justify-between align-center ml-2 py-1 border-bottom"
      @click="goto('/relativesRecord')"
    >
      <div class>
        <span class="iconfont icon-zhanji font-lg vertical-middle mr-2"></span>

        <span>亲友圈战绩</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div
      class="flex justify-between align-center ml-2 pt-2 pb-1 border-bottom"
      @click="goto('makeOver')"
    >
      <div class>
        <span class="iconfont icon-zhuanrang font-md vertical-middle mr-2"></span>

        <span>转让亲友圈</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div
      class="flex justify-between align-center ml-2 py-1 border-bottom"
      @click="goto('rechargeRecord')"
    >
      <div class>
        <span class="iconfont icon-Group font-lg vertical-middle mr-2"></span>

        <span>充值记录</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div
      class="flex justify-between align-center ml-2 py-1 border-bottom"
      @click="goto('partnerRecord')"
    >
      <div class>
        <span class="iconfont icon-hehuoren font-lg vertical-middle mr-2"></span>

        <span>合伙人充值记录</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div class="flex justify-between align-center ml-2 py-1 border-bottom" @click="goto('/chart')">
      <div class>
        <span class="iconfont icon-shourutongji font-lg vertical-middle mr-2"></span>

        <span>收入统计</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <footer></footer>
    <bottomBar></bottomBar>
  </div>
</template>

<script>
import bottomBar from "../components/common/bottomBar";
export default {
  name: "relatives",
  data() {
    return {
      list: []
    };
  },
  components: {
    bottomBar
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="less" scoped>
footer {
  width: 100%;
  height: 60px;
}
</style>