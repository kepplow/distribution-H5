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
    </div>
    <div class="dispaly" v-for="(i,v) of list" :key="v">
      <van-row gutter="20" type="flex" justify="space-around">
        <van-col span="8">
          <span>{{i.time}}</span>
        </van-col>
        <van-col span="10">
          <span class="cen">{{i.identity}}</span>
        </van-col>
        <van-col span="6">
          <span>{{i.quota}}</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  beforeMount() {
    this.WS.sendMsg({
      code: 40000,
      args: {
        day: 1,
        uid:this.Uid
      }
    }).then(res => {
      console.log(res);
      const data = [];
      for (let v in res.args.recharge){
          let val = {};
          val.time = new Date().toLocaleString().split(" ")[0];
          val.identity = v == "one" ? "一级代理" : "二级代理"
          val.quota  = res.args.recharge[v].money
          data.push(val);
      }
      this.list = data
    });
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
