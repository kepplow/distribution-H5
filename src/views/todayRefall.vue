<template>
  <div>
    <div class="box">
      <div class="ret" @click="toIndexPage()">
        <div>
          <img src="../assets/images/arrow.png" />
        </div>
        <h5>返回首页</h5>
      </div>
      <div class="search">
        <div>
          <img src="../assets/images/search.png" />
        </div>
        <h5>搜索</h5>
      </div>
    </div>
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
    </div>
    <div class="dispaly" v-for="(i,v) of list" :key="v">
      <van-row gutter="20" type="flex" justify="space-around">
        <van-col span="8">
          <span>{{i.a}}</span>
        </van-col>
        <van-col span="10">
          <span class="cen">{{i.b}}</span>
        </van-col>
        <van-col span="6">
          <span>{{i.c}}</span>
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
        { a: "2020-04-05", b: "一级代理", c: 6000 },
        { a: "2020-04-05", b: "指数玩家", c: 6000 },
        { a: "2020-04-05", b: "二级代理玩家", c: 6000 }
      ]
    };
  },
  methods:{
      toIndexPage(){
          this.$router.go(-1)
      }
  }
};
</script>
<style lang="less" scoped>
.box {
  display: flex;
  border-top: 0.0625rem solid rgb(230, 230, 230);
  margin-top: 1.25rem;
  font-weight: 500;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  .ret {
    border-right: 0.0625rem solid rgb(230, 230, 230);
    width: 100%;
    padding: 0.9375rem 0rem;
    text-align: center;
  }
  .search {
    width: 100%;
    padding: 0.9375rem 0rem;
    text-align: center;
  }
  h5 {
    margin: 0;
  }
}

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