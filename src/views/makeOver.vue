<template>
  <div class="box">
    <div>
      <h3>1：玩家ID</h3>
      <van-cell-group>
        <van-field v-model="userId" placeholder="请输入玩家ID" @blur="getUserInfo" />
      </van-cell-group>
    </div>
    <div>
      <h3>2：玩家昵称</h3>
      <van-cell-group>
        <van-field v-model="nickName" placeholder="请输入玩家昵称" readonly />
      </van-cell-group>
    </div>
    <div>
      <h3>3：请选择自己的亲友圈</h3>
      <van-dropdown-menu active-color="green">
        <van-dropdown-item v-model="fraend" :options="columns" />
      </van-dropdown-menu>
    </div>
    <van-button type="primary" class="btn" @click="submit" size="large">确定转让</van-button>
  </div>
</template>

<script>
import { Field } from "vant";
import { DropdownMenu, DropdownItem } from "vant";
import { Toast } from "vant";

export default {
  data() {
    return {
      userId: "",
      nickName: "",
      fraend: 0,
      columns: [],
      showPicker: false
    };
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    submit() {
      if (!this.userId) {
        Toast("请输入玩家ID");
        return;
      }
      if (!this.nickName) {
        Toast("请输入玩家昵称");
        return;
      }
      if (this.fraend == 0) {
        Toast("请选择亲友圈");
        return;
      }
      this.WS.sendMsg({
        code: 30132,
        args: {
          uid: this.Uid,
          playerId: this.userId,
          name: this.nickName,
          familyId: this.fraend
        }
      }).then(res => {
        Toast(res.args.msg);
      });
    },
    initList() {
      this.WS.sendMsg({ code: 30123, args: { uid: this.Uid } }).then(res => {
        res.args.data.forEach(ele => {
          let ar = {
            text: ele.name,
            value: ele.id
          };
          this.columns.push(ar);
        });
      });
    },
    getUserInfo() {
      this.WS.sendMsg({
        code: 30136,
        args: { uid: this.Uid, key: this.userId }
      }).then(res => {
        if (res.args.result == 0 && res.args.data) {
          this.nickName = res.args.data.wx_name;
        } else {
          this.nickName = "查询玩家信息失败，没有这个玩家";
        }
      });
    }
  },
  mounted() {
    this.columns = [];
    this.columns.push({
      text: "请选择自己的亲友圈",
      value: 0
    });
    this.initList();
  }
};
</script>

<style lang="less" scoped>
.box {
  padding: 5px 20px;

  h3 {
    margin-left: 0.3125rem;
  }
  .btn {
    margin-top: 10px;
  }
}
</style>