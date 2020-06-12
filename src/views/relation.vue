<template>
  <div id="abc">
    <div class="box">
      <van-button type="primary">按加入时间排序</van-button>
      <van-button type="primary">按下级人数排序</van-button>

      <van-button type="primary">按消费金额排序</van-button>
      <van-button type="primary">按总消费金额排序</van-button>

      <van-button type="primary">按活跃度排序</van-button>
    </div>
    <div class="detailBox" v-for="item in data" :key="item">
      <div class="flex">
        <div class="img">1</div>
        <div class="txt">
          <div>{{ item.nickName }}（ID：{{ item.uid }}）</div>
          <div>总局数：{{ item.playCards }}</div>
        </div>
      </div>
      <div class="num">
        <div>{{ item.online ? "在线" : "不在线"}}</div>
        <div>下级人数：{{ item.nextOnline }}|{{ item.nextAllLen }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {},
  beforeMount() {
    let that = this;
    this.WS.sendMsg({
      code: 40002,
      args: {}
    }).then(res => {
      console.log(111111, res);
      that.data = res.relation;
    });
  }
};
</script>

<style lang="less" scoped>
#abc {
  padding: 0.625rem;
  .box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // padding: 0.625rem 1.25rem;
    .van-button {
      margin: 0.625rem 0 !important;
    }
  }
  .detailBox {
    display: flex;
    // align-items: center;
    justify-content: space-between;
    font-size: 0.875rem;
    border-bottom: 0.0625rem solid rgb(220, 220, 220);
    padding-bottom: 0.9375rem;
    margin-top: 0.625rem;
    .flex {
      display: flex;
      flex: 6;
      .txt {
        div:first-child {
          margin-bottom: 1.875rem;
        }
        div:last-child {
          color: red;
        }
      }
      .img {
        background: red;
        width: 4.375rem;
        height: 4.375rem;
        margin-right: 1.25rem;
      }
    }
    .num {
      div:first-child {
        margin-bottom: 1.875rem;
        text-align: right;
        color: blue;
        cursor: pointer;
      }
    }
  }
}
</style>