<template>
  <div>
    <div class="flex justify-around mt-1">
      <input class="form-control mx-1" type="text" placeholder="开始时间" id="startTime" v-model="startTime" />
      <input class="form-control mx-1" type="text" placeholder="结束时间" id="endTime" v-model="endTime" />
    </div>

    <div class="flex m-1">
      <input type="text" class="form-control" placeholder="姓名" />
      <button type="button" class="btn btn-default btn-xs px-2 ml-2">搜索</button>
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
        <div class="flex align-center justify-between">
          <div class="flex flex-column align-center">
            <span class="m-1">王五</span>
            <span>6</span>
          </div>
          <span
            @click="detail"
            style="width:20px; border-radius: 5px;"
            class="text-white bg-main text-align-center"
          >详细</span>
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
        <div class="flex align-center justify-between">
          <div class="flex flex-column align-center">
            <span class="m-1">王五</span>
            <span>6</span>
          </div>
          <span
            @click="detail"
            style="width:20px; border-radius: 5px;"
            class="text-white bg-main text-align-center"
          >详细</span>
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
import laydate from "../../public/laydate/laydate";

export default {
  data() {
    return {
      showDialog: false,
      name: "",
      startTime: "",
      endTime: "",
      showStartTime: false,
      showEndTime: false
    };
  },
  methods: {
    onSearch() {},
    detail() {
      this.showDialog = true;
    }
  },
  mounted() {
    laydate.render({
      elem: "#startTime", //指定元素
      type: "datetime"
    });
    laydate.render({
      elem: "#endTime", //指定元素
      type: "datetime"
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