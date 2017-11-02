import Vue from 'vue'
import VueRouter from 'vue-router'
// import Hello from '@/components/Hello'
import Login from '@/views/Login'
import Home from '@/views/Home'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
