import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.config.productionTip = false

// 全局路由钩子
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  console.log('路由钩子')
  console.log(to)
  console.log(from)
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
