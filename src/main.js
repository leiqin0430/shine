// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import './styles/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router/index'
import store from './vuex/index'
// import Mock from './mock/index'
//
// Mock.bootstrap()

Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  console.log(err + 'errorHandler')
}

// Vue.use(ElementUI)
Vue.use(ElementUI, { size: 'small' })

router.beforeEach((to, from, next) => {
  // ...
  if (to.path === '/login') {
    localStorage.removeItem('user')
  }
  let user = JSON.parse(localStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
