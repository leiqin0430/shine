import qs from 'qs'

/**
 * 请求路径
 * @type {string}
 */
// let base = '/bagl'
const baseUrl = ''
/**
 * 请求参数格式化处理
 * @param params
 * @returns {*}
 */
const paramsHandle = function (params) {
  if (baseUrl !== '') {
    return qs.stringify(params)
  } else {
    return params
  }
}
/**
 * 返回当前登录者姓名
 */
const getUserName = function () {
  return JSON.parse(sessionStorage.getItem('user')).user.name
}

export default {
  baseUrl,
  paramsHandle,
  getUserName
}
