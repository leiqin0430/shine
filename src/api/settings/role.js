import shineHttp from '@/utils/shineHttp'
import HttpConfig from '@/bean/HttpConfig'

const getRoleList = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/role/list',
    method: 'get',
    params: params,
    reminder: false,
    success: fn1,
    error: fn2
  }))
}

export default {
  getRoleList
}
