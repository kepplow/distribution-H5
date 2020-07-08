<template>
  <div class="box">
    <div class="seach">
      <van-field
        readonly
        clickable
        name="time"
        :value="seach.starttime"
        label="开始时间"
        placeholder="点击选择时间"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="datetime"
          v-model="currentDate"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="time"
        :value="seach.endtime"
        label="结束时间"
        placeholder="点击选择时间"
        @click="showPicker1 = true"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-datetime-picker
          type="datetime"
          v-model="currentDate"
          @confirm="onConfirm1"
          @cancel="showPicker1 = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="picker"
        :value="showLevel"
        label="等级"
        placeholder="请选择等级"
        @click="showPicker2 = true"
      />
      <van-popup v-model="showPicker2" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm3"
          @cancel="showPicker2 = false"
        />
      </van-popup>
      <van-button type="primary" style="width:100%;margin-top:10px" @click="onChange">搜索</van-button>
    </div>
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
          <span>充值总额</span>
        </div>
        <div>
          <span>收益</span>
        </div>
      </div>
      <div class="dispaly" v-for="(i,v) of list" :key="v">
        <van-row gutter="20" type="flex" justify="space-around">
          <van-col span="6">
            <span>{{i.time}}</span>
          </van-col>
          <van-col span="6">
            <span>{{i.wx_name}}</span>
          </van-col>
          <van-col span="8">
            <span class="cen">{{i.guanXi}}</span>
          </van-col>
          <van-col span="6">
            <span>{{i.pay}}</span>
          </van-col>
          <van-col span="6">
            <span>{{i.money}}</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 底部展示栏 -->
    <div class="footer-y"></div>
    <div class="footer">
      <div>总金额: {{ rNum }}元</div>
      <div>总笔数：{{ allMoney }}</div>
      <div>总收益：{{ rebate }}</div>
    </div>
  </div>
</template>

<script>
import { Pagination } from "vant";
import { DatetimePicker } from "vant";

export default {
  data() {
    return {
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date(),
      showPicker: false,
      showPicker1: false,
      showPicker2: false,
      columns: [
        "全部",
        "一级代理",
        "直属玩家",
        "二级代理",
        "二级玩家",
        "三级代理",
        "三级玩家"
      ],
      levelMap: [
        [0, 0],
        [1, 1],
        [1, 0],
        [2, 1],
        [2, 0],
        [3, 1],
        [3, 0]
      ],
      showLevel: "全部",
      seach: {
        starttime: "",
        endtime: "",
        findType: 0,
        agentLevel: 0
      },

      rNum: 0,
      allMoney: 0,
      rebate: 0,
      list: [],
      page: {
        pageNum: 1
      }
    };
  },
  methods: {
    onConfirm(time) {
      this.seach.starttime = this.dateFormat("YYYY-mm-dd HH:MM", time);
      this.showPicker = false;
    },
    onConfirm1(time) {
      this.seach.endtime = this.dateFormat("YYYY-mm-dd HH:MM", time);
      this.showPicker1 = false;
    },
    onConfirm3(value) {
      let index = this.columns.map(item => item).indexOf(value);
      this.seach.findType = this.levelMap[index][0];
      this.seach.agentLevel = this.levelMap[index][0];
      this.showLevel = value;
      this.showPicker2 = false;
    },
    toIndexPage() {
      this.$router.go(-1);
    },
    init() {
      let data = {}
      data.startTime = this.seach.starttime + ":00";
      data.endTime = this.seach.endtime + ":59";
      data.findType = this.seach.findType;
      data.agentLevel = this.seach.agentLevel;;
      data.uid = this.Uid;
      // data.uid = 100008;
      this.WS.sendMsg({
        code: 40013,
        args: data
      }).then(res => {
        console.log(res);
        if (res.args.result != 0) {
          return;
        }
        this.rNum = res.args.rNum;
        this.allMoney = res.args.allMoney;
        this.rebate = res.args.rebate;
        res.args.recharge.forEach(v => {
          this.list.push(v);
        });
      });
    },
    onChange() {
      this.list = [];
      this.init();
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    }
  },
  beforeMount() {
    this.seach.endtime = this.dateFormat("YYYY-mm-dd HH:MM", new Date());
    this.seach.starttime = this.dateFormat("YYYY-mm-dd HH:MM", new Date());
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
  background-color: white;
  font-size: 18px;
  width: 40%;
  height: 50px;
  padding-left: 10px;
  line-height: 50px;
  color: black;
}
.seach {
  padding: 10px;
  border-radius: 30px;
}
</style>