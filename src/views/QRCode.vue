<template>
  <div class="index">
    <div v-if="show" class="show">
      <img :src="imgUrl" />
    </div>
    <div v-if="!show" class="creat-img" ref="box">
      <img src="../assets/images/shareh5.png" alt="分享背景图" :style="{height:fullHeight + 'px'}" />
      <div
        id="qrcode"
        class="qrcode"
        :style="{left:qrcodeHeight + 'px', bottom:qrcodeBottom + 'px'}"
      ></div>
    </div>
    <flush></flush>
  </div>
</template>

<script>
import flush from "../components/common/flush.vue";
import { qrcanvas } from "qrcanvas";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      show: false,
      imgUrl: "",
      fullHeight: document.documentElement.clientHeight,
      qrcodeSize: document.documentElement.clientWidth / 3,
      qrcodeHeight:
        (document.documentElement.clientWidth -
          document.documentElement.clientWidth / 3) /
        2,
      qrcodeBottom:
        document.documentElement.clientHeight -
        document.documentElement.clientHeight * 3 / 4
    };
  },
  components: {
    flush
  },
  created() {
    let that = this;
    that.$nextTick(function() {
      //生成二维码
      var canvas1 = qrcanvas({
        data: decodeURIComponent("www.baidu.com"),
        size: that.qrcodeSize
      });
      document.getElementById("qrcode").innerHTML = "";
      document.getElementById("qrcode").appendChild(canvas1);

      //合成分享图
      html2canvas(that.$refs.box).then(function(canvas) {
        that.imgUrl = URL.createObjectURL(
          that.base64ToBlob(
            canvas.toDataURL(
              "https://testlewandown-1301954694.cos.ap-chongqing.myqcloud.com/shareh5.png"
            )
          )
        );
        that.$toast({
          message: "正在生成图片",
          position: "middle",
          duration: 3000
        });
        console.log(that.imgUrl);
        that.show = true;
        setTimeout(() => {
          that.$indicator.close();
          that.$toast({
            message: "图片已生成，长按保存分享给你的好友吧",
            position: "middle",
            duration: 3000
          });
        }, 2000);
      });
    });
  },
  methods: {
    //base64转blob
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    }
  },
  beforeMount() {},

  mounted() {},
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.show {
  width: 100%;
  img {
    width: 100%;
  }
}
.creat-img {
  width: 100%;
  img {
    width: 100%;
    z-index: 3;
  }
  .qrcode {
    position: absolute;
    z-index: 5;
  }
}
</style>
