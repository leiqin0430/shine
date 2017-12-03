import shineHttp from '@/utils/shineHttp'
import HttpConfig from '@/bean/HttpConfig'

const testObj = {k1: 'v1'}
/**
 * 返回当前登录者姓名
 */
const getUserName = function () {
  // return JSON.parse(localStorage.getItem('user')).user.name
  return 'admin'
}
/**
 * 请求系统公共字典
 * @param params
 * @param fn1
 * @param fn2
 * @returns {Promise.<TResult>}
 */
const getDictList = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/dict/list',
    method: 'get',
    params: params,
    reminder: false,
    success: fn1,
    error: fn2
  }))
}

export default {
  testObj,
  getUserName,
  getDictList
}
