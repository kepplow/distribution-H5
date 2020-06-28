<template>
  <div>
    <div class="head">
      <van-button type="primary" block @click="newBind">新建绑定</van-button>
      <form>
        <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </form>
    </div>
    <div class="tableBox">
      <table class="table">
        <tr>
          <th>玩家</th>
          <th>昵称</th>
          <th>亲友圈</th>
          <th>绑定时间</th>
          <th>操作</th>
        </tr>
        <tr v-for="(i,v) of list" :key="v">
          <td>{{ i.uid }}</td>
          <td>{{ i.wx_name }}</td>
          <td>{{ i.name }}</td>
          <td>{{ i.join_time }}</td>
          <td>
            <a @click="see(i)">查看亲友圈</a>
          </td>
        </tr>
      </table>
    </div>

    <div class="botton" @click="nextPage">{{ tip }}</div>
  </div>
</template>

<script>
import { Search } from "vant";
import { Toast } from "vant";

export default {
  data() {
    return {
      tip: "点击加载更多。。。",
      value: "",
      list: [],
      page: {
        pageNum: 1,
        pageSize: 20
      }
    };
  },
  methods: {
    onSearch() {
      this.tip = "点击加载更多。。。";
      this.list = [];
      this.getDataList(1, 20, this.value);
    },
    nextPage() {
      this.page.pageNum++;
      this.getDataList(this.page.pageNum, this.page.pageSize, this.value);
    },
    newBind() {
      this.$router.push("/bindID");
    },
    getDataList(
      pageNum = this.page.pageNum,
      pageSize = this.page.pageSize,
      name
    ) {
      let data = { code: 30125, args: {} };
      data.args.name = name;
      data.args.uid = this.Uid;
      data.args.pageNum = pageNum;
      data.args.pageSize = pageSize;
      this.WS.sendMsg(data).then(res => {
        console.log(res);
        if (res.args.data.length == 0) {
          this.tip = "没有更多了。。。";
          return;
        }
        res.args.data.forEach(ele => {
          this.list.push(ele);
        });
      });
    },
    see(row) {
      this.$router.push({ path: `/memberList`, query: { row: row } });
    }
  },
  mounted() {
    this.getDataList(1, 20);
  }
};
</script>

<style lang="less">
.head {
  form {
    margin-top: 10px;
  }
  margin: 10px;
  top: 0;
}
.tableBox {
  margin: 10px;
  .table {
    width: 100%;
    th {
      width: 20%;
      text-align: center;
      border: 1px solid rgb(225, 225, 225);
      height: 30px;
      line-height: 30px;
    }
    td {
      border: 1px solid rgb(225, 225, 225);
      height: 30px;
      line-height: 30px;
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
</style>