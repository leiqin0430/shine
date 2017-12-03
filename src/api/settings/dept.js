import shineHttp from '@/utils/shineHttp'
import HttpConfig from '@/bean/HttpConfig'

const getDeptList = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/dept/list',
    method: 'get',
    params: params,
    reminder: false,
    success: fn1,
    error: fn2
  }))
}

const saveDept = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/dept/persist',
    method: 'post',
    params: params,
    reminder: true,
    success: fn1,
    error: fn2
  }))
}

const delDept = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/dept/clear',
    method: 'delete',
    params: params,
    reminder: true,
    success: fn1,
    error: fn2
  }))
}

export default {
  getDeptList,
  saveDept,
  delDept
}
