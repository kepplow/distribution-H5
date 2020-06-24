<template>
  <div class="box">
    <div class="table">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>亲友圈</th>
            <th>耗卡比</th>
            <th>最佳场次线</th>
            <th>游戏</th>
            <th>输分警告</th>
            <th>时间警告</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,v) of list" :key="v">
            <td>
              {{i.name}}
              <br />
              ID:{{i.id}}
            </td>
            <td>{{i.cardratio}}</td>
            <td>{{i.fraction}}</td>
            <td>{{i.game}}</td>
            <td>{{i.warning}}</td>
            <td>{{i.time}}</td>
            <td>
              <a @click="action(i)">操作</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 弹出层 -->
    <van-overlay :show="show">
      <van-form class="form">
        <van-field v-model="form.time" name="时间警告" label="时间警告" placeholder="时间警告" />
        <h5 style="color:rgb(200,200,200);margin-left:20px">提示：超过多少时间会锁定。设置为0代表没有警告,默认为0</h5>
        <van-field v-model="form.cardratio" name="耗卡比" label="耗卡比" placeholder="耗卡比" />
        <van-field v-model="form.fraction" name="最佳场次统计线" label="最佳场次统计线" placeholder="最佳场次统计线" />
        <van-field v-model="form.warning" name="输分警告值" label="输分警告值" placeholder="输分警告值" />
        <div class="btndiv">
          <van-button color="#7232dd" plain @click="actionSubmit">提交</van-button>
          <van-button color="orange" plain @click="show = false">取消</van-button>
        </div>
      </van-form>
    </van-overlay>
  </div>
</template>

<script>
import { DatetimePicker } from "vant";
import { Toast } from 'vant';

export default {
  data() {
    return {
      form: {
        id:"",
        time: "", //时间警告值
        cardratio: "", //:耗卡比
        fraction: "", //最佳场次线
        warning: "" //输分警告值
      },
      show: false,
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
  methods: {
    Submit() {
      let prams = { code: 30121, args: { uid: this.Uid } };
      let that = this;
      this.WS.bind(30123, res => {
        console.log(res);
        res.args.data.forEach(ele => {
          that.gameTypeList.forEach(e => {
            if (ele.type == e.value) {
              ele.game = e.text;
            }
          });
          that.list.push(ele);
        });
      });
      this.WS.sendMsg(prams);
    },
    action(row) {
      this.form.id = row.id;
      this.form.time = "";
      this.form.cardratio = "";
      this.form.fraction = "";
      this.form.warning = "";
      this.show = true;
    },
    actionSubmit() {
      if (!this.form.time) {
        this.form.time = 0;
      }
      if (!this.form.cardratio) {
        Toast('请填写耗卡比');
        return;
      }
      if (!this.form.fraction) {
        Toast('请填写最佳场次统计线');
        return;
      }
      if (!this.form.warning) {
        Toast('请填写输分警告值');
        return;
      }
      let data = {code:30122,args: { uid: this.Uid }}
      data.args.id = this.form.id
      data.args.time = this.form.time
      data.args.warning = this.form.warning
      data.args.cardratio = this.form.cardratio
      data.args.fraction = this.form.fraction
      this.WS.sendMsg(data).then(res => {
        Toast(res.args.msg);
        this.show = false;
      })
    }
  },
  mounted() {},
  beforeMount() {
    this.Submit();
  }
};
</script>

<style lang="less" scoped>
.form {
  margin: 10px;
  padding-top: 20px;
  background-color: white;
  border-radius: 10px;
  margin-top: 100px;
}
.btndiv {
  text-align: center;
  button {
    margin-left: 50px;
    margin: 10px;
    border-radius: 10px;
    width: 30%;
  }
}
</style>