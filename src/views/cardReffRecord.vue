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
        <van-col span="12">
          <span>{{i.time}}</span>
        </van-col>
        <van-col span="16">
          <span class="cen">{{i.details}}</span>
        </van-col>
      </van-row>
    </div>

    <div class="botton" @click="next">{{ tip }}</div>
    <flush></flush>
  </div>
</template>

<script>
import { Search } from "vant";
import flush from "../components/common/flush.vue";

export default {
  data() {
    return {
      tip: "点击加载更多。。。",
      search: "",
      list: [],
      page: {
        pageNum: 1,
        pagesize: 10
      }
    };
  },
  components: {
    flush
  },
  methods: {
    onSearch() {
      console.log(this.search);
      this.page.pageNum = 1;
      this.tip = "点击加载更多。。。";
      this.init();
    },
    toIndexPage() {
      this.$router.go(-1);
    },
    init() {
      let startIndex = (this.page.pageNum - 1) * this.page.pagesize;
      this.WS.sendMsg({
        code: 40008,
        args: {
          uid: this.Uid,
          startIndex: startIndex,
          endIndex: startIndex + this.page.pagesize
        }
      }).then(res => {
        console.log(res);
        if (res.args.log.length == 0) {
          this.tip = "没有更多了。。。";
          return;
        }
        res.args.log.forEach(v => {
          v.details = "购买者ID：" + v.buyUid + " 购买数量：" + v.num;
          this.list.push(v);
        });
      });
    },
    next() {
      this.page.pageNum++;
      this.init();
    }
  },
  mounted() {
    this.init();
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
.botton {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: rgb(200, 200, 200);
}
</style>