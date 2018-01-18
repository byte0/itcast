import Vue from 'vue'
import App from './App'
import router from './router'

// 加载UI组件
import ElementUI from 'element-ui'
// 加载主题
import 'element-ui/lib/theme-chalk/index.css'
// 启用ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局导航过滤(其实就是拦截路由请求)
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('mytoken')
  if (user) {
    // 允许通过，按照正常的逻辑向下跳转
    next()
  } else {
    // 登陆的路由是不需要验证权限的
    if (to.path !== '/login') {
      // 如果没有权限，从新跳转到登录页面
      next({path: '/login'})
    } else {
      // 是登录页，直接跳转到登录页面
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: c => c(App)
})
