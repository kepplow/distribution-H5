import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import WS from "../public/websocket/WBT";
import 'animate.css';

Vue.use(Vant);
Vue.config.productionTip = false

Vue.prototype.WS = new WS({
  // ip: 'ws://27.50.169.38:7008'
  ip: 'ws://47.105.60.123:7008'
});
// Vue.prototype.WS = new WebSocket('ws://47.105.60.123:7008', "default-protocol");

// 全局路由钩子
router.beforeEach((to, from, next) => {
  let uid = localStorage.getItem("Uid");
  // 设置页面标题
  document.title = to.meta.title;
  // 未登录去登录页
  if ((!uid || uid === 'undefined') && ['/login', '/register','/editPwd'].indexOf(to.path) === -1) {
    localStorage.removeItem("Uid");
    document.title = '登录';
    next('/login');
  } else {
    // 已登录记录uid
    Vue.prototype.Uid = uid;
    next()
  }
  // next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
