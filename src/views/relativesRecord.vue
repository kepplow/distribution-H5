<template>
  <div>
    <div class="flex m-1">
      <select class="form-control" title="亲友圈" v-model="familyId">
        <option value>所有</option>
        <option v-for="(item, index) in memberList" :key="index" :value="item.id">{{item.name}}</option>
      </select>

      <select class="form-control" placeholder="亲友圈" v-model="type">
        <option value>所有</option>
        <option v-for="(value, key) in types" :key="key" :value="key">{{value}}</option>
      </select>
    </div>
    <div class="flex m-1">
      <input type="text" class="form-control mr-1" placeholder="输入" v-model="searchKey" />
      <button type="button" class="btn btn-default btn-xs px-2 ml-2" @click="getData">搜索</button>
    </div>

    <div class="item" v-for="(item,index) in list" :key="index">
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
          @click="detail"
          style="width:20px; border-radius: 5px;"
          class="text-white bg-main text-align-center"
        >详细</span>
      </div>
      <div class="bg-gray flex justify-end">
        <div>
          <span class="mr-1">{{types[item.type]}}</span>
          所属亲友圈：
          <span>{{item.name}}</span>
          ( ID:
          <span>{{item.familyId}}</span>
          )
        </div>
      </div>
    </div>
    <div class="flex my-2 justify-center align-center btn-link" @click="more">查看更多</div>
    <!-- 弹出层 -->
    <van-dialog v-model="showDialog" title="对局详情" show-cancel-button>
      <table class="table table-bordered">
        <thead>
          <tr>
            <td>局数</td>
            <td>张三</td>
            <td>李四</td>
            <td>王五</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>-6</td>
            <td>12</td>
            <td>-6</td>
          </tr>
          <tr>
            <td>2</td>
            <td>-6</td>
            <td>12</td>
            <td>-6</td>
          </tr>
          <tr>
            <td>3</td>
            <td>-6</td>
            <td>12</td>
            <td>-6</td>
          </tr>
          <tr>
            <td>4</td>
            <td>-6</td>
            <td>12</td>
            <td>-6</td>
          </tr>
          <tr>
            <td>5</td>
            <td>-6</td>
            <td>12</td>
            <td>-6</td>
          </tr>
        </tbody>
      </table>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      searchKey: "",
      type: "",
      familyId: "",
      showDialog: false,
      name: "",
      startTime: "",
      endTime: "",
      showStartTime: false,
      showEndTime: false,
      memberList: [],
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
      list: []
    };
  },
  methods: {
    more() {
      this.currentPage = this.currentPage + 1;
      this.getData();
    },
    getData() {
      this.WS.sendMsg({
        code: 30131,
        args: {
          uid: this.Uid,
          key: this.searchKey,
          type: this.type,
          familyId: this.familyId,
          pageNum: 1,
          pageSize: 10 * this.currentPage
        }
      }).then(res => {
        console.log(222, res);
        if (res.args && res.args.data) {
          this.currentPage = res.args.currentPage;
          this.list = res.args.data;
        }
      });
    },
    onSearch() {},
    detail() {
      this.showDialog = true;
    }
  },
  mounted() {
    this.getData();
    this.WS.sendMsg({
      code: 30123,
      args: { uid: this.Uid, key: "" }
    }).then(res => {
      console.log(111, res);
      if (res.args && res.args.data) {
        this.memberList = res.args.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.picker {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 20;
}
</style>