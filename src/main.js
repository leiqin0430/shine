// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import './styles/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router/index'
import store from './vuex/index'
import 'font-awesome/css/font-awesome.min.css'
// import Mock from './mock/index'
//
// Mock.bootstrap()

Vue.config.productionTip = false

Vue.component('child', {
  // 在 JavaScript 中使用 camelCase
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})

// Vue.use(ElementUI)
Vue.use(ElementUI, { size: 'small' })

router.beforeEach((to, from, next) => {
  // ...
  if (to.path === '/login') {
    // localStorage.removeItem('user')
  }
  // let user = JSON.parse(localStorage.getItem('user'))
  // if (!user && to.path !== '/login') {
  //   next({ path: '/login' })
  // } else {
  next()
  // }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
