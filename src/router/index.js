import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/memberManage',
    name: 'memberManage',
    component: () => import(/* webpackChunkName: "memberManage" */ '../views/memberManage.vue'),
    meta:{
      title: '成员管理'
    }
  },
  {
    path: '/todayRefall',
    name: 'todayRefall',
    component: () => import(/* webpackChunkName: "memberManage" */ '../views/todayRefall.vue'),
    meta:{
      title: '今日充值'
    }
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: () => import(/* webpackChunkName: "memberManage" */ '../views/recharge.vue'),
    meta:{
      title: '余额充值'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
