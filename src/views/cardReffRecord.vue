<template>
  <div class="box">
    <van-search v-model="search" show-action placeholder="请输入搜索关键词" @search="onSearch">
      <template #action>
        <div @click="onSearch" style="color:green">搜索</div>
      </template>
    </van-search>

    <div class="title">
      <div>
        <span>时间</span>
      </div>
      <div>
        <span>出售详情</span>
      </div>
    </div>
    <div class="dispaly" v-for="(i,v) of list" :key="v">
      <van-row gutter="20" type="flex" justify="space-around">
        <van-col span="8">
          <span>{{i.friend}}</span>
          <br />
          <span>ID:{{i.id}}</span>
        </van-col>
        <van-col span="16">
          <span class="cen">{{i.details}}</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Search } from "vant";

export default {
  data() {
    return {
      search: "",
      list: [
        {
          friend: "我的亲友圈A",
          id: 123333,
          details:
            "2020.03.03 14:20:00 -4房卡，剩余：34房卡，购买人：张三四，购买人id：123123"
        },
        {
          friend: "我的亲友圈A",
          id: 123333,
          details:
            "2020.03.03 14:20:00 -4房卡，剩余：34房卡，购买人：张三四，购买人id：123123"
        },
        {
          friend: "我的亲友圈A",
          id: 123333,
          details:
            "2020.03.03 14:20:00 -4房卡，剩余：34房卡，购买人：张三四，购买人id：123123"
        }
      ]
    };
  },
  methods: {
    onSearch() {
      console.log(this.search);
    },
    toIndexPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.box > * {
  padding: 10px;
}
.box {
  .title {
    display: flex;
    width: 100%;
    height: 4.375rem;
    background-color: rgb(40, 166, 155);
    color: white;
    div {
      text-align: left;
      width: 33.33%;
      padding-left: 1.25rem;
    }
  }
  .dispaly {
    padding: 1.25rem 0;
    border-bottom: 1px solid rgb(225, 225, 225);
  }
}
</style>