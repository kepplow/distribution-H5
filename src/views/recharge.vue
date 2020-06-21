<template>
  <div class="bor">
    <div v-for="(data,key) in list" :key="key">
      <div class="sty" :style="{background: randomColor(25,225) }">
        <div>
          <span>￥</span>
        </div>
        <div @click="rechar(data)">
          <span>房卡：</span>
          <span>{{data.cards}}</span>
          <span class="space">含赠送：</span>
          <span>{{data.give}}</span>
          <br />
          <span>售价：</span>
          <span>{{data.money}}元</span>
          <span v-if="data.mjCards" class="space background">送{{data.mjCards}}麻将专卡</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      list: []
    };
  },
  beforeMount() {
    this.WS.sendMsg({ code: 40015, args: {} }).then(res => {
      if (res.args && res.args.data) {
        this.list = JSON.parse(JSON.stringify(res.args.data));
      }
    });
  },
  methods: {
    rechar(data) {
      Dialog.alert({
        title: "提醒",
        showCancelButton: true,
        message: "是否使用余额购买？"
      })
        .then(() => {
          this.WS.sendMsg({ code: 40016, args: { id: data.id } }).then(res => {
            console.log(res);
          });
        })
        .catch(() => {
          console.log("取消");
        });
    },
    /** 生成一个随机数* */
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    /** 生成一个随机色* */
    randomColor(min, max) {
      var r = this.randomNum(min, max);
      var g = this.randomNum(min, max);
      var b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
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
