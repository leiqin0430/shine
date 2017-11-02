// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import './styles/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Mock from './mock/index'

Mock.bootstrap()

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  // ...
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
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
  template: '<App/>',
  components: { App }
})
