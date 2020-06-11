<template>
  <div class="bottom-bar">
    <div class="flex flex-column justify-center align-center activ my-05" @click="goto('/')">
      <img src="../../assets/images/logo.png" width="20" height="20" alt="icon" />
      <div>首页</div>
    </div>
    <div class="flex flex-column justify-center align-center" @click="goto('/memberManage')">
      <img src="../../assets/images/logo.png" width="20" height="20" alt="icon" />
      <div>成员管理</div>
    </div>
    <div class="flex flex-column justify-center align-center">
      <img src="../../assets/images/logo.png" width="20" height="20" alt="icon" @click="goto('/relatives')" />
      <div>亲友圈</div>
    </div>
    <div class="flex flex-column justify-center align-center">
      <img src="../../assets/images/logo.png" width="20" height="20" alt="icon" @click="goto('/home')"/>
      <div>个人中心</div>
    </div>
  </div>
</template>

<script>
export default {
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
