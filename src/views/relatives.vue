<template>
  <div class="relatives">
    <div class="flex justify-between align-center ml-2 py-2 border-bottom">
      <div class>
        <span>icon</span>
        <span>绑定圈主id</span>
      </div>
      <div class="mr-1">&gt;</div>
    </div>
    <div
      class="flex justify-between align-center ml-2 py-2 border-bottom"
      @click="goto('/chargeCard')"
    >
      <div class>
        <span>icon</span>
        <span>充卡</span>
      </div>
      <div class="mr-1">&gt;</div>
    </div>
    <div class="flex justify-between align-center ml-2 py-2 border-bottom">
      <div class>
        <span>icon</span>
        <span>充卡记录</span>
      </div>
      <div class="mr-1">&gt;</div>
    </div>
    <div class="flex justify-between align-center ml-2 py-2 border-bottom"
    @click="goto('/tableList')">
      <div class>
        <span>icon</span>
        <span>桌子列表</span>
      </div>
      <div class="mr-1">&gt;</div>
    </div>
    <div class="flex justify-between align-center ml-2 py-2 border-bottom">
      <div class>
        <span>icon</span>
        <span>申请列表</span>
      </div>
      <div class="mr-1">&gt;</div>
    </div>
    <div class="flex justify-between align-center ml-2 py-2 border-bottom">
      <div class>
        <span>icon</span>
        <span>成员列表</span>
      </div>
      <div class="mr-1">&gt;</div>
    </div>
    <div class="flex justify-between align-center ml-2 py-2 border-bottom"
    @click="goto('/relativesRecord')">
      <div class>
        <span>icon</span>
        <span>亲友圈战绩</span>
      </div>
      <div class="mr-1">&gt;</div>
    </div>
    <div class="flex justify-between align-center ml-2 py-2 border-bottom">
      <div class>
        <span>icon</span>
        <span>转让亲友圈</span>
      </div>
      <div class="mr-1">&gt;</div>
    </div>
    <div class="flex justify-between align-center ml-2 py-2 border-bottom">
      <div class>
        <span>icon</span>
        <span>重置记录</span>
      </div>
      <div class="mr-1">&gt;</div>
    </div>
    <div class="flex justify-between align-center ml-2 py-2 border-bottom">
      <div class>
        <span>icon</span>
        <span>合伙人重置记录</span>
      </div>
      <div class="mr-1">&gt;</div>
    </div>
    <div class="flex justify-between align-center ml-2 py-2 border-bottom"
    @click="goto('/chart')">
      <div class>
        <span>icon</span>
        <span>收入统计</span>
      </div>
      <div class="mr-1">&gt;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "relatives",
  methods: {
    goto(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style>
</style>