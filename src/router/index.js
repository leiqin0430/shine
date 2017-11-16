import Vue from 'vue'
import VueRouter from 'vue-router'
// import Hello from '@/components/Hello'
// import Login from '@/views/Login'
// import Err404 from '@/views/Err404'
// import Home from '@/views/Home'
// import grid from '@/views/tab1/grid'
// import form from '@/views/tab1/form'

Vue.use(VueRouter)

const Login = () => import('@/views/Login')
const Err404 = () => import('@/views/Err404')
const Home = () => import('@/views/Home')
const grid = () => import('@/views/tab1/grid')
const form = () => import('@/views/tab1/form')

export default new VueRouter({
  routes: [
    { path: '/login', name: 'login', iconCls: 'el-icon-message', component: Login, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    {
      path: '/',
      name: '菜单一',
      iconCls: 'el-icon-menu',
      component: Home,
      children: [
        {path: 'grid', name: 'Table 表格', iconCls: 'el-icon-message', component: grid},
        {path: 'form', name: 'Form 表单', iconCls: 'el-icon-setting', component: form}
      ]
    }
  ]
})
