import Vue from 'vue'
import VueRouter from 'vue-router'
// import { message } from '@/utils/message.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: () => import(/* webpackChunkName: "index" */ '../views/Home.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/index',
        component: () => import(/* webpackChunkName: "company" */ '../views/Company.vue'),
        meta: {
          title: '公司信息'
        }
      },
      {
        path: '/staff',
        component: () => import(/* webpackChunkName: "staff" */ '../views/Staff.vue'),
        meta: {
          title: '员工管理'
        }
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '*',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "login" */ '../views/NotFound.vue'),
    meta: {
      title: '找不到呀'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//设置html的title
router.beforeEach( (to, from, next) => {
  window.document.title = to.meta.title
  next()
})

//路由守卫
router.beforeEach( (to, from, next) => {
  const token = window.localStorage.wulianarashi ? true : false
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    if (token) {
      next()
    } else {
      next('/login')
      message('请登录后操作', 'warning')
    }
  }
})

export default router
