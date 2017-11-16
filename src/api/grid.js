import shineHttp from '@/utils/shineHttp'
import HttpConfig from '@/bean/HttpConfig'

export const getBorrowList = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/mrBorrow/list',
    method: 'get',
    params: params,
    reminder: false,
    success: fn1,
    error: fn2
  }))
}
