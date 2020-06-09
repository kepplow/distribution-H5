<template>
  <div class="box">
    <div class="cent">
      <van-form validate-first>
        <van-field v-model="value" placeholder="姓名" />
        <van-field v-model="value" placeholder="亲友圈名" />
        <div style="margin: 1rem;">
          <van-button round block type="info" native-type="bottom">搜索</van-button>
        </div>
      </van-form>
    </div>
    <div class="box">
      <van-button type="primary">按加入时间排序</van-button>
      <van-button type="primary">按加入时间排序</van-button>
      <van-button type="primary">按加入时间排序</van-button>
    </div>
    <div class="table">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>亲友圈</th>
            <th>参与人</th>
            <th>历史赢分</th>
            <th>历史输分</th>
            <th>总成绩</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,v) of list" :key="v">
            <td>
              <span>{{i.friend}}</span>
              <br />
              <span>ID:{{i.id}}</span>
            </td>
            <td>{{i.name}}</td>
            <td>{{i.win}}</td>
            <td>{{i.lose}}</td>
            <td>{{i.all}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { Form } from "vant";
export default {
  data() {
    return {
      value: "",
      list: [
        {
          friend: "亲友圈A",
          id: 123123,
          name: "张三",
          win: 213123,
          lose: 213123,
          all: 21039120
        },
        {
          friend: "亲友圈A",
          id: 123123,
          name: "张三",
          win: 213123,
          lose: 213123,
          all: 21039120
        },
        {
          friend: "亲友圈A",
          id: 123123,
          name: "张三",
          win: 213123,
          lose: 213123,
          all: 21039120
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.box {
  .cent {
    padding: 0.625rem 0.625rem;
  }
  .box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // padding: 0.625rem 1.25rem;
    .van-button {
      margin: 0.625rem 0 !important;
    }
  }
  .table {
    width: 100%;
  }
}
</style>