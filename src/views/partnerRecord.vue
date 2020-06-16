<template>
  <div>
    <div class="title">
      <div>
        <span>时间</span>
      </div>
      <div>
        <span>关系</span>
      </div>
      <div>
        <span>充值总额</span>
      </div>
      <div>
        <span>返利</span>
      </div>
      <div>
        <span>合伙人提成</span>
      </div>
    </div>
    <div class="dispaly" v-for="(i,v) of list" :key="v">
      <van-row gutter="20" type="flex" justify="space-around">
        <van-col span="6">
          <span>{{i.time}}</span>
        </van-col>
        <van-col span="8">
          <span class="cen">{{i.identity}}</span>
        </van-col>
        <van-col span="6">
          <span>{{i.quota}}</span>
        </van-col>
        <van-col span="6">
          <span>{{i.rebate}}</span>
        </van-col>
        <van-col span="6">
          <span>{{i.commission}}</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          time: "2020-04-05",
          identity: "一级代理",
          quota: 6000,
          rebate: "120[30%]",
          commission: "120[10%]"
        },
        {
          time: "2020-04-05",
          identity: "指数玩家",
          quota: 6000,
          rebate: "120[30%]",
          commission: "120[10%]"
        },
        {
          time: "2020-04-05",
          identity: "二级代理玩家",
          quota: 6000,
          rebate: "120[30%]",
          commission: "120[10%]"
        }
      ]
    };
  },
  methods: {
    toIndexPage() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>

.title {
  display: flex;
  width: 100%;
  height: 4.375rem;
  background-color: rgb(40, 166, 155);
  color: white;
  div {
    text-align: left;
    width: 33.33%;
    line-height: 4.375rem;
    padding-left: 1.25rem;
  }
}
.dispaly {
  padding: 1.25rem 0;
}
</style>