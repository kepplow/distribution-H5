<template>
  <div>
    <div class="box">
      <div class="ret" @click="toIndexPage">
        <div>
          <img src="../assets/images/arrow.png" />
        </div>
      </div>
      <div class="search">
        <div>
          <img src="../assets/images/search.png" />
        </div>
      </div>
    </div>
    <van-field v-model="sms" center clearable placeholder="搜索" style="padding:5px 5px">
      <template #button>
        <van-button size="small" type="primary">搜索</van-button>
      </template>
    </van-field>

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
export default {
  data() {
    return {
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
    toIndexPage() {
      this.$router.go(-1);
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
  border-bottom: 1px solid rgb(225, 225, 225);
}
</style>