<template>
  <div class="bor">
    <div v-for="(data,key) in list" :key="key">
      <div class="sty" :style="{background:data.color}">
        <div>
          <span>￥</span>
        </div>
        <div @click="rechar(data)">
          <span>房卡：</span>
          <span>{{data.roomCard}}</span>
          <span class="space">含赠送：</span>
          <span>{{data.give}}</span>
          <br />
          <span>售价：</span>
          <span>{{data.price}}元</span>
          <span class="space background">{{data.extra}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { roomCard: "6.0", give: 0, price: 6, color: "green", extra: "" },
        { roomCard: "6.0", give: 0, price: 6, color: "blue", extra: "" },
        {
          roomCard: "6.0",
          give: 0,
          price: 6,
          color: "orange",
          extra: "送900麻将专卡"
        }
      ]
    };
  },
  methods: {
    rechar(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
.bor {
  .sty {
    width: 85%;
    height: 5rem;
    margin: 0 auto;
    margin-top: 0.9375rem;
    display: flex;
    border-top-right-radius: 0.625rem;
    border-bottom-right-radius: 0.625rem;
    color: white;
    div:first-child {
      flex: 1;
      background: black;
      opacity: 0.4;
      text-align: center;
      line-height: 5rem;
      font-size: 1.375rem;
    }
    div:last-child {
      flex: 4;
      height: 100%;
      line-height: 2.5rem;
      padding-left: 0.625rem;
    }
    .space {
      margin-left: 1.25rem;
    }
    .background {
      background-color: red;
    }
  }
}
</style>