<template>
  <div id="abc">
    <van-search v-model="search" show-action placeholder="请输入搜索关键词" @search="onSearch">
      <template #action>
        <div @click="onSearch" style="color:green">搜索</div>
      </template>
    </van-search>

    <van-dropdown-menu active-color="green">
      <van-dropdown-item v-model="sort" :options="sortOption" />
    </van-dropdown-menu>

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
import { DropdownMenu, DropdownItem, Search } from "vant";

export default {
  data() {
    return {
      data: [],
      search: "",
      sort: 0,
      sortOption: [
        { text: "按加入时间排序", value: 0 },
        { text: "按下级人数排序", value: 1 },
        { text: "按消费金额排序", value: 2 },
        { text: "按总消费金额排序", value: 3 },
        { text: "按活跃度排序", value: 4 }
      ]
    };
  },
  methods: {
    onSearch() {
      console.log(this.search);
    }
  },
  beforeMount() {
    let that = this;
    this.WS.sendMsg({
      code: 40002,
      args: { startIndex: 0, endIndex: 20, type: "1" }
    }).then(res => {
      console.log(111111, res);
      that.data = res.relation;
    });
  }
};
</script>

<style lang="less" scoped>
#abc > * {
  margin-top: 10px;
}
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
