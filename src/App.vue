<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import "./assets/css/iconfont.css";
@import "./assets/css/global.css";
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body {
  margin: 0;
  padding: 0;
  background: rgb(245, 245, 245);
}
</style>
