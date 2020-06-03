import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

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
    component: () => import(/* webpackChunkName: "memberManage" */ '../views/memberManage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
