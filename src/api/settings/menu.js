import shineHttp from '@/utils/shineHttp'
import HttpConfig from '@/bean/HttpConfig'

const getMenuList = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/menu/list',
    method: 'get',
    params: params,
    reminder: false,
    success: fn1,
    error: fn2
  }))
}

const saveMenu = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/menu/persist',
    method: 'post',
    params: params,
    reminder: true,
    success: fn1,
    error: fn2
  }))
}

const delMenu = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/menu/del',
    method: 'delete',
    params: params,
    reminder: true,
    success: fn1,
    error: fn2
  }))
}

export default {
  getMenuList,
  saveMenu,
  delMenu
}
