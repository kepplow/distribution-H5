<template>
  <div id="abc">
    <van-search v-model="search" show-action placeholder="请输入搜索关键词" @search="onSearch">
      <template #action>
        <div @click="onSearch" style="color:green">搜索</div>
      </template>
    </van-search>

    <van-dropdown-menu active-color="green">
      <van-dropdown-item v-model="sort" :options="sortOption" @change="changeSearch" />
    </van-dropdown-menu>

    <van-tabs @click="tabClick" v-model="level">
      <van-tab title="二级玩家">
        <div class="detailBox" v-for="(item,index) in data" :key="index">
          <div class="flex">
            <div class="img">
              <img :src="item.head_pic" />
            </div>
            <div class="txt">
              <div>{{ item.nickName }}（ID：{{ item.uid }}）</div>
              <div>总消费房卡：{{ item.playCards }}</div>
            </div>
          </div>
          <div class="num">
            <div>{{ item.online ? "在线" : "不在线"}}</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="二级代理">
        <div class="detailBox" v-for="(item,index) in data" :key="index">
          <div class="flex">
            <div class="img">
              <img :src="item.head_pic" />
            </div>
            <div class="txt">
              <div>{{ item.nickName }}（ID：{{ item.uid }}）</div>
              <div>总消费房卡：{{ item.playCards }}</div>
            </div>
          </div>
          <div class="num">
            <div>{{ item.online ? "在线" : "不在线"}}</div>
            <div>下级人数：{{ item.nextOnline }}|{{ item.nextAllLen }}</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <div class="botton" @click="next">{{ tip }}</div>
    <van-button id="f_menu" type="primary" @click="goback">后退</van-button>
  </div>
</template>

<script>
import { Button } from "vant";
import { DropdownMenu, DropdownItem, Search, Tab, Tabs } from "vant";

export default {
  data() {
    return {
      isMore: true,
      tip: "点击加载更多。。。",
      data: [],
      agent: [],
      search: "",
      sort: 1,
      sortOption: [
        { text: "按加入时间排序", value: 1 },
        { text: "按下级人数排序", value: 2 },
        { text: "按消费金额排序", value: 3 },
        { text: "按活跃度排序", value: 4 }
      ],
      page: {
        pageNum: 1,
        pagesize: 10
      },
      level: 0,
      agentUid: 0
    };
  },
  methods: {
    onSearch() {
      this.page.pageNum = 1;
      this.tip = "点击加载更多。。。";
      this.isMore = true;
      this.page.pageNum = 1;
      this.page.pagesize = 10;
      this.data = [];
      this.getData();
    },
    changeSearch() {
      this.isMore = true;
      this.page.pageNum = 1;
      this.page.pagesize = 10;
      this.data = [];
      this.getData();
    },
    next() {
      if (!this.isMore) {
        return;
      }
      this.page.pageNum++;
      this.getData();
    },
    getData() {
      let startIndex = (this.page.pageNum - 1) * this.page.pagesize;
      this.WS.sendMsg({
        code: 40024,
        args: {
          agentLevel: this.level,
          uid: this.agentUid,
          startIndex: (this.page.pageNum - 1) * this.page.pagesize,
          endIndex: this.page.pagesize,
          type: this.sort
        }
      }).then(res => {
        console.log(res);
        if (res.args.relation.length < this.page.pagesize) {
          this.isMore = false;
          this.tip = "没有更多了。。。";
          if (res.args.relation.length == 0) {
            return;
          }
        } else {
          this.tip = "点击加载更多。。。";
        }
        res.args.relation.forEach(v => {
          this.data.push(v);
        });
      });
    },
    tabClick(index) {
      this.isMore = true;
      this.page.pageNum = 1;
      this.page.pagesize = 10;
      this.data = [];
      this.getData();
    },
    goback() {
      window.history.go(-1);
    }
  },
  beforeMount() {
    this.agentUid = this.$route.query.uid;
    if (this.agentUid == 0) {
      this.goback();
    }
    this.getData();
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
          font-size: 13px;
          margin-bottom: 1.875rem;
        }
        div:last-child {
          color: red;
          font-size: 13px;
        }
      }
      .img {
        width: 4.375rem;
        height: 4.375rem;
        margin-right: 1.25rem;
        img {
          margin-top: 0.625rem;
          vertical-align: middle;
          width: 100%;
          height: 100%;
        }
      }
    }
    .num {
      div:first-child {
        font-size: 13px;
        margin-bottom: 1.875rem;
        text-align: right;
        color: blue;
        cursor: pointer;
      }
      div:last-child {
        font-size: 13px;
      }
    }
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
#f_menu {
  position: fixed;
  bottom: 50px;
  right: 15px;
  width: 60px;
  height: 60px;
  background: black;
  border-radius: 50%;
  opacity: 0.75;
  color: white;
  text-align: center;
  line-height: 60px;
  font-size: 12px;
  cursor: pointer;
  span{
    width: 50px;
  }
}
</style>
