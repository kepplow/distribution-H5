<template>
  <div>
    <div class="title">
      <div>
        <span>时间</span>
      </div>
      <div>
        <span>昵称</span>
      </div>
      <div>
        <span>关系</span>
      </div>
      <div>
        <span>今日充值</span>
      </div>
      <div>
        <span>收益</span>
      </div>
    </div>
    <div class="dispaly" v-for="(i,v) of list" :key="v">
      <van-row gutter="20" type="flex" justify="space-around">
        <van-col span="8">
          <span>{{i.time}}</span>
        </van-col>
        <van-col span="8">
          <span>{{i.name}}</span>
        </van-col>
        <van-col span="10">
          <span class="cen">{{i.identity}}</span>
        </van-col>
        <van-col span="8">
          <span>{{i.money}}</span>
        </van-col>
        <van-col span="6">
          <span>{{i.quota}}</span>
        </van-col>
      </van-row>
    </div>

    <!-- 底部展示栏 -->
    <div class="footer-y"></div>
    <div class="footer">
      <div>总金额: {{ money }}元</div>
      <div>总笔数：{{ biShu }}</div>
      <div>总收益：{{ rebate }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      biShu: 0,
      money: 0,
      rebate: 0,
      list: []
    };
  },
  beforeMount() {
    this.WS.sendMsg({
      code: 40000,
      args: {
        day: 1,
        uid: this.Uid
      }
    }).then(res => {
      console.log(res);
      const data = [];
      res.args.recharge.forEach(v => {
        let val = {};
        val.name = v.wx_name;
        val.time = new Date().toLocaleString().split(" ")[0];
        val.identity = this.identity(v.level.level, v.level.type);
        val.quota = v.rebate;
        val.money = v.money;
        val.biShu = v.biShu;
        data.push(val);

        this.biShu += v.biShu;
        this.money += v.money;
        this.rebate += v.rebate;
      });

      this.rebate = this.rebate.toFixed(2);
      this.list = data;
    });
  },

  methods: {
    toIndexPage() {
      this.$router.go(-1);
    },
    identity(level, type) {
      switch (type) {
        case 0:
          if (level == 1) {
            return "一级玩家";
          }
          if (level == 2) {
            return "二级玩家";
          }
          if (level == 3) {
            return "三级玩家";
          }
          break;
        case 1:
          if (level == 1) {
            return "一级代理";
          }
          if (level == 2) {
            return "二级代理";
          }
          if (level == 3) {
            return "三级代理";
          }
          break;
      }
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
  background-color: white;
  font-size: 18px;
  width: 40%;
  height: 50px;
  padding-left: 10px;
  line-height: 50px;
  color: black;
}
</style>
