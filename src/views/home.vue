<template>
  <div class="member-manage">
    <div class="flex">
      <div>
        <img src="../assets/images/wechat.png" />
        <span>提现微信</span>
      </div>
      <div>
        <span>{{name}}</span>&nbsp;&nbsp;&nbsp;
        <span class="iconfont icon-jiantou mr-1"></span>
      </div>
    </div>
    <!-- <div class="flex">
      <div>
        <img src="../assets/images/nickname.png" />
        <span>微信昵称</span>
      </div>
      <div>
        <span>{{ name }}</span>&nbsp;&nbsp;&nbsp;
        <span class="iconfont icon-jiantou mr-1"></span>
      </div>
    </div> -->
    <div class="flex">
      <div>
        <img src="../assets/images/phone.png" />
        <span>手机号码</span>
      </div>
      <div>
        <span>{{ phone }}</span>&nbsp;&nbsp;&nbsp;
        <span class="iconfont icon-jiantou mr-1"></span>
      </div>
    </div>
    <div class="flex bottom-sty" @click="to('register')">
      <div>
        <img src="../assets/images/password.png" />
        <span>登录密码</span>
      </div>
      <div>
        <span>*******</span>&nbsp;&nbsp;&nbsp;
        <span class="iconfont icon-jiantou mr-1"></span>
      </div>
    </div>
    <van-button type="default" size="large" class="btn" @click="out">
      <img src="../assets/images/logout.png" />
      <span>退出登陆</span>
    </van-button>
    <!-- bottomBar -->
    <bottomBar></bottomBar>
  </div>
</template>

<script>
import bottomBar from "../components/common/bottomBar";
import { Button } from "vant";
export default {
  data() {
    return {
      phone:"",
      name:"",
    };
  },
  components: {
    bottomBar
  },
  beforeMount() {
    const user = JSON.parse(localStorage.getItem("loginInfo"));
    this.phone = user.user.info.phone
    this.name = user.user.info.name
  },
  methods: {
    out() {
      localStorage.removeItem("Uid");
      localStorage.removeItem("loginInfo");
      setTimeout(() => {
        this.$router.push("/login");
      }, 500);
    },
    to(path) {
      this.$router.push({ name: path });
    }
  }
};
</script>

<style lang="less" scoped>
.member-manage {
  // padding: 20px 15px;
  text-align: center;
  padding-top: 20px;
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgb(230, 230, 230);
    color: gray;
    padding: 10px;
    div:first-child {
      display: flex;
      align-items: center;
      color: #000;
      span {
        font-weight: 600;
        margin-left: 15px;
      }
    }
  }
  .bottom-sty {
    border-bottom: 1px solid rgb(230, 230, 230);
  }
  .btn {
    width: 90%;
    padding: 0 0.625rem;
    margin-top: 0.625rem;
    border: 0.0625rem solid black;
    border-radius: 0.625rem;
    color: black;
    img {
      vertical-align: middle;
    }
  }
}
</style>
