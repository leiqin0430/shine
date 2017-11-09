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
      path: '/login', name: 'login', iconCls: 'el-icon-message', component: Login, hidden: true
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/',
      name: 'home',
      iconCls: 'el-icon-menu',
      component: Home,
      children: [
        {path: 'grid', name: 'grid', iconCls: 'el-icon-message', component: grid},
        {path: 'form', name: 'form', iconCls: 'el-icon-setting', component: form}
      ]
    }
  ]
})
