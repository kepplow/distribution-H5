<template>
  <div class>
    <div class="my-1 flex align-center" v-if="!show">
      <van-field v-model="sms" center clearable placeholder="请输入亲友圈名">
        <template #button>
          <van-button size="small" type="primary" @click="search">搜索</van-button>
        </template>
      </van-field>
    </div>

    <table class="table table-bordered" v-if="!show">
      <thead>
        <tr>
          <td>亲友圈</td>
          <td>游戏名</td>
          <td>桌数</td>
          <td>详细</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in tableList" :key="index">
          <td>{{item.name}}</td>
          <td>{{types[item.type]}}</td>
          <td>{{item.num}}</td>
          <td>
            <span class="text-primary" @click="detail(item)">查看</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!show" class="flex justify-center align-center btn-link" @click="more">查看更多</div>

    <div v-if="show">
      <div class="item" v-for="(item,index) in roomList" :key="index">
        <div class="flex justify-around align-center border font-md mt-2 py-1">
          <span>{{item.create_time}}</span>
          <span>{{item.round}}局</span>
          <span>
            房间号：
            <span>{{item.room_number}}</span>
          </span>
        </div>
        <div class="flex justify-around align-center">
          <div class="flex flex-column align-center" v-for="(v,i) in item.rets" :key="i">
            <span class="m-1">{{v.name}}</span>
            <span>{{v.score}}</span>
          </div>
          <span
            @click="toApp"
            style="width:20px; border-radius: 5px;"
            class="text-white bg-main text-align-center"
          >详细</span>
        </div>
        <div class="bg-gray flex justify-end">
          <div>
            所属亲友圈：
            <span>{{target.name}}</span>
            ( ID:
            <span>{{target.id}}</span>
            )
          </div>
        </div>
      </div>
    </div>
    <flush></flush>
  </div>
</template>

<script>
import flush from "../components/common/flush.vue";

export default {
  data() {
    return {
      target: {},
      roomList: [],
      tableList: [],
      sms: "",
      show: false,
      types: {
        1: "麻将",
        2: "斗地主",
        3: "象棋",
        4: "拼三张",
        5: "拼十",
        6: "龙虎斗",
        7: "跑得快",
        8: "血战麻将",
        9: "百人牛牛",
        10: "2人幺地人",
        11: "3人幺地人"
      },
      currentPage: 1
    };
  },
  components: {
    flush
  },
  methods: {
    toApp () {
      console.log('toApp')
    },
    search() {
      this.currentPage = 1;
      this.getData();
    },
    more() {
      this.currentPage = this.currentPage + 1;
      this.getData();
    },
    detail(item) {
      this.target = item;
      this.WS.sendMsg({
        code: 30129,
        args: {
          uid: this.Uid,
          type: item.type,
          familyId: item.id,
          pageNum: 1,
          pageSize: item.num // 有多少桌就显示多少条
        }
      }).then(res => {
        console.log(222, res);
        if (res.args && res.args.data) {
          this.roomList = res.args.data;
          this.show = true;
        }
      });
    },
    getData() {
      this.WS.sendMsg({
        code: 30128,
        args: {
          uid: this.Uid,
          key: this.sms,
          pageNum: 1,
          pageSize: 10 * this.currentPage
        }
      }).then(res => {
        if (res.args && res.args.data) {
          this.currentPage = res.args.currentPage;
          this.tableList = res.args.data;
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
</style>