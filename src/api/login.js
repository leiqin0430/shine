import shineHttp from '@/utils/shineHttp'
import HttpConfig from '@/bean/HttpConfig'

export const login = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/log/in',
    method: 'post',
    params: params,
    success: fn1,
    error: fn2
  }))
}

export const logout = (params, fn) => {
  return shineHttp(new HttpConfig({
    url: '/log/out',
    method: 'get',
    params: params,
    success: fn
  }))
}
