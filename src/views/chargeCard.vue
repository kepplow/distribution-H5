<template>
  <div class="box">
    <div>
      <div>1、玩家ID</div>
      <van-cell-group>
        <van-field v-model="value" placeholder="请输入玩家ID" />
      </van-cell-group>
    </div>
    <div>
      <div>2、玩家昵称</div>
      <van-cell-group>
        <van-field v-model="value" placeholder="请输入玩家昵称" />
      </van-cell-group>
    </div>
    <div>
      <div>3、请选择自己的亲友圈</div>
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        placeholder="请选择自己的亲友圈"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </div>
    <div>
      <div>4、房卡数量</div>
      <van-cell-group>
        <van-field v-model="value" placeholder="请输入房卡数量" />
      </van-cell-group>
      <div>剩余房卡数: <span>323</span></div>
    </div>
    <van-button type="primary" class="btn" @click="submit" size="large">确定</van-button>
  </div>
</template>

<script>
import { Field } from "vant";
export default {
  data() {
    return {
      value: "",
      columns: ["亲友圈1", "亲友圈2", "亲友圈3", "亲友圈4", "亲友圈5"],
      showPicker: false
    };
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    submit(){

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