<template>
  <div class="member-manage">
    <div class="flex" @click="to('relation')">
      <div>
        <img src="../assets/images/identity.png" />
        <span>关系谱</span>
      </div>
      <div>></div>
    </div>
    <div class="flex" @click="to('agentAdd')">
      <div>
        <img src="../assets/images/label.png" />
        <span>推荐代理</span>
      </div>
      <div>></div>
    </div>
    <div class="flex bottom-sty">
      <div>
        <img src="../assets/images/chart.png" />
        <span>专属二维码</span>
      </div>
      <div>></div>
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
    border-top: 0.0625rem solid rgb(245, 245, 245);
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
    border-bottom: 0.0625rem solid rgb(245, 245, 245);
  }
}
</style>
