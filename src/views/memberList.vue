<template>
  <div class="box">
    <div class="cent">
      <van-form validate-first class="list">
        <van-field v-model="name" placeholder="姓名" />
        <van-field v-model="phone" placeholder="手机号" />
        <van-dropdown-menu>
          <van-dropdown-item v-model="fraend" :options="fraendList" />
        </van-dropdown-menu>
        <van-dropdown-menu>
          <van-dropdown-item v-model="gameType" :options="gameTypeList" />
        </van-dropdown-menu>
        <van-cell is-link :title="title" @click="show = true" />
      </van-form>

      <div style="margin: 1rem;">
        <van-button round block type="info" native-type="bottom" @click="searchSubmit">搜索</van-button>
      </div>
    </div>
    <div class="box1">
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
    <div class="table">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>姓名</th>
            <th>总成绩</th>
            <th>耗卡</th>
            <th>疲劳值</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,v) of list" :key="v">
            <td>
              <span>{{i.wx_name}}</span>
              <br />
              <span>ID:{{i.id}}</span>
            </td>
            <td>{{i.warning}}</td>
            <td>{{i.car}}</td>
            <td>{{i.fatigue}}</td>
            <td>{{i.is_lock_show}} （只是亲友圈锁定，可以解锁）、正常、平台封印</td>
            <td>
              <a @click="lockAction(i,v)">加锁（解锁）</a>|
              <a @click="detailed(i)">明细</a>|
              <a @click="setFatigue(i,v)">设置疲劳值</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="botton" @click="next">{{ tip }}</div>
    </div>

    <!-- 弹出层 -->
    <van-popup v-model="deta" class="deta">
      <van-form class="form">
        <van-field v-model="detaData.warning" label="总成绩" readonly />
        <van-field v-model="detaData.round" label="总局数" readonly />
        <van-field v-model="detaData.transport" label="输分" readonly />
        <van-field v-model="detaData.win" label="赢分" readonly />
        <van-field v-model="detaData.hanks" label="总把数" readonly />
        <van-field v-model="detaData.cardratio" label="耗卡" readonly />
        <van-field v-model="detaData.winrate" label="最佳场次" readonly />
      </van-form>
    </van-popup>

    <!-- 弹出层 -->
    <van-popup v-model="Fatigue" class="deta">
      <van-form class="form">
        <van-field v-model="set.fatigue" label="疲劳值:" />
        <van-button round style="width:100%;margin-top:15px" type="primary" @click="confirm">确认</van-button>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { Form } from "vant";
import { Pagination } from "vant";
import { Dialog } from "vant";
import { Toast } from "vant";
import { Popup } from "vant";

export default {
  data() {
    return {
      Fatigue: false,
      set: {
        index: 0,
        id: 0,
        fatigue: 0
      },
      deta: false,
      show: false,
      actions: [
        { name: "默认查询", key: "" },
        { name: "按积分查询", key: "warning" },
        { name: "按房卡消耗查询", key: "car" },
        { name: "按状态查询", key: "is_lock" }
      ],
      title: "请选择搜索方式",
      search: "",
      phone: "",
      name: "",
      gameType: 0,
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
      fraend: 0,
      fraendList: [{ text: "请选择亲友圈", value: 0 }],
      list: [],

      page: {
        pageNum: 1,
        pageSize: 10
      },
      tip: "点击加载更多。。。",
      detaData: {
        warning: "",
        round: "",
        transport: "",
        win: "",
        hanks: "",
        cardratio: "",
        winrate: ""
      }
    };
  },
  methods: {
    onSelect(item) {
      this.show = false;
      if (!item.key) {
        this.title = "请选择搜索方式";
      } else {
        this.title = item.name;
      }
      this.search = item.key;
    },
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
    //搜索
    Submit() {
      let data = { code: 30127, args: {} };
      data.args.uid = this.Uid;
      data.args.type = this.gameType;
      data.args.key = this.name || this.phone || "";
      data.args.familyId = this.fraend == 0 ? "" : this.fraend;
      data.args.field = this.search;
      data.args.desc = "DESC";
      data.args.pageNum = this.page.pageNum;
      data.args.pageSize = this.page.pageSize;

      this.WS.sendMsg(data).then(res => {
        if (res.args.data.length == 0) {
          this.tip = "没有更多了。。。";
          return;
        }
        console.log(res);
        res.args.data.forEach(ele => {
          this.gameTypeList.forEach(e => {
            if (ele.game_type == e.value) {
              ele.game_type = e.text;
            }
          });
          ele.is_lock_show = ele.is_lock == 0 ? "正常" : "锁定";
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
    },
    detailed(row) {
      this.detaData.warning = row.warning;
      this.detaData.round = row.round;
      this.detaData.transport = row.transport;
      this.detaData.win = row.win;
      this.detaData.hanks = row.hanks;
      this.detaData.cardratio = row.cardratio;
      this.detaData.winrate = row.winrate;
      this.deta = true;
    },
    lockAction(row, index) {
      let that = this;
      Dialog.confirm({
        message: row.is_lock == 1 ? "是否解锁" : "是否加锁"
      })
        .then(() => {
          let data = { code: 30130, args: {} };
          data.args.is_lock = row.is_lock == 1 ? "0" : "1";
          data.args.uid = that.Uid.toString();
          data.args.id = row.id.toString();
          console.log(data);
          that.WS.sendMsg(data).then(res => {
            console.log(res);
            if (res.args.result == 0) {
              if (row.is_lock == 1) {
                that.list[index].is_lock = 0;
                that.list[index].is_lock_show = "正常";
              } else {
                that.list[index].is_lock = 1;
                that.list[index].is_lock_show = "锁定";
              }
            }
            Toast(res.args.msg);
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    setFatigue(row, v) {
      this.set.index = v;
      this.set.id = row.id;
      this.Fatigue = true;
    },
    confirm() {
      if (this.set.fatigue > 0) {
        this.set.fatigue = ~this.set.fatigue + 1;
      }
      this.WS.sendMsg({
        code: 30140,
        args: {
          uid: this.Uid,
          id: this.set.id,
          fatigue: this.set.fatigue
        }
      }).then(res => {
        if (res.args.result == 0) {
          this.Fatigue = false;
          this.list[this.set.index].fatigue = this.set.fatigue;
          Toast.success(res.args.msg);
        } else {
          Toast.success("修改失败");
        }
      });
    }
  },
  mounted() {
    this.init();
    this.Submit();
  },
  beforeMount() {
    if (this.$route.query.row) {
      this.fraend = this.$route.query.row.familyId;
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  .cent {
    padding: 0.625rem 0.625rem;

    .list > * {
      border-top: 1px solid rgb(245, 245, 245);
      margin-top: 5px;
    }
  }
  .box1 {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // padding: 0.625rem 1.25rem;
    .van-button {
      margin: 0.625rem 0 !important;
    }
  }
  .table {
    width: 100%;
  }
  .botton {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: rgb(200, 200, 200);
  }
}
.form {
  width: 80%;
  margin: 10px;
  padding-top: 20px;
  background-color: white;
  border-radius: 10px;
}
.deta {
  width: 80%;
  border-radius: 10px;
}
</style>