<template>
  <div class="box">
    <div class="cent">
      <van-form validate-first class="list">
        <van-dropdown-menu>
          <van-dropdown-item v-model="fraend" :options="fraendList" />
        </van-dropdown-menu>

        <input class="form-control mx-1 inp" placeholder="选择时间" id="start" :model="queryinfo.time" />
      </van-form>
      <div style="margin: 1rem;">
        <van-button round block type="info" native-type="bottom" @click="searchSubmit">搜索</van-button>
      </div>
    </div>
    <div class="table">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>亲友圈</th>
            <th>游戏名</th>
            <th>消费卡数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,v) of list" :key="v">
            <td>{{i.name}}</td>
            <td>{{ i.game}}</td>
            <td>{{i.cost}}</td>
          </tr>
        </tbody>
      </table>
      <div class="botton" @click="next">{{ tip }}</div>
    </div>

    <flush></flush>
  </div>
</template>

<script>
import { DatetimePicker } from "vant";
import laydate from "../../public/laydate/laydate";
import flush from "../components/common/flush.vue";

export default {
  data() {
    return {
      tip: "点击加载更多。。。",
      fraend: 0,
      fraendList: [{ text: "请选择亲友圈", value: 0 }],
      list: [],
      queryinfo: {
        time: ""
      },
      gameTypeList: [
        { text: "请选择游戏", value: 0 },
        { text: "麻将", value: 1 },
        { text: "斗地主", value: 2 },
        { text: "象棋", value: 3 },
        { text: "拼三张", value: 4 },
        { text: "拼十", value: 5 },
        { text: "龙虎斗", value: 6 },
        { text: "跑得快", value: 7 },
        { text: "血战麻将", value: 8 },
        { text: "百人牛牛", value: 9 },
        { text: "2人幺地人", value: 10 },
        { text: "3人幺地人", value: 11 }
      ],
      page: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  components: {
    flush
  },
  methods: {
    init() {
      this.WS.sendMsg({ code: 30123, args: { uid: this.Uid } }).then(res => {
        res.args.data.forEach(ele => {
          let ar = {
            text: ele.name,
            value: ele.id
          };
          this.fraendList.push(ar);
        });
      });
    },
    Submit() {
      let prams = { code: 30137, args: { uid: this.Uid } };
      prams.args.time = this.queryinfo.time;
      prams.args.familyId = this.fraend;
      prams.args.pageNum = this.page.pageNum;
      prams.args.pageSize = this.page.pageSize;
      console.log(prams);
      this.WS.sendMsg(prams).then(res => {
        if (res.args.data.length == 0) {
          this.tip = "没有更多了。。。";
          return;
        }
        res.args.data.forEach(ele => {
          this.gameTypeList.forEach(e => {
            if (ele.game_type == e.value) {
              ele.game = e.text;
            }
          });
          this.list.push(ele);
        });
      });
    },
    next() {
      this.page.pageNum++;
      this.Submit();
    },
    searchSubmit() {
      this.tip = "点击加载更多。。。";
      this.list = [];
      this.page.pageNum = 1;
      this.Submit();
    }
  },
  mounted() {
    let that = this;
    laydate.render({
      elem: "#start", //指定元素
      type: "date",
      done: function(value, date, endDate) {
        that.queryinfo.time = value;
      }
    });
  },
  beforeMount() {
    this.init();
    this.Submit();
  }
};
</script>

<style lang="less" scoped>
.cent {
  margin: 10px;
}
.inp {
  width: 100%;
  margin: 0;
  padding: 0;
  margin-top: 10px;
  text-indent: 10px;
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