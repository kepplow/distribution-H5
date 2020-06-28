<template>
  <div id="Box">
    <div class="title">1、玩家ID</div>
    <div>
      <van-cell-group>
        <van-field v-model="userID" placeholder="请输入玩家ID" />
      </van-cell-group>
      <div class="zhuyi">注：玩家与您绑定关系时，无法推荐其成为代理</div>
    </div>
    <div class="title">2、核对信息</div>
    <van-cell-group>
      <van-field v-model="nickname" label="昵称：" />
    </van-cell-group>
    <van-button type="primary" class="btn" @click="submit" size="large">确定</van-button>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      userID: "",
      nickname: ""
    };
  },
  mounted() {},
  methods: {
    submit() {
      if (this.userID == "") {
        return;
      }
      this.WS.sendMsg({
        code: 40001,
        args: {
          uid: this.Uid,
          reUid: this.userID
        }
      }).then(res => {
        let tip =  res.args.result == 0 ? "成功" : "失败";
        Toast("推荐" + tip);
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