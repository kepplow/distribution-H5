<template>
  <div class="box">
    <div>
      <div>1、玩家ID</div>
      <van-cell-group>
        <van-field v-model="userId" placeholder="请输入玩家ID" @blur="getUserID" />
      </van-cell-group>
    </div>
    <div>
      <div>2、玩家昵称</div>
      <van-cell-group>
        <van-field v-model="nickName" placeholder="请输入玩家昵称" readonly />
      </van-cell-group>
    </div>
    <div>
      <div>4、房卡数量</div>
      <van-cell-group>
        <van-field v-model="cardNum" placeholder="请输入房卡数量" />
      </van-cell-group>
      <div>
        剩余房卡数:
        <span>323</span>
      </div>
    </div>
    <van-button type="primary" class="btn" @click="submit" size="large">确定</van-button>
  </div>
</template>

<script>
import { Field } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      userId: "",
      nickName: "",
      cardNum: "",
      isExit: 0
    };
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    submit() {
      if (!this.userId) {
        Toast("请输入玩家ID！");
        return;
      }
      if (!this.cardNum) {
        Toast("请输入出售数量！");
        return;
      }
      if (this.isExit == 0) {
        Toast("玩家ID不存在");
        return;
      }
      this.WS.sendMsg({
        code: 40007,
        args: { uid: this.Uid, buyUid: this.userId, num: this.cardNum }
      }).then(res => {
        if (res.args.result == 0) {
          Toast("出售成功！");
        } else {
          Toast("出售失败！");
        }
      });
    },
    getUserID() {
      this.WS.sendMsg({
        code: 30136,
        args: { uid: this.Uid, key: this.userId }
      }).then(res => {
        if (res.args.result == 0 && res.args.data) {
          this.nickName = res.args.data.wx_name;
          this.isExit = 1;
        } else {
          this.nickName = "玩家不存在或玩家还未绑定代理";
          this.isExit = 0;
        }
      });
    }
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
    margin-top: 20px;
  }
}
</style>