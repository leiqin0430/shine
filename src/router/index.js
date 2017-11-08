import Vue from 'vue'
import VueRouter from 'vue-router'
// import Hello from '@/components/Hello'
import Login from '@/views/Login'
import Home from '@/views/Home'
import grid from '@/views/tab1/grid'
import form from '@/views/tab1/form'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/login', name: 'login', component: Login
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {path: 'grid', component: grid},
        {path: 'form', component: form}
      ]
    }
  ]
})
