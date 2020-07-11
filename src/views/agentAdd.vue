<template>
  <div id="Box">
    <div class="title">1、玩家ID</div>
    <div>
      <van-cell-group>
        <van-field v-model="userID" placeholder="请输入玩家ID" @blur="getName" />
      </van-cell-group>
      <div class="zhuyi">注：玩家与您绑定关系时，无法推荐其成为代理</div>
    </div>
    <div class="title">2、核对信息</div>
    <van-cell-group>
      <van-field v-model="nickname" label="昵称：" readonly/>
    </van-cell-group>
    <van-button type="primary" class="btn" @click="submit" size="large">确定</van-button>

    <flush></flush>
  </div>
</template>

<script>
import { Toast } from "vant";
import flush from "../components/common/flush.vue";

export default {
  data() {
    return {
      userID: "",
      nickname: "",
      isExit: 0
    };
  },
  mounted() {},
  components: {
    flush
  },
  methods: {
    submit() {
      if (this.userID == "") {
        return;
      }
      if (this.isExit == 0) {
        Toast("玩家ID不存在");
        return;
      }
      this.WS.sendMsg({
        code: 40001,
        args: {
          uid: this.Uid,
          reUid: this.userID
        }
      }).then(res => {
        let tip = res.args.result == 0 ? "成功" : "失败";
        Toast("推荐" + tip);
      });
    },
    getName() {
      this.WS.sendMsg({
        code: 30136,
        args: { uid: this.Uid, key: this.userID }
      }).then(res => {
        console.log(res);

        if (res.args.result == 0 && res.args.data) {
          this.nickname = res.args.data.wx_name;
          this.isExit = 1;
        } else {
          this.nickname = "玩家不存在或玩家还未绑定代理";
          this.isExit = 0;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#Box {
  padding: 15px;
  .title {
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(243, 243, 243);
  }
  .van-cell {
    padding: 10px 0;
    border: 0;
    border-bottom: 1px solid rgb(243, 243, 243);
  }
  .zhuyi {
    color: grey;
    margin: 5px 0;
  }
  /deep/.van-field__label {
    width: 50px !important;
  }
  .btn {
    margin-top: 15px;
  }
}
</style>