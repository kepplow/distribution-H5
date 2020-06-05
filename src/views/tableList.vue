<template>
  <div class>
    <div class="my-1 flex align-center" v-if="!show">
      <van-field v-model="sms" center clearable placeholder="请输入亲友圈名">
        <template #button>
          <van-button size="small" type="primary">搜索</van-button>
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
        <tr>
          <td>名字1</td>
          <td>要的人</td>
          <td>123</td>
          <td>
            <span class="text-primary" @click="detail">查看</span>
          </td>
        </tr>
        <tr>
          <td>名字1</td>
          <td>要的人</td>
          <td>123</td>
          <td>
            <span class="text-primary" @click="detail">查看</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="show">
      <div class="bg-white-second-1">
        <span class="p-1 font-lg" @click="show=false">&lt;</span>
      </div>

      <div class="item">
        <div class="flex justify-around align-center border font-md mt-2 py-1">
          <span>2020-05-20 12:21:22</span>
          <span>5局</span>
          <span>
            房间号：
            <span>263134</span>
          </span>
        </div>
        <div class="flex justify-around align-center">
          <div class="flex flex-column align-center">
            <span class="m-1">张三</span>
            <span>6</span>
          </div>
          <div class="flex flex-column align-center">
            <span class="m-1">李四</span>
            <span>6</span>
          </div>
          <div class="flex flex-column align-center">
            <span class="m-1">王五</span>
            <span>6</span>
          </div>
        </div>
        <div class="bg-gray flex justify-end">
          <div>
            所属亲友圈：
            <span>XXXX</span>
            ( ID:
            <span>XXXX</span>
            )
          </div>
        </div>
      </div>

      <div class="item">
        <div class="flex justify-around align-center border font-md mt-2 py-1">
          <span>2020-05-20 12:21:22</span>
          <span>5局</span>
          <span>
            房间号：
            <span>263134</span>
          </span>
        </div>
        <div class="flex justify-around align-center">
          <div class="flex flex-column align-center">
            <span class="m-1">张三</span>
            <span>6</span>
          </div>
          <div class="flex flex-column align-center">
            <span class="m-1">李四</span>
            <span>6</span>
          </div>
          <div class="flex flex-column align-center">
            <span class="m-1">王五</span>
            <span>6</span>
          </div>
        </div>
        <div class="bg-gray flex justify-end">
          <div>
            所属亲友圈：
            <span>XXXX</span>
            ( ID:
            <span>XXXX</span>
            )
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sms: "",
      show: false
    };
  },
  methods: {
    detail() {
      this.show = true;
    }
  }
};
</script>

<style>
</style>