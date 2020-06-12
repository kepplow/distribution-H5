<template>
  <div class="bottom-bar">
    <div
      :class="['flex', 'flex-column', 'justify-center', 'align-center', path === '/' ? 'activ' : '', 'my-05']"
      @click="goto('/')"
    >
      <span class="iconfont icon-shouye font-lg"></span>
      <div>首页</div>
    </div>
    <div
      class="flex flex-column justify-center align-center"
      :class="path === '/memberManage' ? 'activ': ''"
      @click="goto('/memberManage')"
    >
      <span class="iconfont icon-chengyuan font-lg"></span>
      <div>成员管理</div>
    </div>
    <div
      class="flex flex-column justify-center align-center"
      :class="path === '/relatives' ? 'activ': ''"
      @click="goto('/relatives')"
    >
      <span class="iconfont icon-qinyouquan font-lg"></span>
      <div>亲友圈</div>
    </div>
    <div
      class="flex flex-column justify-center align-center"
      :class="path === '/home' ? 'activ': ''"
      @click="goto('/home')"
    >
      <span class="iconfont icon-gerenzhongxin-shezhi font-lg"></span>
      <div>个人中心</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: ""
    };
  },
  beforeMount() {
    this.path = this.$route.path;
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="less" scoped>
.bottom-bar {
  z-index: 20;
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #ccc;
  background-color: #f7f7f9;
  color: #969595;
  .activ {
    color: #55b34b;
  }
}
</style>
