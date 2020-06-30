<template>
  <div class="box">
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
        </van-row>
      </div>
      <van-pagination v-model="page.pageNum" @change="onChange" :total-items="14" :items-per-page="2" />
    </div>
    <!-- 底部展示栏 -->
    <div class="footer-y"></div>
    <div class="footer">
      <div>总金额: {{ allMoney }}元</div>
      <div>总笔数：{{ allNum }}</div>
    </div>
  </div>
</template>

<script>
import { Pagination } from 'vant';

export default {
  data() {
    return {
      allMoney: 0,
      allNum: 0,
      list: [],
      page:{
        pageNum:1
      }
    };
  },
  methods: {
    toIndexPage() {
      this.$router.go(-1);
    },
    init() {
      this.WS.sendMsg({ code: 40013, args: { uid: this.Uid, day: this.page.pageNum } }).then(
        res => {
          console.log(res);
          this.allMoney = res.args.allMoney;
          this.allNum = res.args.rNum;
          for(let i  in res.args.recharge){
            let data = {};
            data.time = res.args.recharge[i].payTime
            data.identity = i == "one" ? "直属玩家" : ( i == "two" ? "一级代理玩家" : "二级代理玩家") ;
            data.quota = res.args.recharge[i].money
            data.rebate = res.args.recharge[i].rebate;
            this.list.push(data);
          }
        }
      );
    },
    onChange(){
      this.list = [];
      this.init();
    }
  },
  beforeMount() {
    this.init();
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
.footer-y {
  width: 100%;
  height: 50px;
}
.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  display: flex;
}
.footer div {
  font-size: 18px;
  width: 40%;
  height: 50px;
  padding-left: 10px;
  line-height: 50px;
}
</style>