<template>
  <div class="box">
    <div class="seach">
      <van-field v-model="name" center clearable placeholder="姓名">
        <template #button>
          <van-button size="small" type="primary" @click="search">搜索</van-button>
        </template>
      </van-field>
    </div>
    <div class="title">
      <div style="width: 28%;">
        <span>亲友圈</span>
      </div>
      <div style="width: 23%;">
        <span>申请人</span>
      </div>
      <div style="width: 35%;">
        <span>申请时间</span>
      </div>
      <div style="width: 35%;">
        <span>状态</span>
      </div>
    </div>
    <div class="dispaly" v-for="(i,v) of list" :key="v">
      <van-row gutter="20" type="flex" justify="space-around">
        <van-col span="13">
          <span>{{i.name}}</span>
          <br />
          <span>ID:{{i.familyId}}</span>
        </van-col>
        <van-col span="7">
          <span class="cen">{{i.wx_name}}</span>
        </van-col>
        <van-col span="12">
          <span>{{i.send_time}}</span>
        </van-col>
        <van-col span="15">
          <span v-if="i.state == 1" style="color:green">已同意</span>
          <span v-if="i.state == 2" style="color:red">已拒绝</span>
          <span v-if="i.state == 3">
            <van-button type="primary" size="mini" @click="action(1)">同意</van-button>
            <van-button type="danger" size="mini" @click="action(2)">拒绝</van-button>
          </span>
        </van-col>
      </van-row>
    </div>

    <flush></flush>
  </div>
</template>

<script>
import { Field } from "vant";
import { Button } from "vant";
import flush from "../components/common/flush.vue";

export default {
  data() {
    return {
      name: "",
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  components: {
    flush
  },
  methods: {
    search() {
      this.list = [];
      this.initPage(this.page.pageNum, this.page.pageSize, this.name);
    },
    initPage(pageNum = this.page.pageNum, pageSize = this.page.pageSize, name) {
      let data = {
        code: 30126,
        args: {
          uid: this.Uid,
          pageNum: pageNum,
          pageSize: pageSize
        }
      };
      if (name) {
        data.args.name = name;
      }
      this.WS.sendMsg(data).then(res => {
        console.log(res);
        res.args.data.forEach(ele => {
          this.list.push(ele);
        });
      });
    },
    nextPage() {
      this.page.pageNum++;
      this.initPage(this.page.pageNum, this.page.pageSize, this.name);
    },
    action(state) {
      let data = {
        code: 30103,
        args: {
          uid: this.Uid,
          noticeId: "",
          state: state
        }
      };
      this.WS.sendMsg(data).then(res => {
        console.log(res);
      });
    }
  },
  mounted() {
    this.initPage();
    console.log(this.list);
  }
};
</script>

<style lang="less" scoped>
.box {
  .seach {
    padding: 10px 10px;
  }
  .title {
    display: flex;
    width: 100%;
    height: 4.375rem;
    background-color: rgb(40, 166, 155);
    color: white;
    div {
      text-align: left;
      line-height: 4.375rem;
      padding-left: 1.25rem;
    }
  }
  .dispaly {
    padding: 1.25rem 0;
    border-bottom: 1px solid rgb(225, 225, 225);
  }
}
</style>