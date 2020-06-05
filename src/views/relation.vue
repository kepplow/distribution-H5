<template>
  <div id="abc">
    <div class="box">
      <van-button type="primary">按加入时间排序</van-button>
      <van-button type="primary">按加入时间排序</van-button>

      <van-button type="primary">按加入时间排序</van-button>
      <van-button type="primary">按加入时间排序</van-button>

      <van-button type="primary">按加入时间排序</van-button>
    </div>
    <div class="detailBox" v-for="item in 3" :key="item">
      <div class="flex">
        <div class="img">1</div>
        <div class="txt">
          <div>名称xxxxx（ID：xxxxx）</div>
          <div>总局数：346</div>
        </div>
      </div>
      <div class="num">
        <div>在线</div>
        <div>下级人数：21|34</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
export default {};
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
    border-bottom: 0.0625rem solid;
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