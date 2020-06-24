import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: () => import('../views/index.vue'),
  meta: {
    title: '首页'
  }
},
{
  path: '/login',
  name: 'login',
  component: () => import('../views/login.vue'),
  meta: {
    title: '登录'
  }
},
{
  path: '/register',
  name: 'register',
  component: () => import('../views/register.vue'),
  meta: {
    title: '注册'
  }
},
{
  path: '/home',
  name: 'home',
  component: () => import('../views/home.vue'),
  meta: {
    title: '个人中心'
  }
},
{
  path: '/memberManage',
  name: 'memberManage',
  component: () => import('../views/memberManage.vue'),
  meta: {
    title: '成员管理'
  }
},
{
  path: '/relatives',
  name: 'relatives',
  component: () => import('../views/relatives.vue'),
  meta: {
    title: '亲友圈'
  }
},
{
  path: '/chargeCard',
  name: 'chargeCard',
  component: () => import('../views/chargeCard.vue'),
  meta: {
    title: '充卡'
  }
},
{
  path: '/tableList',
  name: 'tableList',
  component: () => import('../views/tableList.vue'),
  meta: {
    title: '桌子列表'
  }
},
{
  path: '/relativesRecord',
  name: 'relativesRecord',
  component: () => import('../views/relativesRecord.vue'),
  meta: {
    title: '亲友圈战绩'
  }
},
{
  path: '/chart',
  name: 'chart',
  component: () => import('../views/chart.vue'),
  meta: {
    title: '收入统计'
  }
},
{
  path: '/todayRefall',
  name: 'todayRefall',
  component: () => import('../views/todayRefall.vue'),
  meta: {
    title: '今日充值'
  }
},
{
  path: '/recharge',
  name: 'recharge',
  component: () => import('../views/recharge.vue'),
  meta: {
    title: '余额充值'
  }
},
{
  path: '/relation',
  name: 'relation',
  component: () => import('../views/relation.vue'),
  meta: {
    title: '关系谱'
  }
},
{
  path: '/agentAdd',
  name: 'agentAdd',
  component: () => import('../views/agentAdd.vue'),
  meta: {
    title: '推荐代理'
  }
},
{
  path: '/bindID',
  name: 'bindID',
  component: () => import('../views/bindID.vue'),
  meta: {
    title: '添加亲友圈列表成员'
  }
},
{
  path: '/bindIDList',
  name: 'bindIDList',
  component: () => import('../views/bindIDList.vue'),
  meta: {
    title: '亲友圈列表'
  }
},
{
  path: '/frienadConsumption',
  name: 'frienadConsumption',
  component: () => import('../views/frienadConsumption.vue'),
  meta: {
    title: '亲友圈消费记录'
  }
},
{
  path: '/apply',
  name: 'apply',
  component: () => import('../views/apply.vue'),
  meta: {
    title: '申请列表'
  }
},
{
  path: '/cardReffRecord',
  name: 'cardReffRecord',
  component: () => import('../views/cardReffRecord.vue'),
  meta: {
    title: '充卡记录'
  }
},
{
  path: '/memberList',
  name: 'memberList',
  component: () => import('../views/memberList.vue'),
  meta: {
    title: '成员列表'
  }
},
{
  path: '/makeOver',
  name: 'makeOver',
  component: () => import('../views/makeOver.vue'),
  meta: {
    title: '转让亲友圈'
  }
},
{
  path: '/rechargeRecord',
  name: 'rechargeRecord',
  component: () => import('../views/rechargeRecord.vue'),
  meta: {
    title: '充值记录'
  }
},
{
  path: '/partnerRecord',
  name: 'partnerRecord',
  component: () => import('../views/partnerRecord.vue'),
  meta: {
    title: '合伙人充值记录'
  }
},
{
  path: '/fatigue',
  name: 'fatigue',
  component: () => import('../views/fatigue.vue'),
  meta: {
    title: '疲劳管理'
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
