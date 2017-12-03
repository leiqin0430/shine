import shineHttp from '@/utils/shineHttp'
import HttpConfig from '@/bean/HttpConfig'

const saveDict = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/dict/persist',
    method: 'post',
    params: params,
    reminder: true,
    success: fn1,
    error: fn2
  }))
}

const delDict = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/dict/clear',
    method: 'delete',
    params: params,
    reminder: true,
    success: fn1,
    error: fn2
  }))
}

export default {
  saveDict,
  delDict
}
