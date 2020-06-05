import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/memberManage',
    name: 'memberManage',
    component: () => import('../views/memberManage.vue'),
    meta:{
      title: '成员管理'
    }
  },
  {
    path: '/relatives',
    name: 'relatives',
    component: () => import('../views/relatives.vue'),
    meta:{
      title: '亲友圈'
    }
  },
  {
    path: '/chargeCard',
    name: 'chargeCard',
    component: () => import('../views/chargeCard.vue'),
    meta:{
      title: '充卡'
    }
  },
  {
    path: '/tableList',
    name: 'tableList',
    component: () => import('../views/tableList.vue'),
    meta:{
      title: '桌子列表'
    }
  },
  {
    path: '/relativesRecord',
    name: 'relativesRecord',
    component: () => import('../views/relativesRecord.vue'),
    meta:{
      title: '亲友圈战绩'
    }
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('../views/chart.vue'),
    meta:{
      title: '收入统计'
    }
  },
  {
    path: '/todayRefall',
    name: 'todayRefall',
    component: () => import('../views/todayRefall.vue'),
    meta:{
      title: '今日充值'
    }
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: () => import('../views/recharge.vue'),
    meta:{
      title: '余额充值'
    }
  },
  {
    path: '/relation',
    name: 'relation',
    component: () => import('../views/relation.vue'),
    meta:{
      title: '关系谱'
    }
  },
  {
    path: '/agentAdd',
    name: 'agentAdd',
    component: () => import('../views/agentAdd.vue'),
    meta:{
      title: '推荐代理'
    }
  },
  {
    path: '/bindID',  
    name: 'bindID',
    component: () => import('../views/bindID.vue'),
    meta:{
      title: '绑定圈主ID'
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
