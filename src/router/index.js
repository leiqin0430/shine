import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/views/Login')
const Err404 = () => import('@/views/Err404')
const Err403 = () => import('@/views/Err403')
// const Home = () => import('@/views/Home')
// const grid = () => import('@/views/tab1/grid')
// const form = () => import('@/views/tab1/form')

const Home = () => import(/* webpackChunkName: "group-foo" */ '@/views/Home')
// const grid = () => import(/* webpackChunkName: "group-foo" */ '@/views/tab1/grid')
const form = () => import(/* webpackChunkName: "group-foo" */ '@/views/tab1/form')

const scss = () => import('@/views/tab2/scss')

const echarts = () => import('@/views/charts/echarts')

const menu = () => import('@/views/settings/menu')
const role = () => import('@/views/settings/role')
const resource = () => import('@/views/settings/resource')
const dict = () => import('@/views/settings/dict')
const dept = () => import('@/views/settings/dept')
const user = () => import('@/views/settings/user')

export default new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    { path: '/403', component: Err403, hidden: true },
    {
      path: '/',
      name: '系统设置',
      iconCls: 'el-icon-menu',
      component: Home,
      groupName: 'settings',
      children: [
        {path: 'menu', name: '菜单管理', iconCls: 'el-icon-message', component: menu, meta: {groupName: 'settings'}},
        {path: 'resource', name: '资源管理', iconCls: 'el-icon-message', component: resource, meta: {groupName: 'settings'}},
        {path: 'role', name: '角色管理', iconCls: 'el-icon-message', component: role, meta: {groupName: 'settings'}},
        {path: 'dept', name: '部门管理', iconCls: 'el-icon-message', component: dept, meta: {groupName: 'settings'}},
        {path: 'user', name: '用户管理', iconCls: 'el-icon-message', component: user, meta: {groupName: 'settings'}},
        {path: 'dict', name: '字典管理', iconCls: 'el-icon-message', component: dict, meta: {groupName: 'settings'}}
      ]
    },
    // {
    //   path: '/',
    //   name: '菜单一',
    //   iconCls: 'el-icon-menu',
    //   component: Home,
    //   groupName: 'processing',
    //   children: [
    //     // {path: 'grid', name: 'Table 表格', iconCls: 'el-icon-message', component: grid},
    //     {path: 'form', name: 'Form 表单', iconCls: 'el-icon-setting', component: form}
    //   ]
    // },
    // {
    //   path: '/',
    //   name: '菜单二',
    //   iconCls: 'el-icon-menu',
    //   component: Home,
    //   groupName: 'processing',
    //   children: [
    //     {path: 'scss', name: 'scss', iconCls: 'el-icon-picture-outline', component: scss}
    //   ]
    // },
    // {
    //   path: '/',
    //   name: 'Charts',
    //   iconCls: 'el-icon-menu',
    //   component: Home,
    //   groupName: 'processing',
    //   children: [
    //     {path: 'echarts', name: 'echarts', iconCls: 'el-icon-picture-outline', component: echarts}
    //   ]
    // },
    {
      path: '/',
      name: '处理中心',
      iconCls: 'el-icon-menu',
      component: Home,
      groupName: 'processing',
      children: [
        {path: 'form', name: 'Form 表单', iconCls: 'el-icon-setting', component: form},
        {path: 'scss', name: 'scss', iconCls: 'el-icon-picture-outline', component: scss},
        {path: 'echarts', name: 'echarts', iconCls: 'el-icon-picture-outline', component: echarts}
      ]
    }
  ]
})
