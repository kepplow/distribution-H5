<template>
  <div class="index">
      <div class="box">
          {{ content }}
      </div>

    <flush></flush>
  </div>
</template>

<script>
import flush from "../components/common/flush.vue";

export default {
  data() {
    return {
        content:""
    };
  },
  components: {
    flush
  },
  methods: {
      init(){
          this.content = "你好!";
      }
  },
  beforeMount() {},
  mounted() {
      this.init();
  }
};
</script>

<style lang="less" scoped>
.box{
    width: 100%;
    height: auto;
    padding: 10px;
}
</style>
