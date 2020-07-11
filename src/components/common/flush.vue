<template>
  <div>
      <van-button class="f_menu flush" type="primary" onClick="javascript:location=location">刷新</van-button>
  </div>
</template>

<script>

</script>

<style lang="less" scoped>
.f_menu {
  position: fixed;
  bottom: 50px;
  right: 15px;
  width: 60px;
  height: 60px;
  background: black;
  border-radius: 50%;
  opacity: 0.75;
  color: white;
  text-align: center;
  line-height: 60px;
  font-size: 12px;
  cursor: pointer;
  span{
    width: 50px;
  }
}
.flush{
  bottom: 110px;
}
</style>
