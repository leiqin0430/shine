import shineHttp from '@/utils/shineHttp'
import HttpConfig from '@/bean/HttpConfig'

export const login = (params, fn) => {
  return shineHttp(new HttpConfig({
    url: '/log/in',
    method: 'post',
    params: params,
    success: fn
  }))
}
