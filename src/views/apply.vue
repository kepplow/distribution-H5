<template>
  <div class="box">
    <div class="seach">
      <van-field v-model="name" center clearable placeholder="姓名">
        <template #button>
          <van-button size="small" type="primary">搜索</van-button>
        </template>
      </van-field>
    </div>
    <div class="title">
      <div style="width: 28%;">
        <span>亲友圈</span>
      </div>
      <div style="width: 23%;">
        <span>申请人</span>
      </div>
      <div style="width: 35%;">
        <span>申请时间</span>
      </div>
      <div style="width: 35%;">
        <span>状态</span>
      </div>
    </div>
    <div class="dispaly" v-for="(i,v) of list" :key="v">
      <van-row gutter="20" type="flex" justify="space-around">
        <van-col span="13">
          <span>{{i.friend}}</span>
          <br />
          <span>ID:{{i.id}}</span>
        </van-col>
        <van-col span="7">
          <span class="cen">{{i.applyName}}</span>
        </van-col>
        <van-col span="12">
          <span>{{i.time}}</span>
        </van-col>
        <van-col span="15">
          <span v-if="i.state == 1" style="color:green">已同意</span>
          <span v-if="i.state == 2" style="color:red">已拒绝</span>
          <span v-if="i.state == 3">
            <van-button type="primary" size="mini">同意</van-button>
            <van-button type="danger" size="mini">拒绝</van-button>
          </span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Field } from "vant";
import { Button } from "vant";
export default {
  data() {
    return {
      name:'',
      list: [
        {
          friend: "我的亲友圈A",
          id: 2336266,
          applyName: "张三",
          time: "2020-04-05 12:33:20",
          state: 1
        },
        {
          friend: "我的亲友圈B",
          id: 2336266,
          applyName: "张三",
          time: "2020-04-05 12:33:20",
          state: 2
        },
        {
          friend: "我的亲友圈B",
          id: 2336266,
          applyName: "张三",
          time: "2020-04-05 12:33:20",
          state: 3
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.box {
  .seach {
    padding: 10px 10px;
  }
  .title {
    display: flex;
    width: 100%;
    height: 4.375rem;
    background-color: rgb(40, 166, 155);
    color: white;
    div {
      text-align: left;
      line-height: 4.375rem;
      padding-left: 1.25rem;
    }
  }
  .dispaly {
    padding: 1.25rem 0;
    border-bottom: 1px solid rgb(225, 225, 225);
  }
}
</style>