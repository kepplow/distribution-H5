<template>
  <div class="member-manage">
    <div class="flex" @click="to('relation')">
      <div>
        <img src="../assets/images/identity.png" />
        <span>关系谱</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div class="flex" @click="to('agentAdd')">
      <div>
        <img src="../assets/images/label.png" />
        <span>推荐代理</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <div class="flex bottom-sty" @click="getQRCode">
      <div>
        <img src="../assets/images/chart.png" />
        <span>专属二维码</span>
      </div>
      <span class="iconfont icon-jiantou mr-1"></span>
    </div>
    <!-- bottomBar -->
    <bottomBar></bottomBar>
  </div>
</template>

<script>
import bottomBar from "../components/common/bottomBar";
export default {
  data() {
    return {};
  },
  components: {
    bottomBar
  },
  methods: {
    to(path) {
      this.$router.push({ name: path });
    },
    getQRCode() {
      this.WS.sendMsg({
        code: 40003,
        args: {}
      }).then(res => {
        console.log(res);
        window.location.href = res.args.url;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.member-manage {
  // padding: 1.25rem 0.9375rem;
  padding-top: 1.25rem;
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 0.0625rem solid rgb(230, 230, 230);
    color: gray;
    padding: 0.625rem;
    div:first-child {
      display: flex;
      align-items: center;
      color: #000;
      span {
        font-weight: 600;
        margin-left: 0.9375rem;
      }
    }
  }
  .bottom-sty {
    border-bottom: 0.0625rem solid rgb(230, 230, 230);
  }
}
</style>
